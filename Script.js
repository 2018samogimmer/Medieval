const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

let turtle = { x: 100, y: 100, size: 20, body: [] };
let banana = { x: Math.floor(Math.random() * 40) * 20, y: Math.floor(Math.random() * 30) * 20 };
let score = 0;
let direction = 'RIGHT';
let gameInterval;

function drawTurtle() {
    gameArea.innerHTML = '';
    turtle.body.forEach(segment => {
        const segmentDiv = document.createElement("div");
        segmentDiv.className = "turtle";
        segmentDiv.style.left = segment.x + "px";
        segmentDiv.style.top = segment.y + "px";
        gameArea.appendChild(segmentDiv);
    });

    const turtleDiv = document.createElement("div");
    turtleDiv.className = "turtle";
    turtleDiv.style.left = turtle.x + "px";
    turtleDiv.style.top = turtle.y + "px";
    gameArea.appendChild(turtleDiv);
}

function drawBanana() {
    const bananaDiv = document.createElement("div");
    bananaDiv.className = "banana";
    bananaDiv.style.left = banana.x + "px";
    bananaDiv.style.top = banana.y + "px";
    gameArea.appendChild(bananaDiv);
}

function moveTurtle() {
    const head = { x: turtle.x, y: turtle.y };
    
    if (direction === 'UP') head.y -= turtle.size;
    if (direction === 'DOWN') head.y += turtle.size;
    if (direction === 'LEFT') head.x -= turtle.size;
    if (direction === 'RIGHT') head.x += turtle.size;

    turtle.body.unshift(head);
    if (head.x === banana.x && head.y === banana.y) {
        score++;
        scoreDisplay.innerText = score;
        placeBanana();
    } else {
        turtle.body.pop();
    }
    
    drawTurtle();
    drawBanana();
}

function placeBanana() {
    banana.x = Math.floor(Math.random() * 40) * 20;
    banana.y = Math.floor(Math.random() * 30) * 20;
}

function changeDirection(newDirection) {
    if (newDirection === 'UP' && direction !== 'DOWN') direction = 'UP';
    if (newDirection === 'DOWN' && direction !== 'UP') direction = 'DOWN';
    if (newDirection === 'LEFT' && direction !== 'RIGHT') direction = 'LEFT';
    if (newDirection === 'RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}

document.getElementById("up").addEventListener("click", () => changeDirection('UP'));
document.getElementById("down").addEventListener("click", () => changeDirection('DOWN'));
document.getElementById("left").addEventListener("click", () => changeDirection('LEFT'));
document.getElementById("right").addEventListener("click", () => changeDirection('RIGHT'));

function startGame() {
    gameInterval = setInterval(() => {
        moveTurtle();
    }, 150);
}

startGame();
