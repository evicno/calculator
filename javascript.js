// Variables to save data of the operation.
// We use strings to add new numbers to num1 and num2 (only convert it to Number
// in clickOperator)
let num1 = "";
let operator = "";
let num2 = "";
let result = ""; // result only changes after = being entered
let lastButton = [];

// Create arrays with all operators and numbers buttons
//const operators = Array.from(document.querySelectorAll(".operator"));
//const numbers = Array.from(document.querySelectorAll(".number"));

function operate(num1, num2, operator) {
    switch (operator) {
        case "add":
            result = (Number(num1) + Number(num2));
            break;
        case "sub":
            result = (Number(num1) - Number(num2));
            break;
        case "mult":
            result = (Number(num1) * Number(num2));
            break;
        case "div":
            result = (Number(num1) / Number(num2));
            break;
    }
    return result;
}
// Process the = button being clicked.
// Ignores it if 2 numbers and one operator have not been entered.
function clickEqual () {
    point.disabled = false;
    if (num1 == "" || operator == "" || num2 == "") {
            return;
        }
    else { // operate and put it in result, clears other variables
        result = operate(num1, num2, operator);
        num1 = "";
        num2 = "";
        operator = "";
        lastButton = [];

    }
    console.log(num1, num2, operator, result);
}

// Case the button clicked is an operator
function clickOperator(op) {
    point.disabled = false;
    let last = lastButton[lastButton.length - 1];
    // If op is a second consecutive operator entered, erase the first one and
    // start over with the new one.
    if (last == "operator") {
        operator = op;
    }
    //        topDisplay.textContent = bottomDisplay.textContent;
     //       bottomDisplay.textContent = roundResultForDisplay(result);
    if (result != 0) { // an operation just finished, we want to use the result as num1
        num1 = result;
        result = "";
        operator = op; 
        //   topDisplay.textContent = bottomDisplay.textContent;
         //   addOperatorDisplay(op, "bottom");
            //result = operate(num1, num2, operator);

           // bottomDisplay.textContent = roundResultForDisplay(result);
           // addOperatorDisplay(op, "bottom");
        }
    else if (operator != "") { // add a new operation (without =)
            //topDisplay.textContent = bottomDisplay.textContent;
            //bottomDisplay.textContent = roundResultForDisplay(result);
        num1 = operate(num1, num2, operator);
        num2 = "";
        operator = op;
            //addOperatorDisplay(op, "bottom");
            //console.log(num1, num2, operator, result);
    }
    else { // only num1 has been entered yet
            //addOperatorDisplay(op, "bottom");
            operator = op;
        }
    lastButton.push("operator");
    console.log(num1, num2, operator, result);
}   


// Case the button clicked is a number (uses newOperation to decide if the number
// should be added to num1 or num2)
function clickNumber(num) {
    if (num == "point") { //allow to handle point like a number
        num = "0.";
        point.disabled = true;
    }
    if (operator == "") { //first number of operation
        result = "";
        //topDisplay.textContent = "";
        if (num1 == "" && num == ".") { // add a 0 before the .
            //num1 = "0.";
            //bottomDisplay.textContent = "0.";
        }
        else {
        num1 = addNumber(num, num1);
        // bottomDisplay.textContent = num1; 
        }
        lastButton.push("num1");
    }
    else { // num2 is being entered
        // case of div by 0
        if (num2 == "" && num == "0") {
            //topDisplay.textContent = "";
            //bottomDisplay.textContent = "Error (div by 0)";
            clearAllVariables();
        }
        else {
            if (num2 == "" && num == ".") {
                //num2 = "0."
                bottomDisplay.textContent += "0.";
            }
            else {
                num2 = addNumber(num, num2);
                //bottomDisplay.textContent += num;
            }
        lastButton.push("num2");
        }
    }
    console.log(num1, num2, operator, result);
}

// Add the digit clicked to the number: replaces number by digit if number = 0,
// else concatenates the digit to number.
function addNumber(digit, number) {
    if (number == "") {
        return digit; // works for . and number
    }
    else {
        number += digit;
        return number;
    }
}

function clearAllVariables () {
        num1 = "";
        num2 = "";
        operator = "";
        result = "";
        lastButton = [];
}
function clickClear(id) {
    if (id == "ac") {
        clearAllVariables();
        //topDisplay.textContent = "";
        //bottomDisplay.textContent = 0;
    }
    if (id == "c") {
        //bottomDisplay.textContent = bottomDisplay.textContent.slice(0, bottomDisplay.textContent.length - 1);
        let last = lastButton.pop();
        switch (last) {
            case ("num1"):
                num1 = num1.slice(0, num1.length -1);               
                break;
            case ("num2"):
                num2 = num2.slice(0, num2.length - 1);
                break;
            case ("operator"):
                operator = "";
            }

    }
}

function addElementToDisplay(element, display) {
    if (display == "top"){
        switch(op) {
            case "add":
                topDisplay.textContent += "+";
                break;
            case "sub":
                topDisplay.textContent += "-";
                break;
            case "mult":
                topDisplay.textContent += "x";
                break;
            case "div":
                topDisplay.textContent += "/";
                break;
        }
    }
    else if (display == "bottom"){
        switch(op) {
            case "add":
                bottomDisplay.textContent += "+";
                break;
            case "sub":
                bottomDisplay.textContent += "-";
                break;
            case "mult":
                bottomDisplay.textContent += "x";
                break;
            case "div":
                bottomDisplay.textContent += "/";
                break;
        }

    }

}

function roundResultForDisplay(result) {
    const maxLength = 12;
    const resultLength = result.toString().length;
    if (resultLength <= maxLength) {
        return result;
    }
    else {
        const lengthInteger = Math.floor(result).toString().length;
        const lengthDecimal = maxLength - lengthInteger;
        // Get a round value to lengthDecimal decimal 
        return parseFloat(parseFloat(result).toPrecision(lengthDecimal));

    }
}

const bottomDisplay = document.querySelector("#bottom");
const topDisplay = document.querySelector("#top");
const buttons = document.querySelectorAll("button");
const point = document.querySelector("#point");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.className == "operator") {
            if (button.id == "equal") {
                clickEqual();
            }
            else { // case of add, sub, mult and div
                clickOperator(button.id);
            }
        }
        else if (button.className == "number") {
            clickNumber(button.id);
        }
        else if (button.className == "clear") {
            clickClear(button.id);
        }
    })
})

