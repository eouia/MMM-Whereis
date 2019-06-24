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
Search `location` and set it as `THIS` of IFTTT
1. ![screenshot](/screenshot/sc2.png)

2. ![screenshot](/screenshot/sc3.png)

3. ![screenshot](/screenshot/sc4.png)

### step 3.
Now, `THAT` part
![screenshot](/screenshot/sc5.png)

1. Select Webhooks 
![screenshot](/screenshot/sc6.png)

2. ![screenshot](/screenshot/sc7.png)

3. ![screenshot](/screenshot/sc8.png)
 - URL: `Your MagicMirror domain:port` + `/whereis` (e.g: `mymirror.com:8080/whereis`) 
 - Method: `POST`
 - Content Type: `application/json`
 - Body :
 ```json
{
  "who": "dad",
  "location": "Office",
  "EnteredOrExited": {{EnteredOrExited}}
}
```

### step 4.
After creation, You should allow your IFTTT app of your smartphone could use your location information always.


## Commands.
You can make a custom command with `who-entered/exited-location` pattern. (e.g: `dad-entered-home`)

### 0. Common
You can define your custom commands like this;
```js
commands: {
  "who-entered-location": {
    notificationExec: { ... },
    // And/Or
    shellExec: { ... },
    // And/Or
    moduleExec: { ... },
  },
  ...
}
```

### 1. notificationExec
Command can emit `notification` of MagicMirror. When you need to activate other module with notification, this could.
```js
commands: {
  "dad-entered-home": {
    notificationExec: {
      notification: "SHOW_ALERT",
      payload: {message:"Okaeri, Papa!", timer:2000}
    }
  }
}
```
- `notification` : `String` or `callback function(time)` which will return String
By example; This could emit conditional notification
```js
notification: (time) => {
  if (SOME CONDITION) {
    return "SOME_NOTIFICATION"
  } else {
    return "OTHER_NOTIFICATION"
  }
}
```
  - `time` is Unix Epoch time (by `Date.now()`)
- `payload` : Any `Variables`(include Object) could be. Or `callback function(time)` which will return `payload` could be.
```js
payload: (time) => {
  return {"eventTime": time}
}
```

## 2. shellExec
Command can execute some simple shell script (e.g: python or bash script). But it just executes the shell command. Process executed by this is not controllable or manageable. If you need more, make your own module for it.
```js
commands: {
  "dad-exited-home": {
    shellExec: {
      exec: "sudo shutdown now"
    }
  }
}
```
- `exec`: String or callback function also.

## 3. moduleExec
Command can also handle module(s) itself.
```js
commands: {
  "mom-exited-home": {
    moduleExec: {
      module: ["clock"],
      exec: (module, time) => {
        module.hide()
      }
    }
  }
}
```
- `module` : `String` of target module name or `Array` of names of target modules or just `[]`(for all modules). And also could be `callback` function which will return string or array.
```js
module: "clock", // This means `clock` module
module: ["clock"], // same with above.
module: ["clock", "calendar"] // This means `clock` module and `calendar` module
module: [], // This means targeting all modules
module: (time) => { return "clock" },
module: (time) => { return ["clock", "calendar"]}
module: (time) => { return [] }
```
- `exec` : `callback` function to do its job. Arguments are slightly different with other callbacks.
```js
exec: (module, time) => {
  module.hide()
}
```
  - `module`: would be targeted module(s)



## Note.
-  This module cannot detect "WHERE (S)HE IS NOW" (differnt with module name. :D). It detect "Entry or Exit of People on Specific Location".
- "unknown" will be displayed until new IFTTT event be received.
- You should have Static IP/Domain or at least DDNS.
