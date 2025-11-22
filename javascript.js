// Variables to save data of the operation.
// We use strings to add new numbers to num1 and num2 (only convert it to Number
// in clickOperator)
let num1 = "0";
let operator = "";
let num2 = "0";
let operationOver = false;

// Create arrays with all operators and numbers buttons
//const operators = Array.from(document.querySelectorAll(".operator"));
//const numbers = Array.from(document.querySelectorAll(".number"));

// Case the button clicked is an operator
function clickOperator(op) {
    let result = 0;
    switch (op) {
        case "add":
            topDisplay.textContent += "+";
            operator = op;
            break;
        case "sub":
            topDisplay.textContent += "-";
            operator = op;
            break;
        case "mult":
            topDisplay.textContent += "x";
            operator = op;
            break;
        case "div":
            topDisplay.textContent += "/";
            operator = op;
            break;
        case "equal":
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
            };
        bottomDisplay.textContent = result.toFixed(8);
        num1 = "0";
        num2 = "0";
        operator = "";
        operationOver = true;
    }

}

// Case the button clicked is a number (uses newOperation to decide if the number
// should be added to num1 or num2)
function clickNumber(num) {
    if (operator == "") { //first number of operation
        if (operationOver && num1 == "0") { //Clears the top display for new operation
            if (num == ".") {
                topDisplay.textContent = "0"
            }
            else topDisplay.textContent = ""; 
        }
        if (num == "point") { //case of first button of first op is "."
            num = ".";
            topDisplay.textContent = "0"; // avoid 0 to be erased
        }
        num1 = addNumber(num, num1); 
        console.log(num1);
    }
    else {
        num2 = addNumber(num, num2);
    }
    topDisplay.textContent += num;
}

// Add the digit clicked to the number: replaces number by digit if number = 0,
// else concatenates the digit to number.
function addNumber(digit, number) {
    if (number == "0") {
        if (digit == ".") {
            return "0."
        }
        else return digit;
    }
    else {
        number += digit;
        return number;
    }
}

const bottomDisplay = document.querySelector("#bottom");
const topDisplay = document.querySelector("#top");
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.className == "operator") {
            clickOperator(button.id);
        }
        else if (button.className == "number") {
            clickNumber(button.id);
        }
    })
})

