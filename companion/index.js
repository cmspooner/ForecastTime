import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { locale } from "user-settings";

//import { me } from "companion";

//clear storage before setting
//settingsStorage.clear()

//let myLocale = "es";
//let myLocale = "zh";
let myLocale = locale.language.substring(0,2);
//let myLocale = "en"
settingsStorage.setItem('locale', myLocale)

console.log("Companion locale: " + settingsStorage.getItem('locale'));

import Weather from '../common/weather/phone';
let weather = new Weather();

console.log("Companion Started");

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.close = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
  if (evt.key == "settings")
    settingsStorage.setItem('settings', null)
  if (evt.key == "weather")
    settingsStorage.setItem('weather', null)
  if (evt.key == "forecast")
    settingsStorage.setItem('forecast', null)
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  console.log("Restoring Settings! ", settingsStorage.length + " settings to restore");
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    //console.log("restoring: " + data.key);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

weather.onsuccess = (data) => {
  console.log("Weather on phone " + JSON.stringify(data));
}

weather.onerror = (error) => {
  console.log("Weather error " + error);
}
