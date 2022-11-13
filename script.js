let totalResult = 0;
let memory = "0"
let realOperator;

const result = document.querySelector('.result')



/**
 * If the value is not a number, then call the valueSymbol function, otherwise call the valueNumber
 * function.
 * @param value - the value of the button that was clicked
 */

function buttonValue(value) {
    if (isNaN(value)) {
        valueSymbol(value);
    }else{
        valueNumber(value);
    }
    result.innerHTML = memory;
}

/**
 * It takes a symbol as an argument, and depending on the symbol, it will either clear the memory,
 * calculate the result, delete the last character in the memory, or perform a mathematical operation.
 * @param symbol - the symbol that was clicked
 * @returns The value of the symbol.
 */

function valueSymbol(symbol) {
    switch (symbol) {
        case 'C':
            memory = "0"
            totalResult = 0
            break;
    
        case '=':
            if (realOperator == null) {
                return
            }
            cleanOperation(parseInt(memory));
            realOperator = null;
            memory = totalResult;
            totalResult = 0;
            break;
        case '←':
            if (memory.length ===1) {
                memory = "0"
            }else{
                memory = memory.substring(0, memory.length - 1)
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            valueMath(symbol)
            break;
    }
}




function valueMath(symbol) {
    if (memory === '0') {
        return;
    }

    const inMemory = parseInt(memory);

    if (totalResult === 0) {
        totalResult = inMemory
    }else{
        cleanOperation(inMemory);
    }
    realOperator = symbol;
    memory = '0';


}

/**
 * If the realOperator is equal to '+', then add the inMemory value to the totalResult, otherwise if
 * the realOperator is equal to '-', then subtract the inMemory value from the totalResult, otherwise
 * if the realOperator is equal to '×', then multiply the inMemory value by the totalResult, otherwise
 * if the realOperator is equal to '÷', then divide the totalResult by the inMemory value.
 * @param inMemory - the number that is currently in the memory
 */

function cleanOperation(inMemory) {
    if (realOperator === '+') {
        totalResult += inMemory;
    }else if(realOperator === '-'){
        totalResult -= inMemory;
    }else if(realOperator === '×'){
        totalResult *= inMemory
    }else if(realOperator === '÷'){
        totalResult /= inMemory
    }
}

function valueNumber(numberString) {
    if(memory === "0"){
        memory = numberString;
    }else{
        memory += numberString;
    }
}

/**
 * When a button is clicked, run the buttonValue function and pass the value of the button that was
 * clicked to it.
 */

function init() {
    document.querySelector('.buttons-calc').addEventListener('click', function(event){
        buttonValue(event.target.innerText);
    })
}

init()
