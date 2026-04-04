// Ricochet Robots v1.04 | 2026-04-04
const mapGenerator = {
    combineBoards: function(quadrants) {
        let fullMap = Array.from({ length: 16 }, () => Array(16).fill(0));
        
        for (let r = 0; r < 16; r++) {
            for (let c = 0; c < 16; c++) {
                // 判斷在哪個象限 (0:左上, 1:右上, 2:左下, 3:右下)
                let qIdx = (r < 8 ? 0 : 2) + (c < 8 ? 0 : 1);
                let localR = r % 8;
                let localC = c % 8;
                
                // 取得原始數據，若無則給 0
                let val = (quadrants[qIdx] && quadrants[qIdx][localR]) ? quadrants[qIdx][localR][localC] : 0;
                
                // 強制加上 16x16 的最外圍牆壁
                if (r === 0) val |= 1;
                if (c === 15) val |= 2;
                if (r === 15) val |= 4;
                if (c === 0) val |= 8;
                
                fullMap[r][c] = val;
            }
        }
        
        // 中央 2x2 禁區周圍牆壁
        fullMap[7][7] |= 6;  fullMap[7][8] |= 12;
        fullMap[8][7] |= 3;  fullMap[8][8] |= 9;
        
        return fullMap;
    },
    generateFixedMap: function() {
        const b = BOARDS.A_FRONT;
        // 為了測試穩定，四個象限都用同一片 A_FRONT
        return this.combineBoards([b, b, b, b]);
    }
};