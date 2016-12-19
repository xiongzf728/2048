// 新数字生成时的动画效果
function showNumberWithAnimation(x, y, number) {

    // 获取当前 numberCell
    var numberCell = $("#number-cell-" + x + "-" + y);

    // 根据 numberCell 的值设置相应的样式
    numberCell.css("background-color", getNumberBackgroundColor(number));
    numberCell.css("color", getNumberColor(number));
    numberCell.text(number);

    // 设置动画
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(x, y),
        left: getPosLeft(x, y)
    }, 100);
}

// 移动时的动画效果
function showMoveAnimation(formX, formY, toX, toY) {

    var numberCell = $("#number-cell-" + formX + "-" + formY);

    numberCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}

// 更新分数
function updateScore( score ){
    $('#score').text( score );
}

