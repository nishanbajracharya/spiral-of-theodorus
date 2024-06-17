import 'normalize.css';

import './style.css';

function randomColor(alpha: number) {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${alpha})`;
}

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

const app = document.querySelector('#app')!;

app.appendChild(canvas);

const mouse = {
  x: 0,
  y: 0,
};

let spiralCount = 8;
let size = 30;

const query = window.location.search;
if (query) {
  const params = new URLSearchParams(query);

  const count = params.get('count');
  if (count) {
    const input = parseInt(count);
    if (Number.isInteger(input) && input > 0) {
      spiralCount = input;
    }
  }

  const sizeParam = params.get('size');
  if (sizeParam) {
    const input = parseInt(sizeParam);
    if (Number.isInteger(input) && input > 0) {
      size = input;
    }
  }
}

const colors = Array(spiralCount)
  .fill('')
  .map(() => randomColor(0.5));

canvas.addEventListener('mousemove', (e) => {
  e.clientX;
  e.clientY;

  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
});

function draw() {
  ctx.reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let unit = size;

  // Recursively draw triangle
  let originX = canvas.width / 2;
  let originY = canvas.height / 2;
  let angle = 0;
  for (let i = 0; i < spiralCount; i++) {
    unit = unit * Math.sqrt(2);
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = colors[i];
    ctx.translate(originX, originY);
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(0, -unit);
    ctx.lineTo(-unit, 0);
    ctx.lineTo(0, 0);
    ctx.fill();
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
