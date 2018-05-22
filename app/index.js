console.log("Kearsarge Time Started");

/*
 * Entry point for the watch app
 */
import clock from "clock";
import { me } from "appbit";
import document from "document";
import * as fs from "fs";

import * as messaging from "messaging";

import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";
import { goals } from "user-activity";
import { user } from "user-profile";
import { display } from "display";
import { preferences } from "user-settings";
import { units } from "user-settings";
import { vibration } from "haptics"
import { battery } from "power";
import { memory } from "system";
console.log("JS memory: " + memory.js.used + "/" + memory.js.total);

import * as util from "../common/utils";

import { me as device } from "device";
if (!device.screen) device.screen = { width: 348, height: 250 };
console.log(`Dimensions: ${device.screen.width}x${device.screen.height}`);
var deviceType = "Ionic";
if (device.screen.width == 300 && device.screen.height == 300)
  deviceType = "Versa";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";


var color = "deepskyblue";
var updateInterval = 30;
var updateLocationInterval = 30;
var userUnits =  units.temperature.toLowerCase();
var showDataAge = false;
var failCount = 0;
var showFailCount = false;
var showError = false;
var weatherData = null;

var fakeTime = false;

// Update the clock every minute
clock.granularity = "minutes";

let background = document.getElementById("clickbg");

// Views
let clockView = document.getElementById("clock");
let statsView = document.getElementById("stats");
let forecastView = document.getElementById("forecast");

// Get a handle on the <text> element
// Clock view
let clockLabel = document.getElementById("clockLabel");
let seperatorEndLeft = document.getElementById("seperatorEndLeft");
let seperatorLine = document.getElementById("seperatorLine");
let seperatorEndRight = document.getElementById("seperatorEndRight");
let dateLabel = document.getElementById("dateLabel");
let batteryLevelLabel = document.getElementById("batteryLevelLabel");
let hrLabel = document.getElementById("hrLabel");
let stepsLabel = document.getElementById("stepsLabel");
if (deviceType == "Versa")
  let calsLabel = document.getElementById("calsLabel");

// Weather View
let tempAndConditionLabel = document.getElementById("tempAndConditionLabel");
tempAndConditionLabel.text = "Updating...";
let weatherLocationLabel = document.getElementById("weatherLocationLabel");
let weatherImage = document.getElementById("weatherImage");

// Stats View
let stepStatsLabel = document.getElementById("stepStatsLabel");
let distStatsLabel = document.getElementById("distStatsLabel");
let floorsStatsLabel = document.getElementById("floorsStatsLabel");
let activeStatsLabel = document.getElementById("activeStatsLabel");
let calsStatsLabel = document.getElementById("calsStatsLabel");
if (deviceType == "Versa"){
  let stepGoalLabel = document.getElementById("stepGoalLabel");
  let distGoalLabel = document.getElementById("distGoalLabel");
  let floorsGoalLabel = document.getElementById("floorsGoalLabel");
  let activeGoalLabel = document.getElementById("activeGoalLabel");
  let calsGoalLabel = document.getElementById("calsGoalLabel");
}

// Forecast View
let todayDateLabel = document.getElementById("todayDateLabel");
let todayWeatherImage = document.getElementById("todayWeatherImage");
let weatherImage = document.getElementById("weatherImage");
let todayDescriptionLabel = document.getElementById("todayDescriptionLabel");
let todayHighLabel = document.getElementById("todayHighLabel");
let todayHighValLabel = document.getElementById("todayHighValLabel");
let todayLowLabel = document.getElementById("todayLowLabel");
let todayLowValLabel = document.getElementById("todayLowValLabel");

