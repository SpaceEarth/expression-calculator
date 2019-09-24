function eval() {
    // Do not use eval!!!
    return;
}

function calculate(arr) {
    switch (arr[1]) {
        case '+': return +arr[0] + +arr[2];
        case '-': return arr[0] - arr[2];
        case '*': return arr[0] * arr[2];
        case '/': 
            if (+arr[2] === 0) throw new TypeError("TypeError: Devision by zero.");
            return arr[0] / arr[2];
    }
}

function calculateResult(array) {
    let openNum,
        closeNum,
        signIndx;

    while (array.indexOf('(') >= 0) {
        array.some((v, i) => {
            if (v === '(') {
                openNum = i;
            } else if (v === ')') {
                closeNum = i;
                return true;
            }
            return false;
        });
        array.splice(openNum, closeNum - openNum + 1, calculateResult(array.slice(openNum + 1, closeNum)));
    }

    while (array.length > 1) {
        signIndx = undefined;
        array.some((v, i) => {
            if (!signIndx && (v === '+' || v === '-')) {
                signIndx = i;
            } else if (v === '*' || v === '/') {
                signIndx = i;
                return true;
            }
            return false;
        });
        array.splice(signIndx - 1, 3, calculate(array.slice(signIndx - 1, signIndx + 2)));
    }

    return array[0];
}

function expressionCalculator(expr) {
    const [open, close] = [...expr].reduce((acc, v) => {
        if (v === '(') acc[0] += 1;
        if (v === ')') acc[1] += 1;
        return acc;
    }, [0, 0]);

    if (open !== close) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    return calculateResult(expr
        .replace(/ /g, "")
        .match(/[0-9]{1,}|.{1}/g));
}

module.exports = {
    expressionCalculator
}