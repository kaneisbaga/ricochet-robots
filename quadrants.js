/*
    板塊數據來源：DriftingDroids 1.3.11 by Michael Henke (GPL v3)
    授權：https://www.gnu.org/licenses/gpl-3.0.html
    原始碼：src/driftingdroids/model/Board.java

    牆壁位元編碼（與 index.html 一致）：
    bit 1 = 上牆 (North), bit 2 = 右牆 (East),
    bit 4 = 下牆 (South), bit 8 = 左牆 (West)

    所有板塊均以「西北角 (NW)」方向儲存，旋轉由 getRotatedSegment() 處理。

    形狀對應：
    CIRCLE(0) → 'icon-sun'  / 太陽
    TRIANGLE(1)→'icon-triangle'/三角
    SQUARE(2) → 'icon-star' / 星星
    HEXAGON(3) → 'icon-moon'/ 月亮
    VORTEX(4)  → 'swirl'   / 漩渦

    機器人顏色：0=紅(red), 1=綠(green), 2=藍(blue), 3=黃(yellow), -1=any
*/

const COLORS = {
    red:    '#ff5e7e',
    blue:   '#4db8ff',
    green:  '#52d681',
    yellow: '#ffb300'
};

const QUAD_DATA = {
    /* ── 群組 1 (原生角落：西南 SW) ── */
    '1': {
        '1A': {
            map: [
                [ 0,  0,  0,  2,  8,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  6,  8,  0],
                [ 2, 12,  0,  0,  0,  1,  0,  0],
                [ 4,  1,  0,  0,  0,  0,  4,  0],
                [ 1,  0,  0,  0,  0,  2,  9,  0],
                [ 0,  0,  4,  0,  0,  0,  0,  0],
                [ 0,  0,  3,  8,  0,  0,  0,  4],
                [ 0,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃太陽',   color:COLORS.yellow, robot:'yellow', type:'icon-sun',      r:4, c:6 },
                { name:'紅月亮',   color:COLORS.red,    robot:'red',    type:'icon-moon',     r:2, c:1 },
                { name:'綠星星',   color:COLORS.green,  robot:'green',  type:'icon-star',     r:1, c:5 },
                { name:'藍三角',   color:COLORS.blue,   robot:'blue',   type:'icon-triangle', r:6, c:2 }
            ]
        },
        '1B': {
            map: [
                [ 0,  0,  0,  0,  2,  8,  0,  0],
                [ 0,  4,  0,  0,  0,  0,  6,  8],
                [ 2,  9,  0,  0,  0,  0,  1,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  4,  0],
                [ 4,  0,  0,  0,  0,  0,  3,  8],
                [ 1,  0,  2, 12,  0,  0,  0,  4],
                [ 0,  0,  0,  1,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃星星',   color:COLORS.yellow, robot:'yellow', type:'icon-star',     r:1, c:6 },
                { name:'紅太陽',   color:COLORS.red,    robot:'red',    type:'icon-sun',      r:6, c:3 },
                { name:'藍月亮',   color:COLORS.blue,   robot:'blue',   type:'icon-moon',     r:5, c:6 },
                { name:'綠三角',   color:COLORS.green,  robot:'green',  type:'icon-triangle', r:2, c:1 }
            ]
        },
        '1C': {
            map: [
                [ 0,  0,  0,  0,  0,  2,  8,  0],
                [ 0,  0,  0,  4,  0,  0,  0,  0],
                [ 0,  0,  2,  9,  0,  0,  0,  0],
                [ 4,  0,  4,  0,  2, 12,  0,  0],
                [ 1,  0,  3,  8,  0,  1,  0,  0],
                [ 0,  0,  0,  0,  6,  8,  0,  0],
                [ 0,  0,  0,  0,  1,  0,  0,  4],
                [ 0,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'藍三角',   color:COLORS.blue,   robot:'blue',   type:'icon-triangle', r:3, c:5 },
                { name:'黃太陽',   color:COLORS.yellow, robot:'yellow', type:'icon-sun',      r:2, c:3 },
                { name:'紅月亮',   color:COLORS.red,    robot:'red',    type:'icon-moon',     r:4, c:2 },
                { name:'綠星星',   color:COLORS.green,  robot:'green',  type:'icon-star',     r:5, c:4 }
            ]
        },
        '1D': {
            map: [
                [ 0,  0,  2,  8,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  4,  0],
                [ 0,  0,  0,  0,  0,  6,  9,  0],
                [ 0,  0,  0,  0,  0,  1,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 2, 12,  0,  0,  0,  0,  0,  0],
                [ 4,  1,  0,  0,  4,  0,  0,  4],
                [ 1,  0,  0,  0,  3,  8,  2,  0]
            ],
            targets: [
                { name:'黃太陽',   color:COLORS.yellow, robot:'yellow', type:'icon-sun',      r:2, c:6 },
                { name:'綠星星',   color:COLORS.green,  robot:'green',  type:'icon-star',     r:2, c:5 },
                { name:'藍三角',   color:COLORS.blue,   robot:'blue',   type:'icon-triangle', r:7, c:4 },
                { name:'紅月亮',   color:COLORS.red,    robot:'red',    type:'icon-moon',     r:5, c:1 }
            ]
        }
    },

    /* ── 群組 2 (原生角落：西北 NW) ── */
    '2': {
        '2A': {
            map: [
                [ 0,  2,  8,  0,  4,  0,  0,  0],
                [ 0,  4,  0,  2,  9,  0,  0,  0],
                [ 0,  3,  8,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  6,  8],
                [ 0,  0,  0,  0,  0,  0,  1,  0],
                [ 4,  0,  0,  0,  0,  0,  0,  0],
                [ 1,  0,  2, 12,  0,  0,  0,  4],
                [ 0,  0,  0,  1,  0,  0,  2,  0]
            ],
            targets: [
                { name:'綠三角',   color:COLORS.green,  robot:'green',  type:'icon-triangle', r:2, c:1 },
                { name:'紅太陽',   color:COLORS.red,    robot:'red',    type:'icon-sun',      r:1, c:4 },
                { name:'藍月亮',   color:COLORS.blue,   robot:'blue',   type:'icon-moon',     r:6, c:3 },
                { name:'黃星星',   color:COLORS.yellow, robot:'yellow', type:'icon-star',     r:3, c:6 }
            ]
        },
        '2B': {
            map: [
                [ 0,  0,  0,  2,  8,  0,  0,  0],
                [ 2, 12,  0,  0,  0,  0,  4,  0],
                [ 0,  1,  0,  0,  0,  0,  3,  8],
                [ 0,  0,  0,  0,  0,  0,  0,  2],
                [ 0,  0,  6,  8,  0,  0,  0,  4],
                [ 4,  0,  1,  0,  0,  0,  2,  9],
                [ 1,  0,  0,  0,  0,  0,  0,  4],
                [ 0,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃月亮',   color:COLORS.yellow, robot:'yellow', type:'icon-moon',     r:5, c:7 },
                { name:'紅三角',   color:COLORS.red,    robot:'red',    type:'icon-triangle', r:1, c:1 },
                { name:'藍星星',   color:COLORS.blue,   robot:'blue',   type:'icon-star',     r:4, c:2 },
                { name:'綠太陽',   color:COLORS.green,  robot:'green',  type:'icon-sun',      r:2, c:6 }
            ]
        },
        '2C': {
            map: [
                [ 0,  2,  8,  4,  0,  0,  0,  0],
                [ 0,  0,  2,  9,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  6,  8],
                [ 2, 12,  0,  0,  0,  0,  1,  0],
                [ 0,  1,  0,  0,  4,  0,  0,  0],
                [ 4,  0,  0,  0,  3,  8,  0,  4],
                [ 1,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'綠三角',   color:COLORS.green,  robot:'green',  type:'icon-triangle', r:1, c:3 },
                { name:'紅太陽',   color:COLORS.red,    robot:'red',    type:'icon-sun',      r:4, c:1 },
                { name:'黃星星',   color:COLORS.yellow, robot:'yellow', type:'icon-star',     r:3, c:6 },
                { name:'藍月亮',   color:COLORS.blue,   robot:'blue',   type:'icon-moon',     r:6, c:4 }
            ]
        },
        '2D': {
            map: [
                [ 0,  0,  0,  0,  0,  2,  8,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  4,  0,  0,  0,  0,  0,  0],
                [ 2,  9,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  6,  8],
                [ 4,  0,  4,  0,  0,  0,  1,  2],
                [ 1,  0,  3, 12,  0,  0,  0,  4],
                [ 0,  0,  0,  1,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃星星',   color:COLORS.yellow, robot:'yellow', type:'icon-star',     r:4, c:6 },
                { name:'紅太陽',   color:COLORS.red,    robot:'red',    type:'icon-sun',      r:3, c:1 },
                { name:'藍月亮',   color:COLORS.blue,   robot:'blue',   type:'icon-moon',     r:6, c:3 },
                { name:'綠三角',   color:COLORS.green,  robot:'green',  type:'icon-triangle', r:6, c:2 }
            ]
        }
    },

    /* ── 群組 3 (原生角落：東北 NE) ── */
    '3': {
        '3A': {
            map: [
                [ 0,  0,  0,  2,  8,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  6,  8,  0],
                [ 0,  0,  4,  0,  0,  1,  0,  0],
                [ 4,  0,  3,  8,  0,  0,  0,  0],
                [ 1,  4,  0,  0,  0,  0,  2, 12],
                [ 2,  9,  0,  0,  0,  0,  0,  5],
                [ 0,  0,  0,  0,  0,  4,  2,  0]
            ],
            targets: [
                { name:'紅三角',   color:COLORS.red,    robot:'red',    type:'icon-triangle', r:5, c:7 },
                { name:'黃月亮',   color:COLORS.yellow, robot:'yellow', type:'icon-moon',     r:6, c:1 },
                { name:'綠太陽',   color:COLORS.green,  robot:'green',  type:'icon-sun',      r:4, c:2 },
                { name:'藍星星',   color:COLORS.blue,   robot:'blue',   type:'icon-star',     r:2, c:5 }
            ]
        },
        '3B': {
            map: [
                [ 0,  0,  4,  0,  2,  8,  0,  0],
                [ 0,  2,  9,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  2, 12,  0],
                [ 4,  0,  0,  0,  4,  0,  1,  0],
                [ 1,  0,  0,  0,  3,  8,  0,  0],
                [ 0,  6,  8,  0,  0,  0,  0,  4],
                [ 0,  1,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃太陽',   color:COLORS.yellow, robot:'yellow', type:'icon-sun',      r:1, c:2 },
                { name:'紅月亮',   color:COLORS.red,    robot:'red',    type:'icon-moon',     r:5, c:4 },
                { name:'藍三角',   color:COLORS.blue,   robot:'blue',   type:'icon-triangle', r:3, c:6 },
                { name:'綠星星',   color:COLORS.green,  robot:'green',  type:'icon-star',     r:6, c:1 }
            ]
        },
        '3C': {
            map: [
                [ 0,  2,  8,  0,  4,  0,  0,  0],
                [ 0,  0,  0,  0,  3,  8,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 2, 12,  0,  0,  0,  0,  0,  0],
                [ 0,  1,  0,  0,  0,  4,  0,  0],
                [ 4,  0,  0,  0,  2,  9,  0,  0],
                [ 1,  0,  0,  6,  8,  0,  0,  4],
                [ 0,  0,  4,  1,  0,  0,  2,  0]
            ],
            targets: [
                { name:'藍星星',   color:COLORS.blue,   robot:'blue',   type:'icon-star',     r:6, c:3 },
                { name:'紅三角',   color:COLORS.red,    robot:'red',    type:'icon-triangle', r:3, c:1 },
                { name:'黃月亮',   color:COLORS.yellow, robot:'yellow', type:'icon-moon',     r:5, c:5 },
                { name:'綠太陽',   color:COLORS.green,  robot:'green',  type:'icon-sun',      r:1, c:4 }
            ]
        },
        '3D': {
            map: [
                [ 0,  0,  0,  0,  2,  8,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  0,  0],
                [ 4,  0,  0,  0,  0,  0,  6,  8],
                [ 1,  0,  4,  0,  0,  0,  1,  0],
                [ 0,  0,  3, 12,  0,  0,  0,  0],
                [ 0,  0,  0,  1,  0,  4,  0,  0],
                [ 0,  0,  0,  0,  2,  9,  0,  4],
                [ 0,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃月亮',   color:COLORS.yellow, robot:'yellow', type:'icon-moon',     r:6, c:5 },
                { name:'藍星星',   color:COLORS.blue,   robot:'blue',   type:'icon-star',     r:2, c:6 },
                { name:'綠太陽',   color:COLORS.green,  robot:'green',  type:'icon-sun',      r:4, c:2 },
                { name:'紅三角',   color:COLORS.red,    robot:'red',    type:'icon-triangle', r:4, c:3 }
            ]
        }
    },

    /* ── 群組 4 (原生角落：東南 SE) ── */
    '4': {
        '4A': {
            map: [
                [ 0,  0,  0,  2,  8,  0,  0,  0],
                [ 0,  0,  0,  0,  0,  2, 12,  0],
                [ 0,  4,  0,  0,  0,  0,  1,  0],
                [ 0,  3,  8,  0,  0,  4,  0,  0],
                [ 0,  0,  0,  0,  2,  9,  0,  0],
                [ 0,  0,  6,  8,  0,  0,  0,  6],
                [ 4,  0,  1,  0,  0,  0,  0,  5],
                [ 1,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃三角',   color:COLORS.yellow, robot:'yellow', type:'icon-triangle', r:3, c:1 },
                { name:'紅星星',   color:COLORS.red,    robot:'red',    type:'icon-star',     r:5, c:2 },
                { name:'藍太陽',   color:COLORS.blue,   robot:'blue',   type:'icon-sun',      r:1, c:6 },
                { name:'綠月亮',   color:COLORS.green,  robot:'green',  type:'icon-moon',     r:4, c:5 },
                { name:'糖果漩渦', color:'swirl',       robot:'any',    type:'swirl',         r:5, c:7 }
            ]
        },
        '4B': {
            map: [
                [ 0,  0,  0,  0,  2,  8,  0,  0],
                [ 0,  0,  6,  8,  0,  0,  0,  0],
                [ 0,  0,  1,  0,  0,  0,  0,  0],
                [ 2, 12,  0,  0,  0,  0,  4,  0],
                [ 4,  1,  0,  0,  0,  2,  9,  0],
                [ 1,  0,  0,  0,  0,  4,  0,  0],
                [ 0,  0,  0,  0,  0,  3,  8,  4],
                [ 0,  0,  0,  6,  8,  0,  2,  0]
            ],
            targets: [
                { name:'紅太陽',   color:COLORS.red,    robot:'red',    type:'icon-sun',      r:1, c:2 },
                { name:'綠月亮',   color:COLORS.green,  robot:'green',  type:'icon-moon',     r:3, c:1 },
                { name:'黃三角',   color:COLORS.yellow, robot:'yellow', type:'icon-triangle', r:4, c:6 },
                { name:'藍太陽',   color:COLORS.blue,   robot:'blue',   type:'icon-sun',      r:6, c:5 },
                { name:'糖果漩渦', color:'swirl',       robot:'any',    type:'swirl',         r:7, c:3 }
            ]
        },
        '4C': {
            map: [
                [ 0,  0,  2,  8,  0,  0,  0,  0],
                [ 0,  0,  0,  0,  2, 12,  0,  0],
                [ 0,  0,  0,  0,  0,  1,  0,  6],
                [ 4,  0,  0,  0,  0,  0,  0,  1],
                [ 1,  0,  0,  6,  8,  0,  4,  0],
                [ 0,  4,  0,  1,  0,  2,  9,  0],
                [ 0,  3,  8,  0,  0,  0,  0,  4],
                [ 0,  0,  0,  0,  0,  0,  2,  0]
            ],
            targets: [
                { name:'黃三角',   color:COLORS.yellow, robot:'yellow', type:'icon-triangle', r:6, c:1 },
                { name:'紅星星',   color:COLORS.red,    robot:'red',    type:'icon-star',     r:4, c:3 },
                { name:'藍太陽',   color:COLORS.blue,   robot:'blue',   type:'icon-sun',      r:1, c:5 },
                { name:'糖果漩渦', color:'swirl',       robot:'any',    type:'swirl',         r:2, c:7 },
                { name:'綠月亮',   color:COLORS.green,  robot:'green',  type:'icon-moon',     r:5, c:6 }
            ]
        },
        '4D': {
            map: [
                [ 0,  0,  0,  0,  2,  8,  0,  0],
                [ 0,  0,  0,  0,  0,  0,  4,  0],
                [ 0,  0,  4,  0,  0,  2,  9,  0],
                [ 0,  0,  3, 12,  0,  0,  0,  0],
                [ 0,  0,  0,  1,  0,  0,  0,  0],
                [ 0,  6,  8,  0,  0,  0,  0,  0],
                [ 4,  1,  0,  0,  0,  0,  0,  4],
                [ 1,  0,  0,  0,  0,  6, 10,  0]
            ],
            targets: [
                { name:'紅星星',   color:COLORS.red,    robot:'red',    type:'icon-star',     r:5, c:1 },
                { name:'藍太陽',   color:COLORS.blue,   robot:'blue',   type:'icon-sun',      r:3, c:2 },
                { name:'綠月亮',   color:COLORS.green,  robot:'green',  type:'icon-moon',     r:3, c:3 },
                { name:'黃三角',   color:COLORS.yellow, robot:'yellow', type:'icon-triangle', r:2, c:6 },
                { name:'糖果漩渦', color:'swirl',       robot:'any',    type:'swirl',         r:7, c:5 }
            ]
        }
    }
};

/* ─────────────────────────────────────────
   牆壁方向位元值旋轉（順時針 steps 步）
   dirs 順序: [N=1, E=2, S=4, W=8]
───────────────────────────────────────── */
function rotateWalls(val, steps) {
    if (steps === 0 || val === 0) return val;
    const dirs = [1, 2, 4, 8];
    let newVal = 0;
    for (let i = 0; i < 4; i++) {
        if (val & dirs[i]) {
            newVal |= dirs[(i + steps) % 4];
        }
    }
    return newVal;
}

/* ─────────────────────────────────────────
   取得板塊並旋轉到目標角落
   destCorner: 0=LT(NW), 1=RT(NE), 2=RB(SE), 3=LB(SW)
   所有板塊均以 NW 方向儲存，srcCorner 固定為 0
───────────────────────────────────────── */
function getRotatedSegment(name, destCorner) {
    const num = name.charAt(0);
    const steps = destCorner; // srcCorner 固定=0，故 steps = destCorner
    const orig = QUAD_DATA[num][name];
    if (!orig) return null;

    const map = [];
    for (let r = 0; r < 8; r++) {
        map.push(new Array(8).fill(0));
    }

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            let nr = r, nc = c;
            if      (steps === 1) { nr = c;     nc = 7 - r; }
            else if (steps === 2) { nr = 7 - r; nc = 7 - c; }
            else if (steps === 3) { nr = 7 - c; nc = r;     }
            map[nr][nc] = rotateWalls(orig.map[r][c], steps);
        }
    }

    const targets = orig.targets.map(t => {
        let nr = t.r, nc = t.c;
        if      (steps === 1) { nr = t.c;     nc = 7 - t.r; }
        else if (steps === 2) { nr = 7 - t.r; nc = 7 - t.c; }
        else if (steps === 3) { nr = 7 - t.c; nc = t.r;     }
        return { name: t.name, color: t.color, robot: t.robot, type: t.type, r: nr, c: nc };
    });

    return { map, targets };
}

/* ─────────────────────────────────────────
   將四個旋轉後的板塊拼接為 16×16 地圖
───────────────────────────────────────── */
function stitchMap(rotatedLT, rotatedRT, rotatedLB, rotatedRB) {
    const map = [];
    for (let r = 0; r < 16; r++) {
        const row = [];
        for (let c = 0; c < 16; c++) {
            if      (r < 8 && c < 8)  row.push(rotatedLT.map[r][c]);
            else if (r < 8 && c >= 8) row.push(rotatedRT.map[r][c - 8]);
            else if (r >= 8 && c < 8) row.push(rotatedLB.map[r - 8][c]);
            else                      row.push(rotatedRB.map[r - 8][c - 8]);
        }
        map.push(row);
    }

    // 中心縫合對稱：強制左右兩側牆壁同步
    for (let r = 0; r < 16; r++) {
        if ((map[r][7] & 2) || (map[r][8] & 8)) {
            map[r][7] |= 2;
            map[r][8] |= 8;
        }
    }
    // 中心縫合對稱：強制上下兩側牆壁同步
    for (let c = 0; c < 16; c++) {
        if ((map[7][c] & 4) || (map[8][c] & 1)) {
            map[7][c] |= 4;
            map[8][c] |= 1;
        }
    }

    // 強制外圍邊界牆壁
    for (let i = 0; i < 16; i++) {
        map[0][i]  |= 1;   // 上邊界
        map[15][i] |= 4;   // 下邊界
        map[i][0]  |= 8;   // 左邊界
        map[i][15] |= 2;   // 右邊界
    }

    // 強制中心障礙區四角牆壁
    map[7][7]  |= 9;   // N+W
    map[7][8]  |= 3;   // N+E
    map[8][7]  |= 12;  // S+W
    map[8][8]  |= 6;   // S+E

    return map;
}

/* ─────────────────────────────────────────
   合併四個板塊的目標，並調整座標偏移
───────────────────────────────────────── */
function stitchTargets(rotatedLT, rotatedRT, rotatedLB, rotatedRB) {
    const targets = [];
    const addTargets = (qTargets, rOffset, cOffset) => {
        qTargets.forEach(t => {
            targets.push({
                name:  t.name,
                color: t.color,
                robot: t.robot,
                type:  t.type,
                r: t.r + rOffset,
                c: t.c + cOffset
            });
        });
    };
    addTargets(rotatedLT.targets,  0,  0);
    addTargets(rotatedRT.targets,  0,  8);
    addTargets(rotatedLB.targets,  8,  0);
    addTargets(rotatedRB.targets,  8,  8);
    return targets;
}
