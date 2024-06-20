import 'normalize.css';

import './style.css';

const MIN = 1;
const MAX = 200;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

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

let spiralCount = 16;
let size = 100;

const query = window.location.search;
if (query) {
  const params = new URLSearchParams(query);

  const count = params.get('count');
  if (count) {
    const input = parseInt(count);
    if (Number.isInteger(input) && input > 0) {
      spiralCount = clamp(input, MIN, MAX);
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

const countSlider = document.createElement('input');
countSlider.type = 'range';
app.appendChild(countSlider);

countSlider.setAttribute('min', `${MIN}`);
countSlider.setAttribute('max', `${MAX}`);
countSlider.setAttribute('step', '1');
countSlider.value = `${spiralCount}`;

countSlider.oninput = () => {
  spiralCount = parseInt(countSlider.value);
};

const colors = Array(MAX)
  .fill('')
  .map(() => randomColor(0.5));

canvas.addEventListener('mousemove', (e) => {
  e.clientX;
  e.clientY;

  mouse.x = e.clientX - canvas.offsetLeft;
  mouse.y = e.clientY - canvas.offsetTop;
});

let sizeDelta = 0;

window.addEventListener('keydown',  (e) => {
  switch (e.key) {
    case 'a':
    case 'ArrowLeft':
      sizeDelta = -1;
      break;
    case 'd':
    case 'ArrowRight':
      sizeDelta = 1;
      break;
    default:
      sizeDelta = 0;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'a':
    case 'd':
    case 'ArrowLeft':
    case 'ArrowRight':
      sizeDelta = 0;
  }
});

// Change size of spiral based on scroll wheel
canvas.addEventListener('wheel', changeSize);

function changeSize(e: WheelEvent | number) {
  let delta: number = 0;
  if (e instanceof WheelEvent) {
    delta = Math.sign(e.deltaY);
  } else {
    delta = -e;
  }
  size = clamp(size - delta, MIN, MAX);
}

function draw() {
  ctx.reset();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  changeSize(sizeDelta);

  // Recursively draw triangle
  let angle = 0;
  for (let i = 0; i < spiralCount; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.fillStyle = colors[i];
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.moveTo(0, 0);
    ctx.rotate(angle);
    ctx.lineTo(size * Math.sqrt(i + 1), 0);
    ctx.lineTo(size * Math.sqrt(i + 1), -size);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    angle -= Math.acos(Math.sqrt(i + 1) / Math.sqrt(i + 2));
  }

  // Draw cursor
  ctx.fillStyle = '#fff';
  ctx.fillText(`(${mouse.x}, ${mouse.y})`, mouse.x, mouse.y);

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