let tomorrowDateLabel = document.getElementById("tomorrowDateLabel");
let tomorrowWeatherImage = document.getElementById("tomorrowWeatherImage");
let weatherImage = document.getElementById("weatherImage");
let tomorrowDescriptionLabel = document.getElementById("tomorrowDescriptionLabel");
let tomorrowHighLabel = document.getElementById("tomorrowHighLabel");
let tomorrowHighValLabel = document.getElementById("tomorrowHighValLabel");
let tomorrowLowLabel = document.getElementById("tomorrowLowLabel");
let tomorrowLowValLabel = document.getElementById("tomorrowLowValLabel");

let day3DateLabel = document.getElementById("day3DateLabel");
let day3WeatherImage = document.getElementById("day3WeatherImage");
let day3Image = document.getElementById("day3Image");
let day3DescriptionLabel = document.getElementById("day3DescriptionLabel");
let day3HighLabel = document.getElementById("day3HighLabel");
let day3HighValLabel = document.getElementById("day3HighValLabel");
let day3LowLabel = document.getElementById("day3LowLabel");
let day3LowValLabel = document.getElementById("day3LowValLabel");

let didVib = false;
let show = "clock";
let weatherInterval = null;
let openedWeatherRequest = false;

// Heart Rate Monitor
let hrm = new HeartRateSensor();

//----------------------------Messaging and Settings--------------
// Message is received

let settings = loadSettings();
//fs.unlinkSync(SETTINGS_FILE);
//console.log("Settings: " + settings.color);


messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "updateInterval" && evt.data.newValue) {
    settings.updateInterval = JSON.parse(evt.data.newValue).values[0].name
    setUpdateInterval();
  }
  if (evt.data.key === "locationUpdateInterval" && evt.data.newValue) {
    settings.updateLocationInterval = JSON.parse(evt.data.newValue).values[0].name
    setLocationUpdateInterval();
  }
  if (evt.data.key === "color" && evt.data.newValue) {
    settings.color = JSON.parse(evt.data.newValue);
    setColor();
  }
  if (evt.data.key === "dataAgeToggle" && evt.data.newValue) {
    settings.dataAgeToggle = JSON.parse(evt.data.newValue);
    setDataAge();
  }
  if (evt.data.key === "unitToggle" && evt.data.newValue) {
    settings.unitToggle = JSON.parse(evt.data.newValue) 
    setUnit();
  }
  if (evt.data.key === "errorMessageToggle" && evt.data.newValue) {
    settings.errorMessageToggle = JSON.parse(evt.data.newValue);
    setErrorMessage();
  }
  if (evt.data.key === "failCountToggle" && evt.data.newValue) {
    settings.failCountToggle = JSON.parse(evt.data.newValue);
    setFailCount();
  }
  if (evt.data.key === "weatherScrollToggle" && evt.data.newValue) {
    settings.weatherScrollToggle = JSON.parse(evt.data.newValue);
    setWeatherScroll();
  }
  if (evt.data.key === "locationScrollToggle" && evt.data.newValue) {
    settings.locationScrollToggle = JSON.parse(evt.data.newValue);
    setLocationScroll();
  }
  saveSettings();
  console.log("JS memory: " + memory.js.used + "/" + memory.js.total);

};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
  weather.fetch();
  console.log("I Should be Fetching Weather!");
  openedWeatherRequest = true;
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("App Socket Closed");
};

//----------------Weather Setup------------------------
import Weather from '../common/weather/device';

let weather = new Weather();
weather.setProvider("yahoo"); 
weather.setApiKey("");
weather.setMaximumAge(updateInterval * 60 * 1000); 
weather.setFeelsLike(false);

weather.setUnit(userUnits);

applySettings();

if (settings.noFile){
  console.log("No Settings File");
  weather.fetch();
}

