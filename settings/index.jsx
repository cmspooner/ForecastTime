import * as allStrings from "strings.js";
import { settingsStorage } from "settings";


function mySettings(props) {
  
  let myLocale = props.settings.locale
  let strings = allStrings.getStrings(myLocale);
  //let d1 = 
  return (
    <Page>
      <Section
        title={<Text bold align="center">{strings["Heading"]}</Text>}>
        <Select
          label={strings["Date Format"]}
          settingsKey="dateFormat"
          options={[
            {name: strings["Wed, Jan 31"]},
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
           onChange={value => props.settingsStorage.setItem('unit', value.toString())}
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
            {name:strings["5 minutes"]},
            {name:strings["15 minutes"]},
            {name:strings["30 minutes"]},
            {name:strings["1 hour"]},
            {name:strings["2 hours"]},
          ]}
         />
        <Text align="center">
          {strings["WATCH battery"]}
        </Text>
        <Select
          label={strings["Location Update Interval"]}
          settingsKey="locationUpdateInterval"
          options={[
            {name:strings["5 minutes"]},
            {name:strings["15 minutes"]},
            {name:strings["30 minutes"]},
            {name:strings["1 hour"]},
            {name:strings["2 hours"]},
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
           settingsKey="fetchToggle"
           label={strings["fetched time"] }
         />
        <Text align="left">
          {strings["nerds and debugging"]}
         </Text>
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
          4.5: Spanish Done!
        </Text>
        <Text>
          4.4: Larger Battery Text
        </Text>
        <Text>
          4.3: Settings Translated into Chinese!
        </Text>
        <Text>
          4.2.6.2: Back to less formal High/Low in chinese
        </Text>
        <Text>
          4.2.6.1: Changes to spacing on High/Low; text now coloroed
        </Text>
        <Text>
          4.2.6: Changes to High, Low, and Rain in Chinese Translation
        </Text>
        <Text>
          4.2.5.1: Turned off force chinese
        </Text>
        <Text>
          4.2.5: Work on chinese dates
        </Text>
        <Text>
          4.2.4: Small translation fixes
        </Text>
        <Text>
          4.2.3: Fixed "Fetching at " error. It was looking at the wrong section of the transation table.
        </Text>
        <Text>
          4.2.2: Catch errors and show english if error.
        </Text>
        <Text>
          4.2.1: steps is now 步數 in chinese version
        </Text>
        <Text>
          4.2: Chinese translation done in main app?
        </Text>
        <Text>
          4.1: Weather Conditions Translated into Chinese!
        </Text>
        <Text>
          4.0.1: Fixed screen wake draw issues
        </Text>
        <Text>
          4.0: Moving Development here
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
    </Page>
  );
}

registerSettingsPage(mySettings);
