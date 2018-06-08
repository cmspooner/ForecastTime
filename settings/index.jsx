function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Heading</Text>}>
        <Select
          label={`Date Format`}
          settingsKey="dateFormat"
          options={[
            {name:"Mon, Jan 31"},
            {name:"Jan 31, 2018"},
            {name:"1/31/2018"},
            {name:"Mon 31 Jan"},
            {name:"31. Jan 2018"},
            {name:"31/1/2018"},
            {name:"2018.01.31"},
            {name:"31. 1. 2018"},
            {name:"31.01.2018"},
          ]}
          />
        <Toggle
           settingsKey="batteryToggle"
           label="Change Battery Bar to Battery %" 
           onChange={value => props.settingsStorage.setItem('unit', value.toString())}
         />
      </Section>
      <Section
        title={<Text bold align="center">Weather</Text>}>
        <Toggle
           settingsKey="unitToggle"
           label="Set Temperature units to Celsius" 
           onChange={value => props.settingsStorage.setItem('unit', value.toString())}
         />
        <Toggle
           settingsKey="weatherScrollToggle"
           label="Disable weather scrolling"
         />
         <Toggle
           settingsKey="locationScrollToggle"
           label="Disable location scrolling"
         />
        <Select
          label={`Weather Update Interval`}
          settingsKey="updateInterval"
          options={[
            {name:"5 minutes"},
            {name:"15 minutes"},
            {name:"30 minutes"},
            {name:"1 hour"},
            {name:"2 hours"},
          ]}
         />
        <Text align="center">
          Decreasing this will use more WATCH battery. 
        </Text>
        <Select
          label={`Location Update Interval`}
          settingsKey="locationUpdateInterval"
          options={[
            {name:"5 minutes"},
            {name:"15 minutes"},
            {name:"30 minutes"},
            {name:"1 hour"},
            {name:"2 hours"},
          ]}
         />
         <Text align="center">
           Decreasing this will use more PHONE battery.
         </Text>
         <Toggle
           settingsKey="dataAgeToggle"
           label="Show time of last weather update"
         />
         <Toggle
           settingsKey="errorMessageToggle"
           label="Show weather error messages"
         />
         <Toggle
           settingsKey="failCountToggle"
           label="Show number of weather attempts"
         />
        <Toggle
           settingsKey="fetchToggle"
           label="Show when weather is fetched"
         />
        <Text align="left">
          These are mostly for information for nerds and debugging.
         </Text>
      </Section>
      <Section
        title={<Text bold align="center">Separator Bar Color</Text>}>
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
          Please don't hesitate to contact me with questions or suggestions; but be sure to let me know which app or watchface you are talking about. This and all my other apps will always be free and Open Source. If you really like my app please consider buying me a coffee (or more likely electronic components that end up in my classroom). Thanks!
        </Text>
        <Link source="https://rawgit.com/cmspooner/Kearsarge-Time-for-Fitbit-Ionic/master/settings/email.html">
          <TextImageRow
            label="Email"
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
        
        title={<Text bold align="center">Build Version and Notes</Text>}>
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
