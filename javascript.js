// Variables to save data of the operation
let num1 = 0;
let operator = "";
let num2 = 0;

// Create arrays with all operators and numbers buttons
//const operators = Array.from(document.querySelectorAll(".operator"));
//const numbers = Array.from(document.querySelectorAll(".number"));


const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.className == "operator") {
            operator = button.id;
        }
        else if (button.className == "number") {
            num1 = Number(button.id);
        }
    })
})

