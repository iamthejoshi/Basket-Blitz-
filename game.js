const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let basket = {
    x: canvas.width / 2 - 35,
    y: canvas.height - 20,
    width: 70,
    height: 20,
    speed: 7
};

let fallingObject = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    speed: 3,
    speedIncrement: 0.1
};

let score = 0;
let rightPressed = false;
let leftPressed = false;
let hearts = 3;
const catchSound = document.getElementById("catchSound");
const loseHeartSound = document.getElementById("loseHeartSound");

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBasket() {
    ctx.beginPath();
    ctx.rect(basket.x, basket.y, basket.width, basket.height);
    ctx.fillStyle = "#8B4513";
    ctx.fill();
    ctx.closePath();
}

function drawFallingObject() {
    ctx.beginPath();
    ctx.rect(fallingObject.x, fallingObject.y, fallingObject.width, fallingObject.height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function moveBasket() {
    if (rightPressed && basket.x < canvas.width - basket.width) {
        basket.x += basket.speed;
    } else if (leftPressed && basket.x > 0) {
        basket.x -= basket.speed;
    }
}

function updateFallingObject() {
    fallingObject.y += fallingObject.speed;
    if (fallingObject.y > canvas.height) {
        loseHeart();
        resetFallingObject();
    }
}

function checkCollision() {
    if (
        fallingObject.x < basket.x + basket.width &&
        fallingObject.x + fallingObject.width > basket.x &&
        fallingObject.y + fallingObject.height > basket.y &&
        fallingObject.y < basket.y + basket.height
    ) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
        catchSound.play();
        resetFallingObject();
    }
}

function resetFallingObject() {
    fallingObject.x = Math.random() * (canvas.width - fallingObject.width);
    fallingObject.y = 0;
    fallingObject.speed += fallingObject.speedIncrement;
}

function loseHeart() {
    hearts--;
    loseHeartSound.play();
    document.getElementById(`heart${hearts + 1}`).style.display = "none";

    if (hearts === 0) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFallingObject();
    moveBasket();
    updateFallingObject();
    checkCollision();
    requestAnimationFrame(draw);
}

draw();
