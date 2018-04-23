import { peerSocket } from "messaging";
import { geolocation } from "geolocation";
import { outbox } from "file-transfer";
import * as cbor from "cbor";

import { WEATHER_MESSAGE_KEY, WEATHER_DATA_FILE, WEATHER_ERROR_FILE, Conditions } from './common.js';

export default class Weather {
  
  constructor() {
    this._apiKey = '';
    this._provider = 'yahoo';
    this._feelsLike = true;
    this._weather = undefined;
    this._maximumAge = 0;
    this._maximumLocationAge = 30;
    this._unit = 'c'

    this.onerror = undefined;
    this.onsuccess = undefined;
    
    peerSocket.addEventListener("message", (evt) => {
      // We are receiving a request from the app
      if (evt.data !== undefined && evt.data[WEATHER_MESSAGE_KEY] !== undefined) {
        let message = evt.data[WEATHER_MESSAGE_KEY];
        prv_fetchRemote(message.provider, message.apiKey, message.feelsLike, message.unit, message.maximumLocationAge);
      }
    });
  }
  
  setApiKey(apiKey) {
    this._apiKey = apiKey;
  }
  
  setUnit(unit){
    if (unit == "f")
      this._unit = 'f';
    else
      this._unit = 'c';
  }
  
  setProvider(provider) {
    this._provider = provider;
  }
  
  setFeelsLike(feelsLike) {
    this._feelsLike = feelsLike;
  }
  
  setMaximumAge(maximumAge) {
    this._maximumAge = maximumAge;
  }
  
  setMaximumLocationAge(maximumAge){
    this._maximumLocationAge = maximumAge;
  }
  
  fetch() {
    let now = new Date().getTime();
    if(this._weather !== undefined && this._weather.timestamp !== undefined && (Math.round((now - this._weather.timestamp)/10000) < Math.round(this._maximumAge/10000))) {
      // return previous weather if the maximu age is not reached
      if(this.onsuccess) this.onsuccess(this._weather);
      return;
    }
    
    geolocation.getCurrentPosition(
      (position) => {
        console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
        prv_fetch(this._provider, this._apiKey, this._feelsLike, this_.unit, position.coords.latitude, position.coords.longitude, 
              (data) => {
                data.provider = this._provider;
                this._weather = data;
                if(this.onsuccess) this.onsuccess(data);
              }, 
              this.onerror);
      }, 
      (error) => {
        if(this.onerror) this.onerror(error);
      }, 
      {"enableHighAccuracy" : false, "maximumAge" : this._maximumLocationAge});
  }
};

/*******************************************/
/*********** PRIVATE FUNCTIONS  ************/
/*******************************************/

function prv_fetchRemote(provider, apiKey, feelsLike, unit, maximumLocationAge) {
  geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);
      prv_fetch(provider, apiKey, feelsLike, unit, position.coords.latitude, position.coords.longitude,
          (data) => {
            data.provider = provider;
            outbox
              .enqueue(WEATHER_DATA_FILE, cbor.encode(data))
              .catch(error => console.log("Failed to send weather: " + error));
          },
          (error) => { 
            outbox
              .enqueue(WEATHER_ERROR_FILE, cbor.encode({ error : error }))
              .catch(error => console.log("Failed to send weather error: " + error));
          }
      );
    }, 
    (error) => {
      outbox
        .enqueue(WEATHER_ERROR_FILE, cbor.encode({ error : error }))
        .catch(error => console.log("Failed to send weather error: " + error));
    }, 
    {"enableHighAccuracy" : false, "maximumAge" : maximumLocationAge});
}

