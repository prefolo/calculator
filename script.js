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
	a = Number(a);
	b = Number(b);

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

	if (wasPressedEqual) {
		display.textContent = '';
		wasPressedEqual = 0;
	}

	if (display.textContent.length == 17) return;

	if (display.textContent == 'Is not a number') {
		clear();
	}

	display.textContent += e.target.textContent;

	// Manage decimal numbers
	if (display.textContent.includes('.0')) {
		currentDisplayValue = display.textContent;
		return;
	}

	currentDisplayValue = Number(display.textContent);

	// Prevent the display of wrong values with leading zeros
	// i.e. 0000 or 000089. Display instead 0 or 89.
	display.textContent = currentDisplayValue;
}

function populateDisplayWithResult(result) {
	const display = document.querySelector('#display');

	if (isNaN(result) || result == 'Infinity') {
		display.textContent = 'Is not a number';
		currentDisplayValue = 'Is not a number';
		return;
	}

	display.textContent = result;
	currentDisplayValue = result;
}

function pressOperatorOrEqual(e) {
	const operator = e.target.textContent;

	switch (operator) {
		case '=':
			operate(activeOperator, operandA, currentDisplayValue);
			toggleOperatorHighlight('');
			wasPressedEqual = 1;
			break;
		default:
			if (activeOperator !== '') {
				operate(activeOperator, operandA, currentDisplayValue);
			}

			operandA = currentDisplayValue;
			toggleOperatorHighlight(operator);
			isStartingToDisplayOperandB = 1;
			break;
	}
}

function clear() {
	const display = document.querySelector('#display');
	display.textContent = '0';

	currentDisplayValue = 0;
	operandA = 0;
	toggleOperatorHighlight('');
	isStartingToDisplayOperandB = 0;
}

function toggleOperatorHighlight(operator) {
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

function addDecimalPoint() {
	const display = document.querySelector('#display');

	if (display.textContent.includes('.')) {
		return;
	}

	display.textContent += '.';
}

function deleteLastCifra() {
	const display = document.querySelector('#display');
	let text = display.textContent;

	if (text.length == 1) {
		text = 0;
		display.textContent = 0;
		currentDisplayValue = 0;
		return;
	}

	let newText = text.toString().slice(0, -1);

	display.textContent = newText;
	currentDisplayValue = newText;
}

let currentDisplayValue = 0;
let operandA = 0;
let activeOperator = '';
let isStartingToDisplayOperandB = 0;
let wasPressedEqual = 0;

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

document.querySelector('#point').addEventListener('click', addDecimalPoint);

document.querySelector('#delete').addEventListener('click', deleteLastCifra);

// prevent text selection on button press
document.querySelectorAll('.row').forEach((el) =>
	el.addEventListener('mousedown', (e) => {
		if (e.detail > 1) e.preventDefault();
	})
);
