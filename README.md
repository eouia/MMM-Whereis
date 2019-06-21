# MMM-Whereis
MagicMirror module to display where someone is (with IFTTT)


## Screenshot
![screenshot](/screenshot/sc.png)


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
![screenshot](/screenshot/sc1.png)

### step 2.
![screenshot](/screenshot/sc2.png)

### step 3.
![screenshot](/screenshot/sc3.png)

### step 4.
![screenshot](/screenshot/sc4.png)

### step 5.
![screenshot](/screenshot/sc5.png)

### step 6.
![screenshot](/screenshot/sc6.png)

### step 7.
![screenshot](/screenshot/sc7.png)

### step 8.
![screenshot](/screenshot/sc8.png)



## Note.
-  This module cannot detect "WHERE (S)HE IS NOW" (differnt with module name. :D). It detect "Entry or Exit of People on Specific Location".
- "unknown" will be displayed until new IFTTT event be received.
- You should have Static IP/Domain or at least DDNS.
