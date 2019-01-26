import * as allStrings from "./strings.js";
import { settingsStorage } from "settings";


function mySettings(props) {
  
  let myLocale = props.settings.locale
  let strings = allStrings.getStrings(myLocale); 
  return (
    <Page>
      <Section
        title={<Text bold align="center">{strings["Heading & Time"]}</Text>}>
        <Select
          label={strings["Date Format"]}
          settingsKey="dateFormat"
          options={[
            {name: strings["Wed, Jan 31"]},
            {name: strings["Wednesday 31"]},
            {name: strings["Jan 31, 2018"]},
            {name: "1/31/2018"},
            {name: strings["Wed 31 Jan"]},
            {name: strings["31 Jan 2018"]},
            {name: "31/1/2018"},
            {name: "2018.01.31"},
            {name: "31. 1. 2018"},
            {name: "31.01.2018"},
          ]}
          />
        <Toggle
           settingsKey="batteryToggle"
           label={strings["Battery Bar"]}
         />
        <Toggle
           settingsKey="24hToggle"
           label={strings["Force 24 Hour Time"]}
         />
        <Select
          label={strings["Time Format"]}
          settingsKey="timeFormat"
          options={[
            {name: strings["12:00 am (only 12 hour time)"]},
            {name: "12:00"},
            {name: "12:00:00"}
          ]}
          />
      </Section>
      <Section
        title={<Text bold align="center">{strings["Separator Bar Color"]}</Text>}>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "#FFCCCC"},
            {color: "#FF7F7F"},
            {color: "#FF4C4C"},
            {color: "#FF0000"},
            {color: "#CC0000"},
            {color: "#990000"},
            {color: "#660000"},
            
            {color: "#FF7700"}, 
            {color: "#FFAB00"},
            {color: "#FFCC00"},
            {color: "#FFFF00"},
            {color: "#E5E533"},
            {color: "#CCCC19"},
            {color: "#999919"},
            
            {color: "#B2FFB2"},
            {color: "#66FF66"},
            {color: "#33FF33"},
            {color: "#00FF00"},
            {color: "#00B200"},
            {color: "#339933"},
            {color: "#196619"},
            
            {color: "#00FF9C"},
            {color: "#00FFB9"},
            {color: "#00FFC8"},
            {color: "#00FFFF"},
            {color: "#00EEFF"},
            {color: "#00CDFF"},
            {color: "#00B6FF"},
            
            {color: "#B2B2FF"},
            {color: "#9999FF"},
            {color: "#4C4CFF"},
            {color: "#0000FF"},
            {color: "#0000B2"},
            {color: "#0000AA"},
            {color: "#004C99"},
           
            {color: "#9600FF"},
            {color: "#BE00FF"},
            {color: "#D300FF"},
            {color: "#FF00FF"},
            {color: "#FF00CB"},
            {color: "#FF009E"},
            {color: "#FF006A"}
          ]}
        />
        <Select
          label={strings["Image"]}
          settingsKey="seperatorImage"
          options={[
            {name:strings["None"]},
            {name:strings["Rainbow"]},
            {name:strings["Wood 1"]},
            {name:strings["Wood 2"]},
            {name:strings["Candy Cane 1"]},
            {name:strings["Candy Cane 2"]},
          ]}
         />
        <Select
          label={strings["Effect"]}
          settingsKey="seperatorEffect"
          options={[
            {name:strings["None"]},
            {name:strings["Glass"]},
          ]}
         />
      </Section>
      <Section
        title={<Text bold align="center">{strings["Custom Range Colors"]}</Text>}>
        <Text>
          {strings["Low Color"]}
        </Text>
        <ColorSelect
          settingsKey="lowColor"
          colors={[
            {color: "white"},
            {color: "coral"},
            {color: "tomato"},
            {color: "firebrick"}
          ]}
        />
        <Text>
          {strings["Medium Color"]}
        </Text>
        <ColorSelect
          settingsKey="medColor"
          colors={[
            {color: "white"},
            {color: "yellow"},
            {color: "#FFCC33"},
            {color: "gold"},
          ]}
        />
        <Text>
          {strings["High Color"]}
        </Text>
        <ColorSelect
          settingsKey="highColor"
          colors={[
            {color: "white"},
            {color: "cyan"},
            {color: "#14D3F5"},
            {color: "dodgerblue"},
          ]}
        />
        <Text>
          {strings["Complete Color"]}
        </Text>
        <ColorSelect
          settingsKey="comColor"
          colors={[
            {color: "white"},
            {color: "lawngreen"},
            {color: "#5BE37D"},
            {color: "forestgreen"},
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">{strings["Activities"]}</Text>}>
        <Toggle
           settingsKey="rhrToggle"
           label={strings["rhr"] }
         />
      </Section>
      <Section
        title={<Text bold align="center">{strings["Weather"]}</Text>}>
        <Toggle
           settingsKey="unitToggle"
           label={strings["Celsius"]}
           onChange={value => props.settingsStorage.setItem('unit', value.toString())}
         />
        <Toggle
           settingsKey="weatherScrollToggle"
           label={strings["weather scrolling"]}
         />
         <Toggle
           settingsKey="locationScrollToggle"
           label={strings["location scrolling"]}
         />
        <Select
          label={strings["Weather Update Interval"]}
          settingsKey="updateInterval"
          options={[
            {name:strings["15 minutes"], value:15},
            {name:strings["30 minutes"], value:30},
            {name:strings["1 hour"], value:60},
            {name:strings["2 hours"], value:120},
          ]}
         />
        <Text align="center">
          {strings["WATCH battery"]}
        </Text>
        <Select
          label={strings["Location Update Interval"]}
          settingsKey="locationUpdateInterval"
          options={[
            {name:strings["15 minutes"], value:15},
            {name:strings["30 minutes"], value:30},
            {name:strings["1 hour"], value:60},
            {name:strings["2 hours"], value:120},
          ]}
         />
         <Text align="center">
            {strings["PHONE battery"]}
         </Text>
        <Toggle
           settingsKey="dataAgeToggle"
           label={strings["update time"]}
         />
        <Toggle
           settingsKey="colorToggle"
           label={strings["high low color"] }
         />
        <Text align="left">
          {strings["nerds and debugging"]}
         </Text>
      </Section>
      <Section
        title={<Text bold align="center">Contact Me</Text>}>
        <Text>
          {strings["Contact Me"]}
        </Text>
        <Link source="https://rawgit.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/master/settings/email.html">
          <TextImageRow
            label={strings["Email"]}
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/blob/master/resources/icons/settings/Email.png?raw=true"
          />
        </Link>
        <Link source="https://github.com/cmspooner">
          <TextImageRow
            label="Github"
            sublabel="https://github.com/cmspooner"
            icon="https://github.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/blob/master/resources/icons/settings/Github.png?raw=true"
          />
        </Link>
        <Link source="https://paypal.me/CMSpooner">
          <TextImageRow
            label="PayPal"
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/blob/master/resources/icons/settings/Paypal.png?raw=true"
          />
        </Link>
      </Section>
      <Section
        title={<Text bold align="center">{strings["Build Version"]}</Text>}>
        <Text>
          6.15.0 beta: Made errors less agressive about re-fetching weather. Resetting the provider to main weather every five minutes.
        </Text>
        <Text>
          6.14.0 beta: Translations Fixed; unless we have major issue this is the release version.
        </Text>
        <Text>
          6.13.1 beta: Fixed heavy snow.
        </Text>
        <Text>
          6.13 beta: Bad Spooner...don't make checks on private variables! Removed naughty checks and fixed provider check in a more appropriate way. removed fetch toggle since it doesn't play nicely with my forecast call.
        </Text>
        <Text>
          6.12.5 beta: More fixes on weather loading and whatnot
        </Text>
        <Text>
          6.12.4 beta: Turning off timestamp 24 hour check cause it's broken; but lets see what it fixes
        </Text>
        <Text>
          6.12.3 beta: Just more tweaks....
        </Text>
        <Text>
          6.12.2 beta: Small cleanups based on developer bridge work; it is soo damn flakey...I'll try again another night.
        </Text>
        <Text>
          6.12.1 beta: Turn off aggressive re-fetch of forecast; might take 2 updates to get forecast now; we'll see
        </Text>
        <Text>
          6.12 beta: The date is fixed!...now back to the weather
        </Text>
        <Text>
          6.11.5.1 beta: Fixed update interval....oops
        </Text>
        <Text>
          6.11.5 beta: Fixed error in one date format
        </Text>
        <Text>
          6.11.4 beta: Refetch forecast if description 1 is undefinted...also don't show forecast if undefined
        </Text>
        <Text>
          6.11.3 beta: Fixed 12/24 weather timestamp error...no really this time.......I hope...Paul?
        </Text>
        <Text>
          6.11.2 beta: Fixed 12/24 weather timestamp error...and anouther stab at fixing the date issue...I wish I didn't have to wait 24 hours between tests.
        </Text>
        <Text>
          6.11.1 beta: Tiny fixes...still fragile; but double check file writing and fixed cal low color on versa
        </Text>
        <Text>
          6.11 beta: 3 Day is Back!...and maybe date fixed??
        </Text>
        <Text>
          6.10.4 beta: More small changes...stil not reliable...
        </Text>
        <Text>
          6.10.3 beta: Fixed haze to Haze
        </Text>
        <Text>
          6.10.2 beta: Fixed error where fetch did not respect time preference...you're welcome Paul ;-)
        </Text>
        <Text>
          6.10.1 beta: Small fixes to new weather
        </Text>
        <Text>
          6.10 beta: Switch to open weather map, turned off 3 day weather
        </Text>
        <Text>
          6.9 beta: Changing the time displayto show seconds now left justifies the clock label.
        </Text>
        <Text>
          6.8 beta: A sweet little option under the images options.
        </Text>
        <Text>
          6.7 beta: Date labels are now seperator bar color.
        </Text>
        <Text>
          6.6 beta: Attempting to fix date change error.
        </Text>
        <Text>
          6.5.2 beta: Made date MOAR BOLD and moved it an ity-bitty bit left.
        </Text>
        <Text>
          6.5.1 beta: Made date a teeny bit larger
        </Text>
        <Text>
          6.5 beta: Added new date formats
        </Text>
        <Text>
          6.4 beta: Fixed (?) Battery label moving/changing impropery
        </Text>
        <Text>
          6.3 beta: finding crash...date now shows "Start!" before loading date.
        </Text>
        <Text>
          6.3 beta: finding crash...date now shows "Start!" before loading date.
        </Text>
        <Text>
          6.2.1 beta: Timestamp now 24 hour if selected either through fitbit or settings
        </Text>
        <Text>
          6.2 beta: New options to force 24 hour time, leading zero on hours in 24 hour mode.
        </Text>
        <Text>
          6.1.4 beta: FIXED SETTINGS LOAD ISSUE....SPELLING COUNTS!!!
        </Text>
        <Text>
          6.1.3 beta: stop deleting settings 
        </Text>
        <Text>
          6.1.2 beta: Delete More Settings
        </Text>
        <Text>
          6.1.1 beta: Delete Settings
        </Text>
        <Text>
          6.1 beta: Seperated Images and Effect, Toggle to turn off High/Low Temp Colors
        </Text>
        <Text>
          6.0 beta: New image options...woods!
        </Text>
        <Text>
          5.7 beta: Uploading...becuase; why not 
        </Text>
        <Text>
          5.6 beta: Added a space to shortening of directions. I still think Northampton is a stupid name. 
        </Text>
        <Text>
          5.5 beta: Rearranged settings order(Trying to reflect the order on face), added toggle to turn off resting heart rate.
        </Text>
        <Text>
          5.4.2 beta: Fixed Reset button to not run on start
        </Text>
        <Text>
          5.4.1 beta: Missed a few
        </Text>
        <Text>
          5.4 beta: If no setting...make sure there is a value set
        </Text>
        <Text>
          5.3 beta: Buttons to clear files
        </Text>
        <Text>
          5.2 beta: New Range Color options
        </Text>
        <Text>
          5.1 beta: Fixed dumb typo in cloudy
        </Text>
        <Text>
          5.0 beta: Changed fb-red to tomato for readablity
        </Text>
        <Text>
          4.0: Now localized for Chinese and Spanish! New time display and separator bar options. Plus bug fixes and improvements!
        </Text>
        <Text>
          3.0: More date formats and now moved date and steps to accommodate low battery and charging states.
         </Text>
        <Text>
          2.0: Memory Improvements and Weather is now restored on load.
        </Text>
        <Text>
          1.4: Settings now shows units
         </Text>
        <Text>
          1.3: Fixed disabled typo.
         </Text>
         <Text>
          1.2: Missed changing some references to local fitness values to account values.
         </Text>
         <Text>
           1.1: Added scrolling text for long locations & conditions.
        </Text>
         <Text>
          1.0: First Release.
        </Text>
      </Section>
      <Section
        title={<Text bold align="center">{strings["Reset Data"]}</Text>}>
        <Button
          list
          label="Reset Settings"
          onClick={() => props.settingsStorage.setItem('settings', 'kill')}
        />
        <Button
          list
          label="Reset Weather"
          onClick={() => props.settingsStorage.setItem('weather', 'kill')}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