weather.onsuccess = (data) => {
  weatherData = data;
  failCount = 0;
  openedWeatherRequest = false;
  weather.setMaximumAge(updateInterval * 60 * 1000); 
  if (weatherInterval != null)
    clearInterval(weatherInterval);
  weatherInterval = setInterval(fetchWeather,updateInterval * 60 * 1000);
  var time = new Date();
  if (fakeTime) time = "11:08a";
  var timeStamp = new Date(data.timestamp);
  timeStamp = util.hourAndMinToTime(timeStamp.getHours(), timeStamp.getMinutes());

  console.log("Time: " + time + ", TimeStamp: " + timeStamp);
  //data.description = 	"Isolated Thunderstorms";
  tempAndConditionLabel.text = `${data.temperature}° ${util.shortenText(data.description)}`;
  
  if (showDataAge)
    weatherLocationLabel.text = `${util.shortenText(data.location)} (${timeStamp})`;
  else
    weatherLocationLabel.text = `${util.shortenText(data.location)}`;
  
  //weatherLocationLabel.text = "East Rochester (10:00p)"
  
  weatherImage.href = util.getWeatherIcon(data);  
}

weather.onerror = (error) => {
  console.log("Weather error " + JSON.stringify(error));
  weather.setMaximumAge(30 * 1000); 
  openedWeatherRequest = false;
  if (weatherInterval != null)
    clearInterval(weatherInterval);
  weatherInterval = setInterval(fetchWeather,30 * 1000);
  if (error == "No connection with the companion")
       error = "Companion Failure"
  if (JSON.stringify(error) == "{}")
       error = "Unknown"
  if (!weatherData){
    weatherImage.href = "";
    
    failCount++;
    if (showFailCount)
      tempAndConditionLabel.text = `Updating, try ${failCount}`;
    else
      tempAndConditionLabel.text = "Updating...";
    if (showError)
      weatherLocationLabel.text = `${error}`;
    else
      weatherLocationLabel.text = ``;
  } else {
      tempAndConditionLabel.text = `${weatherData.temperature}° ${util.shortenText(weatherData.description)}`;
      if (showError)
        weatherLocationLabel.text = `${error}`;
      else
        weatherLocationLabel.text = `Updating...`;
      weatherImage.href = util.getWeatherIcon(weatherData);  
  }
}

//-----------------End Weather Setup--------------

//-------------------------------Update Functions-----------------

// Update the <text> element with the current time
function updateClock() {
  let today = new Date();
  let date = today.getDate();
  let day = today.getDay();
  let month = today.getMonth();
  let year = today.getYear()-100+2000;
  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());
  let ampm = " am";
  
  //console.log(preferences.clockDisplay);
  if (preferences.clockDisplay == "12h"){
    if (hours > 12){
      ampm = " pm";
      hours -= 12;
    } else if (hours == 12){
      ampm = " pm"
    }else if (hours == 0 && ampm == " am"){
      hours += 12;
    }
  } else {
    ampm = ""
  }
  
  dateLabel.text = `${util.toDay(day, "short")}, ${util.toMonth(month)} ${date}`;
  //dateLabel.text = `Wednesday, Mar. 21`;

  batteryLevelLabel.style.fill = util.goalToColor(battery.chargeLevel, 90)
  batteryLevelLabel.text = `${battery.chargeLevel}%`
  //batteryLevelLabel.text = `100%`
  clockLabel.text = `${hours}:${mins}${ampm}`;
  
  
  //updatePeriodData();
}

