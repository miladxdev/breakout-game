var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let dx = 1;
let dy = -1;
let ballRadius = 10;
let y = canvas.height - 80;
let x = canvas.width / 2 - ballRadius / 2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  // ctx.fillStyle = "#0095DD";
  ctx.fillStyle = "#0075af";
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
  if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
  if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

function KeyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
  if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Bricks
var brickRowCount = 5;
var brickColumnCount = 6;
var brickWidth = 81;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 40;
var brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];

  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
console.log(bricks);

function drawBricks() {
  let l = 27;

  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = `hsl(198, 100%, ${l}%)`;
        l++;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

let score = 0;
function drawScore() {
  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#0099DD";
  ctx.fillText("SCORE: " + score, 35, 20);
}

let lives = 3;
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0085CD";
  ctx.fillText("LIVES: " + lives, 135, 20);
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy += Math.sign(dy) * 0.1;
          dx += Math.sign(dx) * 0.1;

          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLives();
  x += dx;
  y += dy;

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1;
        dy = -1;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (x < paddleX && x > paddleX + paddleWidth) {
    alert("Game Over");
  }
  if (rightPressed) {
    paddleX += 7;
    if (paddleX > canvas.width - paddleWidth) {
      paddleX = canvas.width - paddleWidth;
    }
  }

  if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

var interval = setInterval(draw, 10);
