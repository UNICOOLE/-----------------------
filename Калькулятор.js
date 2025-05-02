let currentInput = "";
let previousInput = "";
let operator = "";

const clickSound = document.getElementById('clickSound');
const equalsSound = document.getElementById('equalsSound');

const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '=') {
      equalsSound.currentTime = 0; 
      equalsSound.play();
    } else {
      clickSound.currentTime = 0; 
      clickSound.play();
    }
  });
});

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return; 
  currentInput += number;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculateResult();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculateResult() {
  if (previousInput === "" || currentInput === "") return;
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = prev / curr;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").value =
    currentInput || (previousInput ? previousInput + operator : "");
}