function updateClockData() {
  if (show == "clock" && display.on){
    if (deviceType == "Versa") {
      let data = {
        heart: {
          theHeartRate: hrm.heartRate ? hrm.heartRate : 0
        },
        step: {
          steps: today.adjusted.steps ? today.adjusted.steps: 0
        },
        cal: {
          cals: today.adjusted.calories ? today.adjusted.calories: 0
        }
      };
    } else {
      let data = {
        heart: {
          theHeartRate: hrm.heartRate ? hrm.heartRate : 0
        },
        step: {
          steps: today.adjusted.steps ? today.adjusted.steps: 0
        }
      };
    }

    //console.log("Data:");
    //console.log(data.heart.theHeartRate);
    //console.log(data.step.steps.toLocaleString());

    hrLabel.style.fill = 'white';
    stepsLabel.style.fill = 'white';
    if (deviceType == "Versa")
      calsLabel.style.fill = 'white';
    
    
    if (data.heart.theHeartRate == 0) {
        hrLabel.text = `--`;
    } else {
        if (user.heartRateZone(data.heart.theHeartRate) == "out-of-range"){
          hrLabel.style.fill = 'fb-cyan';  // #14D3F5
        } else if (user.heartRateZone(data.heart.theHeartRate) == "fat-burn"){
          hrLabel.style.fill = 'fb-mint'; // #5BE37D
        } else if (user.heartRateZone(data.heart.theHeartRate) == "cardio"){
          hrLabel.style.fill = 'fb-peach'; // #FFCC33
        } else if (user.heartRateZone(data.heart.theHeartRate) == "peak"){
          hrLabel.style.fill = 'fb-red'; // #F83C40
        }
        hrLabel.text = `${data.heart.theHeartRate} bpm`;
    }
    
    stepsLabel.style.fill = util.goalToColor(data.step.steps, goals.steps);
    stepsLabel.text = `${data.step.steps.toLocaleString()} steps`;
    if (deviceType == "Versa") {
      calsLabel.style.fill = util.goalToColor(data.cal.cals, goals.calories);
      calsLabel.text = `${data.cal.cals.toLocaleString()} kcal`;
    }
  }
}

function updateStatsData(){
  if (show == "stats" && display.on){
    if (deviceType == "Versa") {
      stepStatsLabel.style.fill = util.goalToColor(today.adjusted.steps, goals.steps);
      stepStatsLabel.text = "Steps:";
      stepGoalLabel.style.fill = util.goalToColor(today.adjusted.steps, goals.steps);
      stepGoalLabel.text = `${today.adjusted.steps ? today.adjusted.steps.toLocaleString() : 0} / ${goals.steps.toLocaleString()}`;
      
      distStatsLabel.style.fill = util.goalToColor(today.adjusted.distance, goals.distance);
      distStatsLabel.text = "Distance:";
      distGoalLabel.style.fill = util.goalToColor(today.adjusted.distance, goals.distance);
      if (units.distance == "us")
        distGoalLabel.text = `${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.000621371) : 0 } / ${util.round2(goals.distance*0.000621371)}`;
      else
        distGoalLabel.text = `${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.001) : 0 } / ${util.round2(goals.distance*0.001)}`;
      
      floorsStatsLabel.style.fill = util.goalToColor(today.adjusted.elevationGain, goals.elevationGain);
      floorsStatsLabel.text = "Floors:";
      floorsGoalLabel.style.fill = util.goalToColor(today.adjusted.elevationGain, goals.elevationGain);
      floorsGoalLabel.text = `${today.adjusted.elevationGain ? today.adjusted.elevationGain : 0} / ${goals.elevationGain}`;
      
      activeStatsLabel.style.fill = util.goalToColor(today.adjusted.activeMinutes, goals.activeMinutes);
      activeStatsLabel.text = "Active:";
      activeGoalLabel.style.fill = util.goalToColor(today.adjusted.activeMinutes, goals.activeMinutes);
      activeGoalLabel.text = `${today.adjusted.activeMinutes ? today.adjusted.activeMinutes.toLocaleString() : 0} / ${goals.activeMinutes}`;
 
      calsStatsLabel.style.fill = util.goalToColor(today.adjusted.calories, goals.calories);
      calsStatsLabel.text = "Calories:";
      calsGoalLabel.style.fill = util.goalToColor(today.adjusted.calories, goals.calories);
      calsGoalLabel.text = `${today.adjusted.calories ? today.adjusted.calories.toLocaleString() : 0} / ${parseInt(goals.calories).toLocaleString()}`;
    } else {
      stepStatsLabel.style.fill = util.goalToColor(today.adjusted.steps, goals.steps);
      stepStatsLabel.text = `Steps: ${today.adjusted.steps ? today.adjusted.steps.toLocaleString() : 0} / ${goals.steps.toLocaleString()}`;

      // Multiply by .000621371 to convert from meters to miles
      distStatsLabel.style.fill = util.goalToColor(today.adjusted.distance, goals.distance);
       if (units.distance == "us")
         distStatsLabel.text = `Distance: ${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.000621371) : 0 } / ${util.round2(goals.distance*0.000621371)}`;
       else
         distStatsLabel.text = `Distance: ${today.adjusted.distance ? util.round2(today.adjusted.distance * 0.001) : 0 } / ${util.round2(goals.distance*0.001)}`;

      floorsStatsLabel.style.fill = util.goalToColor(today.adjusted.elevationGain, goals.elevationGain);
      floorsStatsLabel.text = `Floors: ${today.adjusted.elevationGain ? today.adjusted.elevationGain : 0} / ${goals.elevationGain}`;

      activeStatsLabel.style.fill = util.goalToColor(today.adjusted.activeMinutes, goals.activeMinutes);
      activeStatsLabel.text = `Active: ${today.adjusted.activeMinutes ? today.adjusted.activeMinutes.toLocaleString() : 0} / ${goals.activeMinutes}`;

      calsStatsLabel.style.fill = util.goalToColor(today.adjusted.calories, goals.calories);
      calsStatsLabel.text = `Calories: ${today.adjusted.calories ? today.adjusted.calories.toLocaleString() : 0} / ${parseInt(goals.calories).toLocaleString()}`;
    }
  }
}
  
