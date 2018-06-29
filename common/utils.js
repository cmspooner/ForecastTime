import * as allStrings from "../app/strings.js";

function months (){
  return [
    "Jan.", 
    "Feb.", 
    "Mar.", 
    "Apr.", 
    "May.", 
    "Jun.", 
    "Jul.", 
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
}

function days(){
  return [
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
  return months()[month];
}

export function toDay(day, len = "short") {
  day = day%7;
  if (len == "long"){
    day += 7;
  }
  return days()[day];
}

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

export function hourAndMinToTime(hour, min){
  return minToTime(hourAndMinToMin(hour, min));
}

export function expandDay(day){
  return days[days.indexOf(day)+7];
}

export function goalToColor(value, total, low = 'tomato', 
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
  return Math.round(number * Math.pow(10, 2)) / Math.pow(10, 2);
}

export function isInRange(value, low, high){
  return value >= low && value < high;
}

export function dateParse(fmt, today, loc){
  let strings = allStrings.getStrings(loc, "date");
  
  let dayAdd = "";
  if (loc == "zh")
    dayAdd = "日";
  let yearAdd = "";
  if (loc == "zh")
    yearAdd = "年";
  
  let ofAdd = "";
  if (loc == "es")
    ofAdd = " de";
  
  let dotAdd = "";
  if (loc == "en")
    dotAdd = ".";
  let spaceAdd = "";
  if (loc == "en")
    spaceAdd = " ";
  
  let commaAdd = "";
  if (loc == "es" || loc == "zh")
    commaAdd = ",";
  
  //dateLabel.text = `${util.toDay(today.getDay(), "short")}, ${util.toMonth(today.getMonth())} ${today.getDate()}`;
  //return toDay(today.getDay(), "short")+", " + toMonth(today.getMonth()) + " " + today.getDate();
  //console.log("format is: " + fmt + typeof(fmt))
  switch (fmt){
    case 0:
      //console.log(strings[toDay(today.getDay(), "short")] + ", " + strings[toMonth(today.getMonth())] + spaceAdd + today.getDate() + dayAdd);
      return strings[toDay(today.getDay(), "short")] + ", " + strings[toMonth(today.getMonth())] + spaceAdd + today.getDate() + dayAdd;
      break;
    case 1: 
      return strings[toMonth(today.getMonth())] + spaceAdd + today.getDate() + dayAdd + "," + spaceAdd + (today.getYear()+1900) + yearAdd;
    case 2:
      return today.getMonth()+1 + "/" + today.getDate() + "/" + (today.getYear()+1900);
    case 3:
      return strings[toDay(today.getDay(), "short")] + commaAdd + " " + today.getDate() + ofAdd + " " + strings[toMonth(today.getMonth())];
    case 4:
      return today.getDate() + dotAdd + ofAdd + " " + strings[toMonth(today.getMonth())] + " " + (today.getYear()+1900);
    case 5:
      return today.getDate() + "/" + (today.getMonth()+1) + "/" + (today.getYear()+1900);
    case 6:
      return today.getYear()+1900 + "." + zeroPad((today.getMonth()+1)) + "." + zeroPad(today.getDate());
    case 7:
      return today.getDate() + ". " + (today.getMonth()+1) + ". " + (today.getYear()+1900);
    case 8:
      return zeroPad(today.getDate()) + "." + zeroPad(today.getMonth()+1) + "." + (today.getYear()+1900);
    default:
      console.log("failed switch")
  } 
}

export function shortenText(text, isDay){
  if (!isDay)
    text = text.replace("Sunny", "Clear");
  
  text = text.replace("North", "N.");
  text = text.replace("East", "E.");
  text = text.replace("South", "S.");
  text = text.replace("West", "W.");
  
  //console.log(text.indexOf("Rain"));
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

export function getForecastIcon(code, description, isDay){
  console.log(code + ", " + description + ", " + isDay)
  switch(code){
    case 0: //ClearSky
      if (isDay)
        return "../resources/icons/weather/whiteSun.png"
      else
        return "../resources/icons/weather/whiteMoon.png" 
      break;
    case 1: //FewClouds
    case 2: //Scattered Clouds
      if (isDay)
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
      if (isDay)
        return "../resources/icons/weather/whiteSun.png"
      else
        return "../resources/icons/weather/whiteMoon.png"
      break;
  }
}
