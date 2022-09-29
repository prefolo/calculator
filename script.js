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
	switch (operatoir) {
		case '+':
			add(a, b);
			break;
		case '-':
			subtract(a, b);
			break;
		case 'x':
			multiply(a, b);
			break;
		case '/':
			divide(a, b);
			break;
		default:
			break;
	}
}

function populateDisplay(e) {
	const display = document.querySelector('#display');
	display.textContent += e.target.textContent;

	currentDisplayValue = display.textContent;
}

let currentDisplayValue = 0;

document
	.querySelectorAll('.number')
	.forEach((el) => el.addEventListener('click', populateDisplay));
