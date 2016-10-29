var socket = io("http://localhost:1337")
$("form").submit(function(e) {
  e.preventDefault()
  var message = $(this).find("input")
  socket.emit("message", message.val())
  message.val("")
})

socket.on("message", function(message) {
  $("#messages").append($("<li>").html(message))
})
