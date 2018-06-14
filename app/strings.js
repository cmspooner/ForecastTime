export function getStrings(lang, type){
  switch (lang){
    case "es":
      switch (type){
        case "clockData":
          return {
            "bpm"       : "bpm",
            "steps"     : "pasos", 
            "kcal"      : "kcal",
          }
        case "stats":
          return {
            "Steps"     : "Pasos",
            "Distance"  : "Distancia",
            "Floors"    : "Pisos",
            "Active"    : "Activo",
            "Calories"  : "Calorías",
          }
        case "date":
          return {
            
            "Sun"       : "Dom",
            "Mon"       : "Lu",
            "Tues"      : "Ma",
            "Wed"       : "Mx",
            "Thurs"     : "Ju",
            "Fri"       : "Vi",
            "Sat"       : "Sab",
   
            "Jan."      : "Enero",
            "Feb."      : "Feb.",
            "Mar."      : "Marzo.",
            "Apr."      : "Abr.",
            "May."      : "Mayo",
            "Jun."      : "Jun.",
            "Jul."      : "Jul.",
            "Aug."      : "Agosto",
            "Sept."     : "Set.",
            "Oct."      : "Oct.",
            "Nov."      : "Nov.",
            "Dec."      : "Dic.",
            
            "January"   : "Enero",
            "February"  : "Febrero",
            "March"     : "Marzo",
            "April"     : "Abril",
            "May"       : "Mayo",
            "June"      : "Junio",
            "July"      : "Julio",
            "August"    : "Agosto",
            "September" : "Septiembre",
            "October"   : "Octubre",
            "November"  : "Noviembre",
            "December"  : "Diciembre",
          }
        case "weather":
          return {
            "Today"     : "Hoy", 
            "Sunday"    : "Domingo",
            "Monday"    : "Lunes",
            "Tuesday"   : "Martes",
            "Wednesday" : "Miércoles",
            "Thursday"  : "Jueves",
            "Friday"    : "Viernes",
            "Saturday"  : "Sábado",
            
            "High"      : "Alta",
            "Low"       : "Baja",
            
            "Tornado"                 : "Tornado",
            "Tropical Storm"          : "Tempestad Tropical",
            "Hurricane"               : "Huracán",
            "Severe Thunderstorms"    : "Truena Severas",
            "Thunderstorms"           : "Truena",
            "Mixed Rain And Snow"     : "Lluvia y Nieve",
            "Mixed Rain And Sleet"    : "Lluvia y Aguanieve",
            "Mixed Snow And Sleet"    : "Snow & Sleet",
            "Freezing Drizzle"        : "Freezing Rain",
            "Drizzle"                 : "Drizzle",
            "Freezing Rain"           : "Freezing Rain",
            "Showers"                 : "Showers",
            "Snow Flurries"           : "Flurries",
            "Light Snow Showers"      : "Light Snow",
            "Blowing Snow"            : "Blowing Snow",
            "Snow"                    : "Snow",
            "Hail"                    : "Hail",
            "Sleet"                   : "Sleet",
            "Dust"                    : "Dust",
            "Foggy"                   : "Foggy",
            "Haze"                    : "Haze",
            "Smoky"                   : "Smoky",     
            "Blustery"                : "Blustery",
            "Windy"                   : "Windy",
            "Cold"                    : "Cold",
            "Cloudy"                  : "Cloudy",
            "Mostly Cloudy"           : "Mostly Cloudy",  
            "Partly Cloudy"           : "Partly Cloudy",
            "Clear"                   : "Clear",
            "Sunny"                   : "Sunny",
            "Fair"                    : "Fair",
            "Mixed Rain And Hail"     : "Rain & Hail",
            "Hot"                     : "Hot",
            "Isolated Thunderstorms"  : "Some T-Storms",
            "Scattered Thunderstorms" : "Some T-Storms",
            "Scattered Showers"       : "Some Rain",
            "Heavy Snow"              : "Heavy Snow",
            "Scattered Snow Showers"  : "Some Snow",
            "Thundershowers"          : "Thundershowers",
            "Snow Showers"            : "Snow",
            "Isolated Thundershowers" : "Some T-Storms",
          }
        case "directions":
          return {
            "North"           : "North",
            "N."              : "N.",
            "East"            : "East",
            "E."              : "E.",
            "South"           : "South",
            "S."              : "S.",
            "West"            : "West",
            "W."              : "W.",
          }
      }
    case "zh":
      switch (type){
        case "clockData":
          return {
            "bpm"       : "bpm",
            "steps"     : "步", 
            "kcal"      : "大卡",
          }
        case "stats":
          return {
            "Steps"     : "步數",
            "Distance"  : "距離",
            "Floors"    : "樓層數",
            "Active"    : "活動量",
            "Calories"  : "卡路里",
          }
        case "date":
          return {
            
            "Sun"       : "週日",
            "Mon"       : "週一",
            "Tues"      : "週二",
            "Wed"       : "週三",
            "Thurs"     : "週四",
            "Fri"       : "週五",
            "Sat"       : "週六",
   
            "Jan."      : "一月",
            "Feb."      : "二月",
            "Mar."      : "三月",
            "Apr."      : "四月",
            "May."      : "五月",
            "Jun."      : "六月",
            "Jul."      : "七月",
            "Aug."      : "八月",
            "Sept."     : "九月",
            "Oct."      : "十月",
            "Nov."      : "十一月",
            "Dec."      : "十二月",
            
            "January"   : "一月",
            "February"  : "二月",
            "March"     : "三月",
            "April"     : "四月",
            "May"       : "五月",
            "June"      : "六月",
            "July"      : "七月",
            "August"    : "八月",
            "September" : "九月",
            "October"   : "十月",
            "November"  : "十一月",
            "December"  : "十二月",
          }
        case "weather":
          return {
            "Today"     : "今天", 
            "Sunday"    : "週日",
            "Monday"    : "週一",
            "Tuesday"   : "週二",
            "Wednesday" : "週三",
            "Thursday"  : "週四",
            "Friday"    : "週五",
            "Saturday"  : "週六",
            
            "High"      : "高溫",
            "Low"       : "低溫",
            
            "Tornado"                 : "Tornado",
            "Tropical Storm"          : "Tropical Storm",
            "Hurricane"               : "Hurricane",
            "Severe Thunderstorms"    : "Bad T-Storms",
            "Thunderstorms"           : "Thunderstorms",
            "Mixed Rain And Snow"     : "Rain & Snow",
            "Mixed Rain And Sleet"    : "Rain & Sleet",
            "Mixed Snow And Sleet"    : "Snow & Sleet",
            "Freezing Drizzle"        : "Freezing Rain",
            "Drizzle"                 : "Drizzle",
            "Freezing Rain"           : "Freezing Rain",
            "Showers"                 : "Showers",
            "Snow Flurries"           : "Flurries",
            "Light Snow Showers"      : "Light Snow",
            "Blowing Snow"            : "Blowing Snow",
            "Snow"                    : "Snow",
            "Hail"                    : "Hail",
            "Sleet"                   : "Sleet",
            "Dust"                    : "Dust",
            "Foggy"                   : "Foggy",
            "Haze"                    : "Haze",
            "Smoky"                   : "Smoky",     
            "Blustery"                : "Blustery",
            "Windy"                   : "Windy",
            "Cold"                    : "Cold",
            "Cloudy"                  : "Cloudy",
            "Mostly Cloudy"           : "Mostly Cloudy",  
            "Partly Cloudy"           : "Partly Cloudy",
            "Clear"                   : "Clear",
            "Sunny"                   : "Sunny",
            "Fair"                    : "Fair",
            "Mixed Rain And Hail"     : "Rain & Hail",
            "Hot"                     : "Hot",
            "Isolated Thunderstorms"  : "Some T-Storms",
            "Scattered Thunderstorms" : "Some T-Storms",
            "Scattered Showers"       : "Some Rain",
            "Heavy Snow"              : "Heavy Snow",
            "Scattered Snow Showers"  : "Some Snow",
            "Thundershowers"          : "Thundershowers",
            "Snow Showers"            : "Snow",
            "Isolated Thundershowers" : "Some T-Storms",
          }
        case "directions":
          return {
            "North"           : "North",
            "N."              : "N.",
            "East"            : "East",
            "E."              : "E.",
            "South"           : "South",
            "S."              : "S.",
            "West"            : "West",
            "W."              : "W.",
          }
      }
    default:
      switch (type){
        case "clockData":
          return {
            "bpm"       : "bpm",
            "steps"     : "steps", 
            "kcal"      : "kcal",
          }
        case "stats":
          return {
            "Steps"     : "Steps",
            "Distance"  : "Distance",
            "Floors"    : "Floors",
            "Active"    : "Active",
            "Calories"  : "Calories",
          }
        case "date":
          return {
            
            "Sun"       : "Sun",
            "Mon"       : "Mon",
            "Tues"      : "Tues",
            "Wed"       : "Wed",
            "Thurs"     : "Thurs",
            "Fri"       : "Fri",
            "Sat"       : "Sat",
   
            "Jan."      : "Jan.",
            "Feb."      : "Feb.",
            "Mar."      : "Mar.",
            "Apr."      : "Apr.",
            "May."      : "May",
            "Jun."      : "June",
            "Jul."      : "July",
            "Aug."      : "Aug.",
            "Sept."     : "Sept.",
            "Oct."      : "Oct.",
            "Nov."      : "Nov.",
            "Dec."      : "Dec.",
            
            "January"   : "January",
            "February"  : "February",
            "March"     : "March",
            "April"     : "April",
            "May"      : "May",
            "June"      : "June",
            "July"      : "July",
            "August"    : "August",
            "September" : "September",
            "October"   : "October",
            "November"  : "November",
            "December"  : "December",
          }
        case "weather":
          return {
            "Today"     : "Today", 
            "Sunday"    : "Sunday",
            "Monday"    : "Monday",
            "Tuesday"   : "Tuesday",
            "Wednesday" : "Wednesday",
            "Thursday"  : "Thursday",
            "Friday"    : "Friday",
            "Saturday"  : "Saturday",
            
            "High"      : "High",
            "Low"       : "Low",
            
            "Tornado"                 : "Tornado",
            "Tropical Storm"          : "Tropical Storm",
            "Hurricane"               : "Hurricane",
            "Severe Thunderstorms"    : "Bad T-Storms",
            "Thunderstorms"           : "Thunderstorms",
            "Mixed Rain And Snow"     : "Rain & Snow",
            "Mixed Rain And Sleet"    : "Rain & Sleet",
            "Mixed Snow And Sleet"    : "Snow & Sleet",
            "Freezing Drizzle"        : "Freezing Rain",
            "Drizzle"                 : "Drizzle",
            "Freezing Rain"           : "Freezing Rain",
            "Showers"                 : "Showers",
            "Snow Flurries"           : "Flurries",
            "Light Snow Showers"      : "Light Snow",
            "Blowing Snow"            : "Blowing Snow",
            "Snow"                    : "Snow",
            "Hail"                    : "Hail",
            "Sleet"                   : "Sleet",
            "Dust"                    : "Dust",
            "Foggy"                   : "Foggy",
            "Haze"                    : "Haze",
            "Smoky"                   : "Smoky",     
            "Blustery"                : "Blustery",
            "Windy"                   : "Windy",
            "Cold"                    : "Cold",
            "Cloudy"                  : "Cloudy",
            "Mostly Cloudy"           : "Mostly Cloudy",  
            "Partly Cloudy"           : "Partly Cloudy",
            "Clear"                   : "Clear",
            "Sunny"                   : "Sunny",
            "Fair"                    : "Fair",
            "Mixed Rain And Hail"     : "Rain & Hail",
            "Hot"                     : "Hot",
            "Isolated Thunderstorms"  : "Some T-Storms",
            "Scattered Thunderstorms" : "Some T-Storms",
            "Scattered Showers"       : "Some Rain",
            "Heavy Snow"              : "Heavy Snow",
            "Scattered Snow Showers"  : "Some Snow",
            "Thundershowers"          : "Thundershowers",
            "Snow Showers"            : "Snow",
            "Isolated Thundershowers" : "Some T-Storms",
          }
        case "directions":
          return {
            "North"           : "North",
            "N."              : "N.",
            "East"            : "East",
            "E."              : "E.",
            "South"           : "South",
            "S."              : "S.",
            "West"            : "West",
            "W."              : "W.",
          }
      }
  }
}