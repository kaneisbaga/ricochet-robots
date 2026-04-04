// Ricochet Robots v1.05 | 2026-04-04
const mapGenerator = {
    combineBoards: function(quadrants) {
        let fullMap = Array.from({ length: 16 }, () => Array(16).fill(0));
        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                let qIdx = (r < 8 ? 0 : 2) + (c < 8 ? 0 : 1);
                let val = quadrants[qIdx][r % 8][c % 8];
                
                // 強制加上邊框
                if (r === 0) val |= 1;
                if (c === 15) val |= 2;
                if (r === 15) val |= 4;
                if (c === 0) val |= 8;
                
                fullMap[r][c] = val;
            }
        }
        // 中心禁區牆
        fullMap[7][7] |= 6; fullMap[7][8] |= 12;
        fullMap[8][7] |= 3; fullMap[8][8] |= 9;
        return fullMap;
    },
    generateFixedMap: function() {
        const b = BOARDS.A_FRONT;
        return this.combineBoards([b, b, b, b]);
    }
};
