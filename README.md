# MMM-Whereis
MagicMirror module to display where someone is (with IFTTT)


## Screenshot
![screenshot]()


## Installation
```sh
cd ~/MagicMirror/modules
git clone https://github.com/eouia/MMM-Whereis
```

## Configuration
```js
{
  module: "MMM-Whereis",
  position: "top_left",
  config: {
    refreshInterval: 1000 * 30,
    timeFormat: "relative", // or "YYYY-MM-DD HH:mm:ss" format
    iconify: "https://code.iconify.design/1/1.0.2/iconify.min.js",
      //iconify: null,
      //When you use this module with `MMM-CalendarExt2`, `MMM-Spotify` or any other `iconify` used modules together, Set this to null.
    enterIcon: "icomoon-free:enter",
    exitIcon: "icomoon-free:exit",
    member: {
      "dad": {
        title: "Daddy",
        icon: "emojione-old-man",
      },
      "mom": {
        title: "Mommy",
        icon: "emojione-woman-dancing",
      },
      "son": {
        title: "Tommy",
        icon: "uil-kid"
      }
    },
    commands: {
      "dad-exited-Office": {
        notificationExec: {
          notification: "SHOW_ALERT",
          payload: { message: "Dad is coming home!", timer: 5000 }
        }
      }
    }
  }
}
```

## IFTTT setup
### step 1.
Go to IFTTT (https://ifttt.com) and sign in. Then create new app.
![]()
### step 2.
![]()
### step 3.
![]()
### step 4.
![]()
### step 5.
![]()
### step 6.
![]()
### step 7.
![]()
### step 8.



## Note.
-  This module cannot detect "WHERE (S)HE IS NOW" (differnt with module name. :D). It detect "Entry or Exit of People on Specific Location".
- "unknown" will be displayed until new IFTTT event be received.
- You should have Static IP/Domain or at least DDNS.
