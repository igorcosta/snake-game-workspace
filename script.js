const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = 'right';
let food = { x: gridSize * 10, y: gridSize * 10 };
let gameInterval;
let score = 0;

function initGame() {
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(gameLoop, 100);
}

function changeDirection(event) {
    const key = event.key;
    if (key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
}

function gameLoop() {
    updateGameState();
    renderGame();
}

function updateGameState() {
    const head = { ...snake[0] };

    if (direction === 'up') {
        head.y -= gridSize;
    } else if (direction === 'down') {
        head.y += gridSize;
    } else if (direction === 'left') {
        head.x -= gridSize;
    } else if (direction === 'right') {
        head.x += gridSize;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }

    if (checkCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over');
        playDeathAnimation();
    }
}

function checkCollision(head) {
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

function renderGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvasSize - 100, 30);
}

function playDeathAnimation() {
    // Add funny animations for the snake when it dies
    // This is a placeholder for the actual animation code
}

initGame();