function prv_fetch(provider, apiKey, feelsLike, unit, latitude, longitude, success, error) {
  // console.log("Latitude: " + latitude + " Longitude: " + longitude);
  if( provider === "owm" ) {
    prv_queryOWMWeather(apiKey, latitude, longitude, unit, success, error);
  }
  else if( provider === "wunderground" ) {
    prv_queryWUWeather(apiKey, feelsLike, latitude, longitude, unit, success, error);
  }
  else if( provider === "darksky" ) {
    prv_queryDarkskyWeather(apiKey, feelsLike, latitude, longitude, unit, success, error);
  }
  else if( provider === "weatherbit" ) {
    prv_queryWeatherbit(apiKey, latitude, longitude, unit, success, error);
  }
  else 
  {
    prv_queryYahooWeather(latitude, longitude, unit, success, error);
  }
}

function prv_queryOWMWeather(apiKey, latitude, longitude, unit, success, error) {
  if (unit == 'f')
    unit = 'imperial'
  else
    unit = 'metric'
  
  var url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&lat=' + latitude + '&lon=' + longitude + '&units=' + unit;
  console.log("Open Weather Map: " + url)
  
  fetch(url)
  .then((response) => {return response.json()})
  .then((data) => { 
      
      if(data.weather === undefined){
        if(error) error(data);
        return;
      }

      var condition = parseInt(data.weather[0].icon.substring(0,2), 10);
      switch(condition){
        case 1 :  condition = Conditions.ClearSky; break;
        case 2 :  condition = Conditions.FewClouds;  break;
        case 3 :  condition = Conditions.ScatteredClouds;  break;
        case 4 :  condition = Conditions.BrokenClouds;  break;
        case 9 :  condition = Conditions.ShowerRain;  break;
        case 10 : condition = Conditions.Rain; break;
        case 11 : condition = Conditions.Thunderstorm; break;
        case 13 : condition = Conditions.Snow; break;
        case 50 : condition = Conditions.Mist; break;
        default : condition = Conditions.Unknown; break;
      }
      let weather = {
        //temperatureK : data.main.temp.toFixed(1),
        temperature : data.main.temp,
        temperatureC : data.main.temp - 273.15,
        temperatureF : (data.main.temp - 273.15)*9/5 + 32,
        location : data.name,
        description : data.weather[0].description,
        isDay : (data.dt > data.sys.sunrise && data.dt < data.sys.sunset),
        conditionCode : condition,
        realConditionCode : data.weather[0].id,
        sunrise : data.sys.sunrise * 1000,
        sunset : data.sys.sunset * 1000,
        timestamp : new Date().getTime()
      };
      // Send the weather data to the device
      if(success) success(weather);
  })
  .catch((err) => { if(error) error(err); });
};

function prv_queryWUWeather(apiKey, feelsLike, latitude, longitude, unit, success, error) {
  var url = 'https://api.wunderground.com/api/' + apiKey + '/conditions/q/' + latitude + ',' + longitude + '.json';
  console.log("Weather Underground: " + url)
  
  fetch(url)
  .then((response) => {return response.json()})
  .then((data) => { 
      
      if(data.current_observation === undefined){
        if(error) error(data.response.error.description);
        return;
      }

      var condition = data.current_observation.icon;
      if(condition === 'clear'){
        condition = Conditions.ClearSky;
      }
      else if(condition === 'mostlysunny' || condition === 'partlycloudy'){
        condition = Conditions.FewClouds;
      }
      else if(condition === 'partlysunny' || condition === 'mostlycloudy'){
        condition = Conditions.ScatteredClouds;
      }
      else if(condition === 'cloudy'){
        condition = Conditions.BrokenClouds;
      }
      else if(condition === 'rain'){
        condition = Conditions.Rain;
      }
      else if(condition === 'tstorm'){
        condition = Conditions.Thunderstorm;
      }
      else if(condition === 'snow' || condition === 'sleet' || condition === 'flurries'){
        condition = Conditions.Snow;
      }
      else if(condition === 'fog' || condition === 'hazy'){
        condition = Conditions.Mist;
      }
      else {
        condition = Conditions.Unknown;
      }
 
      if (unit  == 'f')
        var temp = feelsLike ? parseFloat(data.current_observation.feelslike_f) : data.current_observation.temp_f;
      else
        var temp = feelsLike ? parseFloat(data.current_observation.feelslike_c) : data.current_observation.temp_c;

      let weather = {
        //temperatureK : (temp + 273.15).toFixed(1),
        temperature : temp,
        temperatureC : temp,
        temperatureF : (temp*9/5 + 32),
        location : data.current_observation.display_location.city,
        description : data.current_observation.weather,
        isDay : data.current_observation.icon_url.indexOf("nt_") == -1,
        conditionCode : condition,
        realConditionCode : data.current_observation.icon,
        sunrise : 0,
        sunset : 0,
        timestamp : new Date().getTime()
      };
      // Send the weather data to the device
      if(success) success(weather);
  })
  .catch((err) => { if(error) error(err); });
};

