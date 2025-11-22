// Variables to save data of the operation.
// We use strings to add new numbers to num1 and num2 (only convert it to Number
// in clickOperator)
let num1 = "0";
let operator = "";
let num2 = "0";

// Create arrays with all operators and numbers buttons
//const operators = Array.from(document.querySelectorAll(".operator"));
//const numbers = Array.from(document.querySelectorAll(".number"));

// Case the button clicked is an operator
function clickOperator(op) {
    if (op == "equal") {
        switch (operator) {
            case "add":
                console.log(Number(num1) + Number(num2));

                break;
            case "sub":
                console.log(Number(num1) - Number(num2));
                break;
            case "mult":
                console.log(Number(num1) * Number(num2));
                break;
            case "div":
                console.log(Number(num1) / Number(num2));
                break;
        }
        num1 = "0";
        num2 = "0";
        operator = "";
    }
    else operator = op;

}

// Case the button clicked is a number (uses newOperation to decide if the number
// should be added to num1 or num2)
function clickNumber(num) {
    if (operator == "") {
        num1 = addNumber(num, num1);
    }
    else {
        num2 = addNumber(num, num2);
    }
}

// Add the digit clicked to the number: replaces number by digit if number = 0,
// else concatenates the digit to number.
function addNumber(digit, number) {
    if (number == "0") {
        return digit;
    }
    else {
        number += digit;
        return number;
    }
}

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

