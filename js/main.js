// Ricochet Robots v1.05 | 2026-04-04
const gameState = {
    fullMap: [],
    initialRobots: [],
    robots: [
        { id: 'red', r: 1, c: 1, color: '#ff4444' },
        { id: 'blue', r: 1, c: 14, color: '#4444ff' },
        { id: 'green', r: 14, c: 1, color: '#44bb44' },
        { id: 'yellow', r: 14, c: 14, color: '#ffbb00' }
    ],
    selectedRobot: null,
    moveCount: 0
};

function initGame() {
    try {
        gameState.fullMap = mapGenerator.generateFixedMap();
        gameState.initialRobots = JSON.parse(JSON.stringify(gameState.robots));
        
        renderer.renderBoard(gameState.fullMap, TARGET_DATA);
        renderer.renderRobots(gameState.robots);

        const target = TARGET_DATA[Math.floor(Math.random() * TARGET_DATA.length)];
        document.getElementById('current-target-name').innerText = target.name;

        setupEvents();
    } catch (e) {
        console.error("初始化失敗:", e);
    }
}

function setupEvents() {
    document.getElementById('back-to-start-btn').onclick = () => {
        gameState.robots = JSON.parse(JSON.stringify(gameState.initialRobots));
        gameState.moveCount = 0;
        document.getElementById('move-counter').innerText = '步數：0';
        renderer.renderRobots(gameState.robots);
    };

    document.getElementById('reset-btn').onclick = () => location.reload();

    document.getElementById('game-board').onclick = (e) => {
        const cell = e.target.closest('.cell');
        if (!cell) return;
        const r = parseInt(cell.dataset.row), c = parseInt(cell.dataset.col);
        const rb = gameState.robots.find(robot => robot.r === r && robot.c === c);
        if (rb) {
            gameState.selectedRobot = rb;
            renderer.renderRobots(gameState.robots);
        }
    };

    window.onkeydown = (e) => {
        if (!gameState.selectedRobot) return;
        const keys = { 'ArrowUp':'top', 'ArrowRight':'right', 'ArrowDown':'bottom', 'ArrowLeft':'left' };
        if (keys[e.key]) {
            e.preventDefault();
            engine.moveRobot(gameState.selectedRobot.id, keys[e.key]);
        }
    };
}

window.onload = initGame;
