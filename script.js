var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let x = 20;
let y = 20;
let dx = 2;
let dy = 2;
let ballRadius = 10;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;
let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

function keyDownHandler(e) {
  console.log(e.key);
  if (e.key == "ArrowRight") rightPressed = true;
  if (e.key == "ArrowLeft") leftPressed = true;
}

function KeyUpHandler() {}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  x += dx;
  y += dy;

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
}

setInterval(draw, 10);
