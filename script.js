function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, a, b) {
	switch (operator) {
		case '+':
			populateDisplayWithResult(add(a, b));
			break;
		case '-':
			populateDisplayWithResult(subtract(a, b));
			break;
		case 'x':
			populateDisplayWithResult(multiply(a, b));
			break;
		case '/':
			populateDisplayWithResult(divide(a, b));
			break;
		default:
			break;
	}
}

function populateDisplay(e) {
	const display = document.querySelector('#display');

	if (isStartingToDisplayOperandB) {
		display.textContent = e.target.textContent;
		currentDisplayValue = Number(display.textContent);
		isStartingToDisplayOperandB = 0;
		return;
	}

	if (display.textContent.length == 17) return;

	display.textContent += e.target.textContent;
	currentDisplayValue = Number(display.textContent);
}

function populateDisplayWithResult(result) {
	const display = document.querySelector('#display');

	display.textContent = result;
	currentDisplayValue = result;
}

function pressOperatorOrEqual(e) {
	const operator = e.target.textContent;

	switch (operator) {
		case '=':
			operate(activeOperator, operandA, currentDisplayValue);
			toggleOperator('');
			break;
		default:
			if (activeOperator !== '') {
				operate(activeOperator, operandA, currentDisplayValue);
			}

			operandA = currentDisplayValue;
			toggleOperator(operator);
			isStartingToDisplayOperandB = 1;
			break;
	}
}

function clear() {
	const display = document.querySelector('#display');
	display.textContent = '';

	currentDisplayValue = 0;
	operandA = 0;
	toggleOperator('');
	isStartingToDisplayOperandB = 0;
}

function toggleOperator(operator) {
	document
		.querySelectorAll('.operator')
		.forEach((el) => el.classList.remove('active'));

	if (operator == '') {
		activeOperator = '';
	} else {
		activeOperator = operator;

		switch (operator) {
			case '+':
				document.querySelector('#add').classList.add('active');
				break;
			case '-':
				document.querySelector('#subtract').classList.add('active');
				break;
			case 'x':
				document.querySelector('#multiply').classList.add('active');
				break;
			case '/':
				document.querySelector('#divide').classList.add('active');
				break;
			default:
				break;
		}
	}
}

let currentDisplayValue = 0;
let operandA = 0;
let activeOperator = '';
let isStartingToDisplayOperandB = 0;

document
	.querySelectorAll('.number')
	.forEach((el) => el.addEventListener('click', populateDisplay));

document
	.querySelectorAll('.operator')
	.forEach((el) => el.addEventListener('click', pressOperatorOrEqual));

document
	.querySelector('#equal')
	.addEventListener('click', pressOperatorOrEqual);

document.querySelector('#clear').addEventListener('click', clear);
