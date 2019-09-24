function eval() {
    // Do not use eval!!!
    return;
}

function getPriority(value) {
    switch (value) {
        case '-':
        case '+':
            return 1;
        case '*':
        case '/':
            return 2;
        case '(':
            return getPriority.base += 1;
        case ')':
            return getPriority.base -= 1;
    }
    return 0;
}
getPriority.base = 2;

function expressionCalculator(expr) {
    console.log([...expr.replace(/ /g, "")].reduce((acc, value, indx) => {
        if (isNaN(Number(value))) {
            acc.stack.push(value);
            acc.priority.push(getPriority(value));
            acc.last = false;
        } else {
            if (acc.last) {
                acc.stack[acc.stack.length - 1] += value;
            } else {
                acc.stack.push(value);
                acc.priority.push(0);
            }
            acc.last = true;
        } 
        return acc;
    }, {
        stack: [],
        priority: [],
        last: false
    }).priority);
}

module.exports = {
    expressionCalculator
}