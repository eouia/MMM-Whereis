Module.register("MMM-Whereis", {
  defaults: {
    refreshInterval:1000*60*10,
    timeFormat: "relative", // or "YYYY-MM-DD HH:mm:ss" format
    iconify: "https://code.iconify.design/1/1.0.2/iconify.min.js",
       //iconify: null,
       //When you use this module with `MMM-CalendarExt2`, `MMM-Spotify`, MMM-Hotword or any other `iconify` used modules together, Set this to null.
    member: {},
    commands: {},
  },

  start: function() {
    this.member = Object.assign({}, this.config.member)
  },

  getStyles: function() {
    return ["MMM-Whereis.css"]
  },

  getScripts: function() {
    r = ["moment.js"]
    if (this.config.iconify) {
      r.push(this.config.iconify)
    }
    return r
  },

  notificationReceived: function(noti, payload, sender) {
    if (noti == "DOM_OBJECTS_CREATED") {
      this.refresh()
    }
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "WEBHOOK") {
      if (this.member.hasOwnProperty(payload.who)) {
        var person = this.member[payload.who]
        person.location = payload.location
        person.lastStatus = payload.EnteredOrExited
        person.lastTime = payload.OccurredAt
        this.refresh()
        var commandName = payload.who + "-" + payload.EnteredOrExited + "-" + payload.location
        this.doCommand(commandName, payload.OccurredAt)
      }
    }
  },

  doCommand: function(commandPattern, time=null) {
    var command = null
    if (this.config.commands.hasOwnProperty(commandPattern)) {
      command = this.config.commands[commandPattern]
    } else {
      // do nothing.
    }
    if (command.hasOwnProperty("notificationExec")) {
      var ex = command.notificationExec
      var nen = (ex.hasOwnProperty("notification")) ? ex.notification : this.config.notifications.DETECTED
      var nenf = (typeof nen == "function") ? nen(time) : nen
      var nep = (ex.hasOwnProperty("payload")) ? ex.payload : time
      var nepf = (typeof nep == "function") ? nep(time) : nep
      this.sendNotification(nenf, nepf)
    }
    if (command.hasOwnProperty("shellExec")) {
      var ex = command.shellExec
      var see = (ex.hasOwnProperty("exec")) ? ex.exec : null
      var seef = (typeof see == "function") ? see(time) : see
      if (seef) this.sendSocketNotification("SHELL_EXEC", seef)
    }
    if (command.hasOwnProperty("moduleExec")) {
      var ex = command.moduleExec
      var mem = (ex.hasOwnProperty("module")) ? ex.module : []
      var mem1 = (typeof mem == "function") ? mem(time) : mem
      var memf = (typeof mem1 == "string") ? [mem1] : mem1
      var mee = (ex.hasOwnProperty("exec")) ? ex.exec : null
      if (typeof mee == "function") {
        var modules = MM.getModules().enumerate((m) => {
          if (memf.includes(m.name) || memf.length == 0) {
            mee(m, time)
          }
        })
      }
    }
  },

  refresh: function() {
    clearTimeout(this.refreshTimer)
    this.refreshTimer = null
    this.updateDom()
    this.refreshTimer = setTimeout(()=>{
      this.refresh()
    }, this.config.refreshInterval)
  },

  getDom: function() {
    var dom = document.createElement("div")
    dom.id = "WHEREIS"
    for (const who in this.member) {
      if (this.member.hasOwnProperty(who)) {
        var person = this.member[who]
        var item = document.createElement("div")
        item.id = "WHEREIS_" + who
        item.classList.add((person.lastStatus) ? person.lastStatus : "unknown")
        item.classList.add("item")
        var icon = document.createElement("span")
        icon.id = item.id + "_ICON"
        icon.className = "iconify"
        icon.dataset.icon = person.icon
        var title = document.createElement("div")
        title.id = item.id + "_TITLE"
        title.className = "title"
        title.innerHTML = person.title
        var loc = document.createElement("div")
        loc.id = item.id + "_LOCATION"
        loc.className = "location"
        loc.innerHTML = person.location
        var time = document.createElement("div")
        time.id = item.id + "_TIME"
        time.className = "time"
        var t = moment(person.lastTime)
        time.innerHTML
          = (this.config.timeFormat == "relative")
          ? t.fromNow()
          : t.format(this.config.timeFormat)
        item.appendChild(icon)
        item.appendChild(title)
        item.appendChild(loc)
        item.appendChild(time)
        dom.appendChild(item)
      } else {
        //do nothing
      }
    }
    return dom
  }
})
