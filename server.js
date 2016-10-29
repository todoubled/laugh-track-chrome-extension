var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)
PORT = 1337
messages = []

io.on("connection", function(socket) {
  messages.forEach(function(formattedMessage) {
    io.emit("message", formattedMessage)
  })

  socket.on("message", function(message) {
    formattedMessage = "<b>" + socket.id + "says:</b> " + message
    messages.push(formattedMessage)
    io.emit("message", formattedMessage)
  })
})

app.use(express.static("."))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

http.listen(PORT, function() {
  console.log("App listening on port %d", PORT)
})
