var aBoard = [];				// 二维数组，保存棋盘格里的所有数字
var score = 0;					// 记录当前得分
var aHasAdded = [];				// 布尔二维数组，记录所有格子是否合并过，合并过为true，否则为false

// 主函数
$(document).ready(function () {

    // 开始一个新的游戏
    newGame();


});

// 开始新游戏
function newGame() {

    // 初始化棋盘
    init();

    // 在棋盘格内随机生成两个数
    generateOneNumber();
    generateOneNumber();

}

// 初始化棋盘格
function init() {

    // 绝对定位所有的gridCell
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-" + i + "-" + j);
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }

    // 初始化 aBoard 和 aHasAdded 成为二维数组
    for (var i = 0; i < 4; i++) {
        aBoard[i] = [];
        aHasAdded[i] = [];

        for (var j = 0; j < 4; j++) {

            // 初始化 aBoard 为 0
            aBoard[i][j] = 0;

            // 初始化 aHasAdded 为 false
            aHasAdded[i][j] = false;
        }
    }

    // 初始化 score 为 0
    score = 0;

    // 更新棋盘格并显示
    updateBoardView();

}

// 在棋盘格的随机一个空格子里生成一个数 2 或 4
function generateOneNumber() {

    // 判断是否还有空格子
    if (noSpace(aBoard)) {
        return false;
    }

    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (aBoard[randx][randy] == 0)
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                if (aBoard[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    aBoard[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;

}

// 根据 aBoard 的值更新所有格子的显示
function updateBoardView() {

    // 先删除当前所有的 numberCell
    $(".number-cell").remove();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            // 创建新的 numberCell
            $("#gridContainer").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");

            // 获得当前 numberCell
            var theNumberCell = $("#number-cell-" + i + "-" + j);

            // 如果当前格子为空
            if (aBoard[i][j] == 0) {
                // 让这个格子不可见且位于 gridCell 正中间
                theNumberCell.css("width", "0px");
                theNumberCell.css("height", "0px");
                theNumberCell.css("left", getPosLeft(i, j) + 50);
                theNumberCell.css("top", getPosTop(i, j) + 50);
            } else {
                // 当前格子不为空
                // 为这个格子设置基于格子中的数字的样式
                theNumberCell.css("width", "100px");
                theNumberCell.css("height", "100px");
                theNumberCell.css("left", getPosLeft(i, j));
                theNumberCell.css("top", getPosTop(i, j));
                theNumberCell.css("color", getNumberColor(aBoard[i][j]));
                theNumberCell.css("background-color", getNumberBackgroundColor(aBoard[i][j]));
                theNumberCell.text(aBoard[i][j]);

            }

            aHasAdded[i][j] = false; //
        }
    }

}

// 判断游戏是否结束
function isGameOver() {
    if (noSpace(aBoard) && noMove(aBoard)) {
        gameOver();
    }
}

// 结束游戏
function gameOver() {
    alert("Game over!");
}

// 监听按键，方向控制
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37: //left
            // 先执行移动
            if (moveLeft()) {
                //再生成新的数字
                // 设置延迟是防止动画还没完成就重新加载棋盘格了
                setTimeout("generateOneNumber()", 210);
                // 每次移动完成，生成新数字之后判断是否游戏结束
                setTimeout("isGameOver()", 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
            break;
        default: //default
            break;
    }
});

// 左移
function moveLeft() {

    // 先判断能否左移
    if (!canMoveLeft(aBoard)) {
        return false;
    }

    // 开始左移
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (aBoard[i][j] != 0) {

                // 对每个不为空且能够左移小格子都要左移
                // k = 1 是因为最左边的一列不能左移
                // 遍历当前格子右边一格到 k = 1 的所有格子
                for (var k = 0; k < j; k++) {

                    // 判断：格子移动只有两种情况
                    // 1.左侧有空格子,且没有障碍物
                    if (aBoard[i][k] == 0 && noBlockHorizontal(i, k, j, aBoard)) {

                        // 向左移动
                        showMoveAnimation(i, j, i, k);
                        aBoard[i][k] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        continue;
                    }

                    // 2.左侧有可以合并的(相等），且没有障碍物，且没有合并过
                    else if (aBoard[i][k] == aBoard[i][j] && noBlockHorizontal(i, k, j, aBoard) && !aHasAdded[i][k]) {

                        // 向左移动
                        showMoveAnimation(i, j, i, k);

                        // 合并
                        aBoard[i][k] += aBoard[i][j];
                        aBoard[i][j] = 0;

                        // 分数增加
                        score += aBoard[i][k];
                        updateScore(score);

                        // 标记该格子已经合并过了
                        aHasAdded[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

// 上移
function moveUp() {

    if (!canMoveUp(aBoard)) {
        return false;
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (aBoard[i][j] != 0) {

                for (var k = 0; k < i; k++) {

                    if (aBoard[k][j] == 0 && noBlockVertical(j, k, i, aBoard)) {

                        showMoveAnimation(i, j, k, j);
                        aBoard[k][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        continue;
                    }

                    else if (aBoard[k][j] == aBoard[i][j] && noBlockVertical
                        (j, k, i, aBoard) && !aHasAdded[k][j]) {

                        showMoveAnimation(i, j, k, j);

                        aBoard[k][j] += aBoard[i][j];
                        aBoard[i][j] = 0;

                        score += aBoard[k][j];
                        updateScore(score);

                        aHasAdded[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

// 右移
function moveRight() {

    if (!canMoveRight(aBoard)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (aBoard[i][j] != 0) {

                //for (var k = 0; k < j; k++) {
                for (var k = 3; k > j; k--) {

                    if (aBoard[i][k] == 0 && noBlockHorizontal(i, j, k, aBoard)) {

                        showMoveAnimation(i, j, i, k);
                        aBoard[i][k] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        continue;
                    }

                    else if (aBoard[i][k] == aBoard[i][j] && noBlockHorizontal(i, j, k, aBoard) && !aHasAdded[i][k]) {

                        showMoveAnimation(i, j, i, k);

                        aBoard[i][k] += aBoard[i][j];
                        aBoard[i][j] = 0;

                        score += aBoard[i][k];
                        updateScore(score);

                        aHasAdded[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}

// 下移
function moveDown() {

    if (!canMoveDown(aBoard)) {
        return false;
    }

    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (aBoard[i][j] != 0) {

                for (var k = 3; k > i; k--) {

                    if (aBoard[k][j] == 0 && noBlockVertical(j, i, k, aBoard)) {

                        showMoveAnimation(i, j, k, j);
                        aBoard[k][j] = aBoard[i][j];
                        aBoard[i][j] = 0;
                        continue;
                    }

                    else if (aBoard[k][j] == aBoard[i][j] && noBlockVertical
                        (j, i, k, aBoard) && !aHasAdded[k][j]) {

                        showMoveAnimation(i, j, k, j);

                        aBoard[k][j] += aBoard[i][j];
                        aBoard[i][j] = 0;

                        score += aBoard[k][j];
                        updateScore(score);

                        aHasAdded[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()", 200);
    return true;
}
