// Ricochet Robots v1.05 | 2026-04-04
const renderer = {
    renderBoard: function(fullMap, targets) {
        const board = document.getElementById('game-board');
        if(!board) return;
        board.innerHTML = '';
        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                const val = fullMap[r][c];
                if (val & 1) cell.classList.add('wall-top');
                if (val & 2) cell.classList.add('wall-right');
                if (val & 4) cell.classList.add('wall-bottom');
                if (val & 8) cell.classList.add('wall-left');
                if ((r === 7 || r === 8) && (c === 7 || c === 8)) cell.classList.add('center-block');
                
                const t = targets.find(target => target.r === r && target.c === c);
                if (t) {
                    const tIcon = document.createElement('div');
                    tIcon.className = 'target-icon';
                    tIcon.style.backgroundColor = t.color;
                    cell.appendChild(tIcon);
                }
                cell.dataset.row = r; cell.dataset.col = c;
                board.appendChild(cell);
            }
        }
    },
    renderRobots: function(robots) {
        document.querySelectorAll('.robot').forEach(e => e.remove());
        robots.forEach(r => {
            const cell = document.querySelector(`[data-row="${r.r}"][data-col="${r.c}"]`);
            if(!cell) return;
            const div = document.createElement('div');
            div.className = 'robot';
            div.style.backgroundColor = r.color;
            if (gameState.selectedRobot && gameState.selectedRobot.id === r.id) {
                div.style.boxShadow = '0 0 10px 3px white';
                div.style.border = '2px solid white';
            }
            cell.appendChild(div);
        });
    }
};
