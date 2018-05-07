let months = [
  "Jan.", 
  "Feb.", 
  "Mar.", 
  "Apr.", 
  "May", 
  "June", 
  "July", 
  "Aug.", 
  "Sept.", 
  "Oct.",
  "Nov.",
  "Dec.",
  
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

let days = [ 
  "Sun", 
  "Mon", 
  "Tues", 
  "Wed", 
  "Thurs", 
  "Fri", 
  "Sat",
  
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

export function minToTime(min){
  let hours = parseInt(min/60);
  let mins = parseInt(min%60);
  let ampm = "a";
  
  if (hours > 12){
  	hours -= 12;
    ampm = "p";
  } else if (hours == 12){
    ampm = "p";
  } else if (hours == 0){
  	hours += 12;
  }
    
  let time = hours + ":" + zeroPad(mins) + ampm
  
  //console.log(time);
  return time;
}

export function hourAndMinToMin(hour, min){
  return hour*60 + min;
}

//useing pre-converted 24 hour time
export function hourAndMinToTime(hour, min){
  return minToTime(hourAndMinToMin(hour, min));
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function toMonth(month, len = "short") {
  if (len == "long"){
    month += 12;
  }
  return months[month];
}

export function toDay(day, len = "short") {
  day = day%7;
  if (len == "long"){
    day += 7;
  }
  return days[day];
}

export function expandDay(day){
  return days[days.indexOf(day)+7];
}

export function goalToColor(value, total, low = 'fb-red', 
                                          medium = 'fb-peach', 
                                          high = 'fb-cyan', 
                                          complete = 'fb-mint', ){
  if (!value || !total){
    color = low;
    return color;
  }
  
  let percent = value/total*100;
  let color = 'white'; // #FFFFFF
  if (percent < 33.33){
    color = low; // #F83C40
  } else if (percent < 66.66){
    color = medium; // #FFCC33
  } else if (percent < 100){
    color = high;  // #14D3F5
  } else {
    color = complete; // #5BE37D
  }
  return color
}

export function round2(number){
  var factor = Math.pow(10, 2);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

export function isInRange(value, low, high){
  return value >= low && value < high;
}

export function shortenText(text){
  text = text.replace("North", "N.");
  text = text.replace("East", "E.");
  text = text.replace("South", "S.");
  text = text.replace("West", "W.");
  
  console.log(text.indexOf("Rain"));
  if (text.indexOf("Rain") != -1)
    text = text.replace("Showers", "");
  else
    text = text.replace("Showers", "Rain");
  
  text = text.replace("And ", "& ");
  text = text.replace("Mixed ", "");
  text = text.replace("Severe", "Bad");
  text = text.replace("Thunderstorms", "T-Storms");
  text = text.replace("Partly Cloudy", "Some Clouds");
  text = text.replace("Thundershowers", "T-Showers");
  text = text.replace("Isolated", "Some");
  text = text.replace("Scattered", "Some");
  
  return text;  
}

export function wordStartsWith(letter, text){
  text = text.toLowerCase();
  letter = letter.toLowerCase();
  text = text.split(' ');
  for (var i = 0; i < text.length; i++){
    if (text[i][0] == letter)
      return true;
  }
    return false;
}

export function getWeatherIcon(data){
  switch(data.conditionCode){
    case 0: //ClearSky
      if (data.isDay)
        return "../resources/icons/weather/whiteSun.png"
      else
        return "../resources/icons/weather/whiteMoon.png" 
      break;
    case 1: //FewClouds
    case 2: //ScatteredClouds
      if (data.isDay)
        return "../resources/icons/weather/whitePartlySunny.png"
      else
        return "../resources/icons/weather/whitePartlyMoon.png"
      break;
    case 3: //BrokenClouds
      return "../resources/icons/weather/whiteCloud.png"
      break;
    case 4: //ShowerRain
    case 5: //Rain
     return "../resources/icons/weather/whiteRain.png"
      break;
    case 6: //Thunderstorm
      if (wordStartsWith("T", data.description))
        return "../resources/icons/weather/whiteStorm.png"
      else
        return "../resources/icons/weather/whiteRain.png"
      break;
    case 7: //Snow
      return "../resources/icons/weather/whiteSnow.png"
      break;
    case 8: //Mist
      return "../resources/icons/weather/whiteHaze .png"
      break;
    default: //Other
      if (data.isDay)
        return "../resources/icons/weather/whiteSun.png"
      else
        return "../resources/icons/weather/whiteMoon.png"
      break;
  }
}
export function getForecastIcon(code, description){
switch(code){
  case 0: //ClearSky
    return "../resources/icons/weather/whiteSun.png"
    break;
  case 1: //FewClouds
  case 2: //ScatteredClouds
    return "../resources/icons/weather/whitePartlySunny.png"
    break;
  case 3: //BrokenClouds
    return "../resources/icons/weather/whiteCloud.png"
    break;
  case 4: //ShowerRain
  case 5: //Rain
   return "../resources/icons/weather/whiteRain.png"
    break;
  case 6: //Thunderstorm
    if (wordStartsWith("T", description))
      return "../resources/icons/weather/whiteStorm.png"
    else
      return "../resources/icons/weather/whiteRain.png"
    break;
  case 7: //Snow
    return "../resources/icons/weather/whiteSnow.png"
    break;
  case 8: //Mist
    return "../resources/icons/weather/whiteHaze .png"
    break;
  default: //Other
    return "../resources/icons/weather/whiteSun.png"
    break;
  }
}