function prv_queryDarkskyWeather(apiKey, feelsLike, latitude, longitude, unit, success, error) {
  if (unit == 'f')
    unit = 'us'
  else
    unit = 'si'
  let url = 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?exclude=minutely,hourly,alerts,flags&units=' + unit;
  console.log("Darksky: " + url)
  
  fetch(url)
  .then((response) => {return response.json()})
  .then((data) => {       
    
      if(data.currently === undefined){
        if(error) error(data);
        return;
      }

      var condition = data.currently.icon;
      if(condition === 'clear-day' || condition === 'clear-night'){
        condition = Conditions.ClearSky;
      }
      else if(condition === 'partly-cloudy-day' || condition === 'partly-cloudy-night'){
        condition = Conditions.FewClouds;
      }
      else if(condition === 'cloudy'){
        condition = Conditions.BrokenClouds;
      }
      else if(condition === 'rain'){
        condition = Conditions.Rain;
      }
      else if(condition === 'thunderstorm'){
        condition = Conditions.Thunderstorm;
      }
      else if(condition === 'snow' || condition === 'sleet'){
        condition = Conditions.Snow;
      }
      else if(condition === 'fog'){
        condition = Conditions.Mist;
      }
      else {
        condition = Conditions.Unknown;
      }

      var temp = feelsLike ? data.currently.apparentTemperature : data.currently.temperature;

      let weather = {
        //temperatureK : (temp + 273.15).toFixed(1),
        temperature : temp,
        temperatureC : temp,
        temperatureF : (temp*9/5 + 32),
        location : "",
        description : data.currently.summary,
        isDay : data.currently.icon.indexOf("-day") > 0,
        conditionCode : condition,
        realConditionCode : data.currently.icon,
        sunrise : data.daily.data[0].sunriseTime * 1000,
        sunset : data.daily.data[0].sunsetTime * 1000,
        timestamp : new Date().getTime()
      };
    
      // retreiving location name from Open Street Map
      let url = 'https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json&accept-language=en-US';
    
      fetch(url)
        .then((response) => {return response.json()})
        .then((data) => { 
        
             if (data.address.hamlet != undefined) weather.location = data.address.hamlet
             else if (data.address.village != undefined) weather.location = data.address.village
             else if (data.address.town != undefined) weather.location = data.address.town 
             else if (data.address.city != undefined) weather.location = data.address.city   
        
            // Send the weather data to the device
            if(success) success(weather);        
        
      }).catch((err) => { 
            if(success) success(weather); // if location name not found - sending weather without location
      });
  })
  .catch((err) => { if(error) error(err); });
};

