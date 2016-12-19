// 根据格子所在的行和列返回出相应的Top值
function getPosLeft(row, col) {

    return 120 * col + 20;

}

// 根据格子所在的行和列返回出相应的Left值
function getPosTop(row, col) {

    return 120 * row + 20;

}

// 判断是否还有空格子
function noSpace(aBoard) {

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            // aBoard = 0 则为空
            if (aBoard[i][j] == 0) {
                return false;
            }

        }
    }

    return true;

}

// numberCell 前景色
function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";

    return "white";
}

// numberCell 背景色
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return black;
}

//// 选择一个随机空格子
//function getRandomBlank() {
//
//	for( var i = 0 ; i < 4 ; i ++ ){
//        for( var j = 0 ; j < 4 ; j ++ ){
//            if( aBoard[i][j] == 0 ){
//                var blankPos = {
//                    "row" : 0,
//                    "col" : 0
//                }
//            	// 把空格子的坐标作为对象压入 aBlank
//            	blankPos.row = i;
//            	blankPos.col = j;
//            	aBlank.push(blankPos);
//            }
//        }
//    }
//
//    // 随机选择 aBlank 中的一个元素返回
//    target = parseInt(Math.floor(Math.random() * aBlank.length));
//    if(aBlank[target]){
//        alert("asdfasdf");
//        return aBlank[target];
//    }
//    // 如果数组为空会返回 undefined 会报错
//}

// 判断还能否继续移动
function noMove(aBoard) {
    if(canMoveDown(aBoard) ||
       canMoveLeft(aBoard) ||
       canMoveRight(aBoard) ||
       canMoveUp(aBoard)){
        return false
    }
    return true;
}

// 判断 row 这一行水平方向 col1 到 col2 之间有没有障碍物
function noBlockHorizontal(row, col1, col2, aBoard) {
    for (var i = col1 + 1; i < col2; i++) {
        if (aBoard[row][i] != 0) {
            return false;
        }
    }
    return true;
}

// 判断 col 这一列竖直方向 row1 到 row2 之间有没有障碍物
function noBlockVertical(col, row1, row2, aBoard) {
    for (var i = row1 + 1; i < row2; i++) {
        if (aBoard[i][col] != 0) {
            return false;
        }
    }
    return true;
}

// 判断能否左移
function canMoveLeft() {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {

            // 遍历 aBoard ，判断所有不为空的格子
            if (aBoard[i][j] != 0) {

                // 如果左边有空格子或者有相等的格子，可以左移
                if (aBoard[i][j - 1] == 0 || aBoard[i][j] == aBoard[i][j - 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断能否上移
function canMoveUp() {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            if (aBoard[i][j] != 0) {

                if (aBoard[i - 1][j] == 0 || aBoard[i][j] == aBoard[i - 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断能否右移
function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {

            if (aBoard[i][j] != 0) {

                if (aBoard[i][j + 1] == 0 || aBoard[i][j] == aBoard[i][j + 1]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 判断能否下移
function canMoveDown() {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {

            if (aBoard[i][j] != 0) {

                if (aBoard[i + 1][j] == 0 || aBoard[i][j] == aBoard[i + 1][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 更新分数
function updateScore(score) {
    $('#score').text(score);
}
