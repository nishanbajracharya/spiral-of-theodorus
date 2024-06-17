import 'normalize.css';

import './style.css';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;
canvas.width = window.innerWidth * .8;
canvas.height = window.innerHeight * .8;

const app = document.querySelector('#app')!;

app.appendChild(canvas);

function draw(time: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);