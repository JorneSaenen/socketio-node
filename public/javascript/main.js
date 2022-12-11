const socket = io();
const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messages = document.querySelector('.messages');
const button = document.querySelector('.form-button');
const roomInput = document.querySelector('.room-input');
const roomButton = document.querySelector('.room-button');
const sendAudio = new Audio('/sendSound.mp3');
const receiveAudio = new Audio('/receiveSound.mp3');

let room;

socket.on('id', (id) => {
  document.querySelector('h3').innerHTML = `Your ID: ${id}`;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!input.value) return;
  button.disabled = true;
  socket.emit('sending', input.value, room);
  sendAudio.play();
  messages.innerHTML += `<p class='sending-message'>${input.value}</p>`;
  input.value = '';
  button.disabled = false;
});

socket.on('receiving', (message) => {
  messages.innerHTML += `<p class='receiving-message'>${message}</p>`;
  receiveAudio.play();
});

roomButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('joinRoom', roomInput.value);
  room = roomInput.value.toLowerCase();
  document.querySelector('h4').innerHTML = `Your active room: ${room}`;
  roomInput.value = '';
});