function updateForecastData(){
  if (show == "forecast" && display.on){
    let today = new Date();
    let day = today.getDay()
    
    todayDateLabel.text  = "Today";
    console.log("Today Code: " + weatherData.todayCondition)
    todayWeatherImage.href = util.getForecastIcon(weatherData.todayCondition, 
                                                  weatherData.tomorrowDescription);
    todayDescriptionLabel.text = util.shortenText(weatherData.todayDescription);
    todayHighLabel.text = "High:"
    todayHighValLabel.text = weatherData.todayHigh + "°"
    todayLowLabel.text = "Low:"
    todayLowValLabel.text = weatherData.todayLow + "°"
    
    tomorrowDateLabel.text = util.toDay(day+1, "long");
    console.log("Tomorrow Code: " + weatherData.tomorrowCondition)
    tomorrowWeatherImage.href = util.getForecastIcon(weatherData.tomorrowCondition, 
                                                     weatherData.tomorrowDescription);
    tomorrowDescriptionLabel.text = util.shortenText(weatherData.tomorrowDescription);
    tomorrowHighLabel.text = "High:"
    tomorrowHighValLabel.text = weatherData.tomorrowHigh + "°"
    tomorrowLowLabel.text = "Low:"
    tomorrowLowValLabel.text = weatherData.tomorrowLow + "°"
    
    day3DateLabel.text = util.toDay(day+2, "long");
    console.log("day3 Code: " + weatherData.day3Condition)
    day3WeatherImage.href = util.getForecastIcon(weatherData.day3Condition, 
                                                     weatherData.day3Description);
    day3DescriptionLabel.text = util.shortenText(weatherData.day3Description);
    day3HighLabel.text = "High:"
    day3HighValLabel.text = weatherData.day3High + "°"
    day3LowLabel.text = "Low:"
    day3LowValLabel.text = weatherData.day3Low + "°"
  }
}

//------------------Event Handleing--------------------

