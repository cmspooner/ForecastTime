import { peerSocket } from "messaging";
import { WEATHER_MESSAGE_KEY, WEATHER_DATA_FILE, WEATHER_ERROR_FILE } from './common.js';
import { inbox } from "file-transfer";
import { readFileSync } from "fs";

const MY_FILE_NAMES = [WEATHER_DATA_FILE,WEATHER_ERROR_FILE]

let otherFiles = []
let myFiles    = []

const prevNextFile = inbox.nextFile;

inbox.nextFile = function() {
  if(otherFiles.length > 0) {
    return otherFiles.pop()
  }
  
  let fileName
  while (fileName = prevNextFile()) {
    if (MY_FILE_NAMES.indexOf(fileName) > -1) {
      myFiles.push(fileName)
    }
    else {
      return fileName
    }
  }
  return undefined
}

const getCustomFile = function() {
  if(myFiles.length > 0) {
    return myFiles.pop()
  }
  
  let fileName
  while (fileName = prevNextFile()) {
    if (MY_FILE_NAMES.indexOf(fileName) > -1) {
      return fileName
    }
    otherFiles.push(fileName)
  }
  return undefined
}


export default class Weather {
  constructor() {
    this._apiKey = '30e538c070a8907d0ea7545a7fc75fdc';
    this._provider = 'owm';
    this._oldProvider = '';
    this._feelsLike = true;
    //this._weather = undefined;
    this._maximumAge = 0;
    this._maximumLocationAge = 30;
    this._unit = 'c'
    
    try {
      this._weather = fs.readFileSync(WEATHER_DATA_FILE, "cbor");
    } catch (n) {
      this._weather = undefined;
    }

    this.onerror = undefined;
    this.onsuccess = undefined;
    
    // Event occurs when new file(s) are received
    inbox.addEventListener("newfile", (event) => {
      let fileName = getCustomFile();
      if (fileName === WEATHER_DATA_FILE) {
        this._weather = readFileSync(fileName, "cbor");
        if(this.onsuccess) this.onsuccess(this._weather);
      }
      else if (fileName === WEATHER_ERROR_FILE) {
        if(this.onerror) this.onerror(readFileSync(fileName, "cbor").error);
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
  
  getData() {
    return this._weather;
  }
  
  fetch() {
    console.log("I'm a fetch'n some weather using "+this._provider + ", was using " + this._oldProvider);
    if(this._weather !== undefined && this._weather.timestamp !== undefined && (Math.round((new Date().getTime() - this._weather.timestamp)/100000) < Math.round(this._maximumAge/100000)) && this._oldProvider == this._provider) {
      // return previous weather if the maximum age is not reached
      console.log("Nevermind...I already have it");
      if(this.onsuccess) this.onsuccess(this._weather);
      return this._weather;
    }
    this._oldProvider = this._provider;
    if (peerSocket.readyState === peerSocket.OPEN) {
      // Send a command to the companion
      let message = {};
      let params = { apiKey : this._apiKey, provider : this._provider, feelsLike : this._feelsLike, unit : this._unit, maximumLocationAge : this._maximumLocationAge};
      message[WEATHER_MESSAGE_KEY] = params;
      peerSocket.send(message);
    }
    else {
      if(this.onerror) this.onerror("No connection with the companion");
    }
    return this._weather;
  }
};
