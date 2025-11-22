// Variables to save data of the operation
let num1 = 0;
let operator = "";
let num2 = 0;

// Create arrays with all operators and numbers buttons
//const operators = Array.from(document.querySelectorAll(".operator"));
//const numbers = Array.from(document.querySelectorAll(".number"));

function clickOperator(op) {
    if (op == "equal") {
        console.log("equal");
        switch (operator) {
            case "add":
                console.log(num1 + num2);
                break;
            case "sub":
                console.log(num1 - num2);
                break;
            case "mult":
                console.log(num1 * num2);
                break;
            case "div":
                console.log(num1 / num2);
                break;
        }
    }
    else operator = op;

}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.className == "operator") {
            console.log(button.id);
            clickOperator(button.id);
        }
        else if (button.className == "number") {
            num1 = Number(button.id);
        }
    })
})