background.onclick = function(evt) {
  console.log("Click");
  let today = new Date();
  if (fakeTime) time = "11:08a";
  if (show == "clock"){           // In Clock -> Switching to Stats
    show = "stats";
    updateStatsData()
    clockView.style.display = "none";
    statsView.style.display = "inline";
    forecastView.style.display = "none";
    console.log("stats Loaded");
    display.poke()
  } else if (show == "stats"){                   // In Stats -> Switching to forcast or schedule    
    if(weatherData != null) {
      show = "forecast";
      updateClock();
      updateClockData();
      //weather.fetch();
      updateForecastData();
      clockView.style.display = "none";//test
      statsView.style.display = "none";
      forecastView.style.display = "inline";//test
      console.log("forecast Loaded");
    } else {
      show = "clock";
      updateClock();
      updateClockData();
      //weather.fetch();
      clockView.style.display = "inline";//test
      statsView.style.display = "none";
      forecastView.style.display = "none";
      console.log("Clock Loaded");
    } 
  } else {                                  // In Schedule -> Switching to Clock
    show = "clock";
    updateClock();
    updateClockData();
    //weather.fetch();
    clockView.style.display = "inline";//test
    statsView.style.display = "none";
    forecastView.style.display = "none";
    console.log("Clock Loaded");

  }
  //console.log("ShowClock is " + showClock);
}

display.onchange = function() {
  if (display.on) {
    let today = new Date();
    if (fakeTime) time = "11:08a";
    hrm.start();
    show = "clock";
    updateClock();
    updateClockData();
    weather.fetch();
    clockView.style.display = "inline"; //test
    statsView.style.display = "none";
    forecastView.style.display = "none";
  } else {
    hrm.stop();
  }
}

//------------------Settings and FS--------------------

function applySettings(){
  setUpdateInterval();
  setLocationUpdateInterval();
  setColor();
  setDataAge();
  setUnit();
  setErrorMessage();
  setFailCount(); 
  setWeatherScroll();
  setLocationScroll();
  openedWeatherRequest = false;
}

function setUpdateInterval(){
  console.log(`updateInterval is: ${settings.updateInterval}`);
  let oldInterval = updateInterval;
  if (settings.updateInterval == "5 minutes")
    updateInterval = 5;
  else if (settings.updateInterval == "15 minutes")
    updateInterval = 15;
  else if (settings.updateInterval == "30 minutes")
    updateInterval = 30;
  else if (settings.updateInterval == "1 hour")
    updateInterval = 60;
  else if (settings.updateInterval == "2 hours")
    updateInterval = 120;
  if (updateInterval < oldInterval){
    weather.setMaximumAge(1 * 60 * 1000); 
    if (!openedWeatherRequest){
      console.log("Forcing Update Interval Change");
      openedWeatherRequest = true;
      weather.fetch();
    }
  }
  weather.setMaximumAge(updateInterval * 60 * 1000); 
  if (weatherInterval != null)
    clearInterval(weatherInterval);
  weatherInterval = setInterval(fetchWeather, updateInterval*60*1000);
  //console.log("Acutal Interval: " + weather._maximumAge)
}

function setLocationUpdateInterval(){
  console.log(`locationUpdateInterval is: ${settings.updateLocationInterval}`);
  let oldLocationInterval = updateLocationInterval;
  if (settings.updateLocationInterval == "5 minutes")
    updateLocationInterval = 5;
  else if (settings.updateLocationInterval == "15 minutes")
    updateLocationInterval = 15;
  else if (settings.updateLocationInterval == "30 minutes")
    updateLocationInterval = 30;
  else if (settings.updateLocationInterval == "1 hour")
    updateLocationInterval = 60;
  else if (settings.updateLocationInterval == "2 hours")
    updateLocationInterval = 120;
  if (updateLocationInterval < oldLocationInterval){
    weather.setMaximumLocationAge(1 * 60 * 1000); 
    if (!openedWeatherRequest){
    console.log("Forcing Location Update Interval Change");
      openedWeatherRequest = true;
      weather.fetch();
    }
  }
  weather.setMaximumLocationAge(updateLocationInterval * 60 * 1000);
}

function setColor(){
  console.log(`Setting Seperator Bar color: ${settings.color}`);
  color = settings.color;
  seperatorEndLeft.style.fill = color;
  seperatorLine.style.fill = color;
  seperatorEndRight.style.fill = color;
}

