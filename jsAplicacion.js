window.onload = function() {
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  var socket = new WebSocket('ws://node-red-qqsrq-2023-05-23.mybluemix.net/ws/mywebsocket');

  socket.onerror = function(error) {
    console.log('Error de WebSocket: ' + error);
  };

  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Conexión al WebSocket establecida.';
  };

  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML += '<div class="alert alert-primary" role="alert">Recibido: ' + message + '</div>';
  };

  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Conexión al WebSocket cerrada.';
  };

  form.onsubmit = function(e) {
    var message = messageField.value;

    socket.send(message);
    messagesList.innerHTML = '<div class="alert alert-success" role="alert">Eviado: ' + message + '</div>';
    messageField.value = '';
    return false;
  };

};
