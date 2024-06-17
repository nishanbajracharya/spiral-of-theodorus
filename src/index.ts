import 'normalize.css';

import './style.css';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const app = document.querySelector('#app')!;

app.appendChild(canvas);

const mouse = {
  x: 0,
  y: 0,
};

canvas.addEventListener('mousemove', (e) => {
  e.clientX;
  e.clientY;

  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
});

function draw() {
  ctx.reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let unit = 30;

  // Recursively draw triangle
  let originX = canvas.width / 2;
  let originY = canvas.height / 2;
  let angle = 0;
  for (let i = 0; i < 20; i++) {
    unit = unit * Math.sqrt(2);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.translate(originX, originY);
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -unit);
    ctx.lineTo(-unit, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    originX -= unit * Math.sin(-angle);
    originY -= unit * Math.cos(-angle);
    angle -= Math.PI / 4;
  }

  // Draw cursor
  ctx.fillStyle = '#fff';
  ctx.fillText(`(${mouse.x}, ${mouse.y})`, mouse.x, mouse.y);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
