"use strict"

const NodeHelper = require("node_helper")
const bodyParser = require("body-parser")
const exec = require("child_process").exec


module.exports = NodeHelper.create({
  start: function() {
    this.expressApp.use(bodyParser.json())
    this.expressApp.use(bodyParser.urlencoded({extended: true}))

    this.expressApp.post("/whereis", (req, res) => {
      console.log("[WHEREIS] Requested via Webhook", req.body)
      this.sendSocketNotification("WEBHOOK", req.body)
      res.status(200).send({status: 200})
    })
  },

  socketNotificationReceived: function(noti, payload) {
    if (noti == "SHELL_EXEC") {
      exec (payload, (e,so,se)=> {
        console.log("[WHEREIS] shellExec command:", payload)
        if (so) console.log("[WHEREIS] shellExec stdOut:", so)
        if (se) console.log("[WHEREIS] shellExec stdErr:", se)
        if (e) console.log("[WHEREIS] shellExec error:", e)
      })
    }
  }
})