function prv_queryYahooWeather(latitude, longitude, unit, success, error) {
  //latitude = "Concord";
  //longitude = "NH";
  //var url = 'https://query.yahooapis.com/v1/public/yql?q=select astronomy, location.city, item.condition from weather.forecast where woeid in '+ '(select woeid from geo.places(1) where text=\'(' + latitude+','+longitude+')\') and u=\'c\'&format=json';
  var url = 'https://query.yahooapis.com/v1/public/yql?q=select astronomy, location.city, item from weather.forecast where woeid in ' + '(select woeid from geo.places(1) where text=\'(' + latitude+','+longitude+')\') and u=\''+ unit +'\'&format=json';
  
  console.log("Yahoo: " + url)
  fetch(encodeURI(url))
  .then((response) => {
    response.json()
    .then((data) => {
      
      if(data.query === undefined || data.query.results === undefined || data.query.results.channel === undefined) {
        if(error) error(data);
        return;
      }
      
      //console.log(JSON.stringify(data));
      
      var condition = parseInt(data.query.results.channel.item.condition.code);
      var rawCondition = condition;

      var current_time = new Date();
      var sunrise_time = prv_timeParse(data.query.results.channel.astronomy.sunrise);
      var sunset_time  = prv_timeParse(data.query.results.channel.astronomy.sunset);
      let weather = {
        //temperatureK : (parseInt(data.query.results.channel.item.condition.temp) + 273.15),
        temperature : parseInt(data.query.results.channel.item.condition.temp),
        location : data.query.results.channel.location.city,
        description : data.query.results.channel.item.condition.text,
        isDay : current_time >  sunrise_time && current_time < sunset_time,
        rawCondition : rawCondition,
        conditionCode : getSimpleCondition(condition),
        sunrise : sunrise_time.getTime(),
        sunset : sunset_time.getTime(),
        timestamp : current_time.getTime(),
        
        //todayDate : "Today",
        todayHigh : parseInt(data.query.results.channel.item.forecast[0].high),
        todayLow : parseInt(data.query.results.channel.item.forecast[0].low),
        todayCondition : getSimpleCondition(parseInt(data.query.results.channel.item.forecast[0].code)),
        todayDescription : data.query.results.channel.item.forecast[0].text,
        
        //tomorrowDate : Date(data.query.results.channel.item.forecast[2].date),
        tomorrowHigh : parseInt(data.query.results.channel.item.forecast[1].high),
        tomorrowLow : parseInt(data.query.results.channel.item.forecast[1].low),
        tomorrowCondition : getSimpleCondition(parseInt(data.query.results.channel.item.forecast[1].code)),
        tomorrowDescription : data.query.results.channel.item.forecast[1].text,
        
        //day3Date : Date((data.query.results.channel.item.forecast[2].date)),
        day3High : parseInt(data.query.results.channel.item.forecast[2].high),
        day3Low : parseInt(data.query.results.channel.item.forecast[2].low),
        day3Condition : getSimpleCondition(parseInt(data.query.results.channel.item.forecast[2].code)),
        day3Description : data.query.results.channel.item.forecast[2].text      
      };
      // Send the weather data to the device
      if(success) success(weather);
    });
  })
  .catch((err) => {
    if(error) error(err);
  });
};

function getSimpleCondition(c){
  switch(c){
        case 31 :
        case 32 :
        case 33 :
        case 34 :
          return Conditions.ClearSky;  break;
        case 29 :
        case 30 :
        case 44 :
          return Conditions.FewClouds;  break;
        case 8 :
        case 9 :
          return Conditions.ShowerRain;  break;
        case 6 :
        case 10 :
        case 11 :
        case 12 :
        case 35 :
        case 40 :
          return Conditions.Rain; break;
        case 1 :
        case 3 :
        case 4 :
        case 37 :
        case 38 :
        case 39 :
        case 47 :
          return Conditions.Thunderstorm; break;
        case 5 :
        case 7 :
        case 13 :
        case 14 :
        case 15 :
        case 16 :  
        case 41 :
        case 42 :
        case 43 :
          return Conditions.Snow; break;
        case 20 :
          return Conditions.Mist; break;
        case 26 :
        case 27 :
        case 28 :
          return Conditions.BrokenClouds; break;
        default : 
          return Conditions.Unknown; break;
      }
}

function prv_timeParse(str) {
  var buff = str.split(" ");
  if(buff.length === 2) {
    var time = buff[0].split(":");
    if(buff[1].toLowerCase() === "pm" && parseInt(time[0]) !== 12) {
      time[0] = (parseInt(time[0]) + 12) + "";
    }
  }

  var date = new Date();
  date.setHours(parseInt(time[0]));
  date.setMinutes(parseInt(time[1]));

  return date;
}
