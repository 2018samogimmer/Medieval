const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tileSize = 20;
let speed = 150; // سرعة حركة السلحفاة
let direction = { x: 0, y: 0 };
let turtle = [{ x: 10, y: 10 }];
let apple = spawnApple();
let score = 0;

// دالة لرسم السلحفاة
function drawTurtle() {
    ctx.fillStyle = "green"; // لون السلحفاة
    turtle.forEach(part => {
        ctx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
    });
}

// دالة لرسم التفاحة
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x * tileSize, apple.y * tileSize, tileSize, tileSize);
}

// دالة لتحريك السلحفاة
function moveTurtle() {
    let head = { x: turtle[0].x + direction.x, y: turtle[0].y + direction.y };
    turtle.unshift(head);
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple = spawnApple(); // توليد تفاحة جديدة
        speed = Math.max(50, speed - 5); // زيادة السرعة لكن مع تحديد حد أدنى
    } else {
        turtle.pop();
    }
}

// دالة لتوليد التفاحة في مكان عشوائي
function spawnApple() {
    return {
        x: Math.floor(Math.random() * (canvas.width / tileSize)),
        y: Math.floor(Math.random() * (canvas.height / tileSize))
    };
}

// دالة للتحقق من الاصطدام
function checkCollision() {
    let head = turtle[0];
    if (head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize) {
        resetGame();
    }
    for (let i = 1; i < turtle.length; i++) {
        if (head.x === turtle[i].x && head.y === turtle[i].y) {
            resetGame();
        }
    }
}

// دالة لإعادة تعيين اللعبة
function resetGame() {
    alert("انتهت اللعبة! النتيجة: " + score);
    score = 0;
    direction = { x: 0, y: 0 };
    turtle = [{ x: 10, y: 10 }];
    speed = 150;
}

// دالة لتحديث اللعبة
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTurtle();
    drawApple();
    moveTurtle();
    checkCollision();
}

// التحكم بالاتجاهات
window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -1 };
    if (event.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 1 };
    if (event.key === "ArrowLeft" && direction.x === 0) direction = { x: -1, y: 0 };
    if (event.key === "ArrowRight" && direction.x === 0) direction = { x: 1, y: 0 };
});

// بدء اللعبة
setInterval(updateGame, speed);