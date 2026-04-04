// Ricochet Robots v1.02 | 2026-04-04
const engine = {
    calculateMove: function(robot, direction, fullMap, allRobots) {
        let currR = robot.r, currC = robot.c;
        const d = {
            'top': {dr:-1, dc:0, w:1}, 'right': {dr:0, dc:1, w:2},
            'bottom': {dr:1, dc:0, w:4}, 'left': {dr:0, dc:-1, w:8}
        }[direction];

        while (true) {
            // 1. 檢查當前格是否有該方向的牆
            if (fullMap[currR][currC] & d.w) break;

            let nR = currR + d.dr, nC = currC + d.dc;

            // 2. 邊界檢查
            if (nR < 0 || nR >= 16 || nC < 0 || nC >= 16) break;

            // 3. 檢查是否撞到其他機器人
            if (allRobots.some(r => r.id !== robot.id && r.r === nR && r.c === nC)) break;

            // 4. 中央禁區檢查 (7,7), (7,8), (8,7), (8,8) 不可進入
            if ((nR === 7 || nR === 8) && (nC === 7 || nC === 8)) break;

            currR = nR; currC = nC;
        }
        return { r: currR, c: currC };
    },
    moveRobot: function(robotId, direction) {
        const robot = gameState.robots.find(r => r.id === robotId);
        const target = this.calculateMove(robot, direction, gameState.fullMap, gameState.robots);
        if (target.r !== robot.r || target.c !== robot.c) {
            robot.r = target.r; robot.c = target.c;
            gameState.moveCount++;
            renderer.renderRobots(gameState.robots);
            document.getElementById('move-counter').innerText = `步數：${gameState.moveCount}`;
        }
    }
};