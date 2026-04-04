// Ricochet Robots v1.04 | 2026-04-04
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
    console.log("開始初始化遊戲 v1.04...");
    
    try {
        // 1. 生成地圖
        gameState.fullMap = mapGenerator.generateFixedMap();
        console.log("地圖數據生成成功", gameState.fullMap);

        // 2. 備份位置
        gameState.initialRobots = JSON.parse(JSON.stringify(gameState.robots));

        // 3. 渲染 (確保 renderer.js 已經載入)
        if (typeof renderer === 'undefined') throw new Error("renderer.js 未載入");
        
        renderer.renderBoard(gameState.fullMap, TARGET_DATA);
        renderer.renderRobots(gameState.robots);

        // 4. 設定目標
        const target = TARGET_DATA[Math.floor(Math.random() * TARGET_DATA.length)];
        const targetLabel = document.getElementById('current-target-name');
        if (targetLabel) targetLabel.innerText = target.name;

        console.log("初始化全部完成！");
    } catch (err) {
        console.error("初始化失敗，錯誤原因：", err.message);
    }

    setupControls();
}

function setupControls() {
    // 綁定返回按鈕
    const backBtn = document.getElementById('back-to-start-btn');
    if (backBtn) {
        backBtn.onclick = () => {
            gameState.robots = JSON.parse(JSON.stringify(gameState.initialRobots));
            gameState.moveCount = 0;
            document.getElementById('move-counter').innerText = '步數：0';
            renderer.renderRobots(gameState.robots);
        };
    }

    // 重新開始
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.onclick = () => location.reload();

    // 點擊選機器人
    const boardEl = document.getElementById('game-board');
    if (boardEl) {
        boardEl.onclick = (e) => {
            const cell = e.target.closest('.cell');
            if (!cell) return;
            const r = parseInt(cell.dataset.row);
            const c = parseInt(cell.dataset.col);
            const found = gameState.robots.find(rb => rb.r === r && rb.c === c);
            if (found) {
                gameState.selectedRobot = found;
                renderer.renderRobots(gameState.robots);
            }
        };
    }

    // 鍵盤控制
    window.onkeydown = (e) => {
        if (!gameState.selectedRobot) return;
        const directions = { 'ArrowUp':'top', 'ArrowRight':'right', 'ArrowDown':'bottom', 'ArrowLeft':'left' };
        if (directions[e.key]) {
            e.preventDefault();
            engine.moveRobot(gameState.selectedRobot.id, directions[e.key]);
        }
    };
}

window.onload = initGame;