function setDataAge(){
  console.log(`Data Age: ${settings.dataAgeToggle}`);
  showDataAge = settings.dataAgeToggle;
  if (weatherData){
    if (showDataAge){
      var timeStamp = new Date(weatherData.timestamp);
      timeStamp = util.hourAndMinToTime(timeStamp.getHours(), timeStamp.getMinutes());
      weatherLocationLabel.text = `${weatherData.location} (${timeStamp})`;
    } else {
      weatherLocationLabel.text = `${weatherData.location}`;
    }
  }
}

function setUnit(){
  console.log(`Celsius: ${settings.unitToggle}`);
  var oldUnits = userUnits;
  if (settings.unitToggle)
    userUnits = 'c';
  else
    userUnits = 'f';
  if (oldUnits != userUnits){
    weather.setMaximumAge(0 * 60 * 1000); 
    weather.setUnit(userUnits);
    if (!openedWeatherRequest){
      console.log("Forcing Update Unit Change");
      openedWeatherRequest = true;
      weather.fetch();
    }
    weather.setMaximumAge(updateInterval * 60 * 1000); 
  }
  weather.setUnit(userUnits);
}

function setErrorMessage(){  
  console.log(`Show Error: ${settings.errorMessageToggle}`);
  showError = settings.errorMessageToggle;
}
 
function setFailCount(){
  console.log(`Fail Count: ${settings.failCountToggle}`);
  showFailCount = settings.failCountToggle;
}

function setWeatherScroll(){
  console.log(`Weather Scroll Dissable: ${settings.weatherScrollToggle}`);
  if (settings.weatherScrollToggle){
    tempAndConditionLabel.state = "disabled"
    tempAndConditionLabel.text = "";
    if (weatherData)
      tempAndConditionLabel.text = `${weatherData.temperature}° ${util.shortenText(weatherData.description)}`;
    else
      tempAndConditionLabel.text = "Updating..."
  } else
    tempAndConditionLabel.state = "enabled"
  
}

function setLocationScroll(){
  console.log(`Weather Scroll Dissable: ${settings.locationScrollToggle}`);
  if (settings.locationScrollToggle){
    weatherLocationLabel.state = "disabled"
    weatherLocationLabel.text = "";
    if (weatherData){
      if (showDataAge){
        var timeStamp = new Date(weatherData.timestamp);
        timeStamp = util.hourAndMinToTime(timeStamp.getHours(), timeStamp.getMinutes());
        weatherLocationLabel.text = `${weatherData.location} (${timeStamp})`;
      } else {
        weatherLocationLabel.text = `${weatherData.location}`;
      }
    }
  }  else
    weatherLocationLabel.state = "enabled"
 
}


me.onunload = saveSettings;

function loadSettings() {
  console.log("Loading Settings!")
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    // Defaults
    return {
      updateInterval : "30 minutes",
      updateLocationInterval : "30 minutes",
      unitToggle : false,
      dataAgeToggle : false,
      errorMessageToggle: false,
      failCountToggle : false,
      weatherScrollToggle : false,
      locationScrollToggle : false,
      color : "#004C99",
    }
  }
}

function saveSettings() {
  console.log("Saving Settings");
  settings.noFile = false;
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
  //fs.unlinkSync(SETTINGS_FILE);  //kill file for testing first run
}

function fetchWeather(){
  openedWeatherRequest = false;
  console.log("auto fetch");
  weather.fetch();
}

//-----------------Startup------------------------

// Update the clock every tick event
clock.ontick = () => updateClock();
//clearInterval();
setInterval(updateClockData, 3*1000);
if (weatherInterval != null)
    clearInterval(weatherInterval);
weatherInterval = setInterval(fetchWeather, updateInterval*60*1000);


// Don't start with a blank screen
updateClock();
updateClockData();
weather.fetch();
openedWeatherRequest = true;
hrm.start();
