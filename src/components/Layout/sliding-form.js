const signUPbtn = document.getElementById('signUp');
const signInbtn = document.getElementById('signUp');
const container = document.getElementById('container');

signUPbtn.addEventListener('click', () =>
container.classList.add('right-panel-active'));

signInbtn.addEventListener('click', () =>
container.classList.remove('right-panel-active'));