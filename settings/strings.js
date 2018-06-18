export function getStrings(lang, type){
  switch (lang){
    case "es":
      return {
        
      }
    case "zh":
      return {
        "Heading"                       : "上方欄位",
        "Date Format"                   : "日期格式",
        "Wed, Jan 31"                   : "週三, 1月31日",
        "Jan 31, 2018"                  : "1月31日,2018年",
        "Wed 31 Jan"                    : "週三, 1月31日",
        "31 Jan 2018"                   : "1月31日,2018年",
        "Battery Bar"                   : "更改電量顯示方式為百分比",
        "Weather"                       : "日期欄位",
        "Celsius"                       : "設定氣溫單位為攝氏",
        "weather scrolling"             : "關閉天氣捲動顯示功能",
        "location scrolling"             : "關閉位置捲動顯示功能",
        "Weather Update Interval"       : "更新天氣的間隔時間",
        "Location Update Interval"      : "更新位置的間隔時間", 
        "5 minutes"                     : "每5分鐘一次",
        "15 minutes"                    : "每15分鐘一次",
        "30 minutes"                    : "每30分鐘一次",
        "1 hour"                        : "每1小時一次",
        "2 hours"                       : "每2小時一次",
        "WATCH battery"                 : "減少更新的間隔時間,將會耗費手錶更多的電力",
        "PHONE battery"                 : "減少更新的間隔時間,將會耗費手機更多的電力",
        "update time"                   : "顯示天氣資訊最後成功更新的時間",
        "fetched time"                  : "Show when weather is fetched",																								
        "nerds and debugging"           : "這些資訊主要用於除錯",
        "Separator Bar Color"           : "分隔線的顏色",
        "Contact Me"                    : "P有任何問題時,歡迎與我聯繫,但也麻煩您提供使用上遇到的問題,還有問題是發生在哪個應用或是表盤,這個程式將永遠免費且為開源軟體,若您真的喜歡這軟體,可以考慮買一杯咖啡送我(或是像一些電子零件,這些最終出現我的教室裡),謝謝",
        "Email"                         : "電子信箱",
        "Build Version"                 : "版本號說明資訊(只提供英文說明)"
      }
    default:
      return {
        "Heading"                       : "Heading",
        "Date Format"                   : "Date Format",
        "Wed, Jan 31"                   : "Wed, Jan 31",
        "Jan 31, 2018"                  : "Jan 31, 2018",
        "Wed 31 Jan"                    : "Wed 31 Jan",
        "31 Jan 2018"                   : "31. Jan 2018",
        "Battery Bar"                   : "Change Battery Bar to Battery %",
        "Weather"                       : "Weather",
        "Celsius"                       : "Set Temperature units to Celsius",
        "weather scrolling"             : "Disable weather scrolling",
        "location scrlling"             : "Disable location scrolling",
        "Weather Update Interval"       : "Weather Update Interval",
        "Location Update Interval"      : "Location Update Interval", 
        "5 minutes"                     : "5 minutes",
        "15 minutes"                    : "15 minutes",
        "30 minutes"                    : "30 minutes",
        "1 hour"                        : "1 hour",
        "2 hours"                       : "2 hours",
        "WATCH battery"                 : "Decreasing this will use more WATCH battery.",
        "PHONE battery"                 : "Decreasing this will use more PHONE battery.",
        "update time"                   : "Show time of last weather update",
        "fetched time"                  : "Show when weather is fetched",																								
        "nerds and debugging"           : "These are mostly for information for nerds and debugging.",
        "Separator Bar Color"           : "Separator Bar Color",
        "Contact Me"                    : "Please don't hesitate to contact me with questions or suggestions; but be sure to let me know which app or watchface you are talking about. This and all my other apps will always be free and Open Source. If you really like my app please consider buying me a coffee (or more likely electronic components that end up in my classroom). Thanks!",
        "Email"                         : "Email",
        "Build Version"                 : "Build Version and Notes (English Only)"
      }
  }
}