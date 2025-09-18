const [, , action, ...numbers] = process.argv;
const sum = (numbers) => {
	return numbers.reduce((acc, number) => acc + parseInt(number), 0);
};
const subtract = (numbers) => {
	return numbers.reduce((acc, number) => {
		if (acc === 0) return parseInt(number);
		if (parseInt(number) === 0) {
			console.log("Subtraction by zero");
			return acc;
		}
		if (acc - parseInt(number) < 0) {
			console.log("Negative Number");
			return acc;
		}
		return acc - parseInt(number);
	}, 0);
};
const multiply = (numbers) => {
	return numbers.reduce((acc, number) => acc * parseInt(number), 1);
};
const divide = (numbers) => {
	return numbers.reduce((acc, number) => {
		if (acc === 0) return parseInt(number);
		if (parseInt(number) === 0) {
			console.log("Division by zero");
			return acc;
		}
		return acc / parseInt(number);
	});
};
let result;
switch (action) {
	case "sum":
		result = sum(numbers);
		break;
	case "subtract":
		result = subtract(numbers);
		break;
	case "multiply":
		result = multiply(numbers);
		break;
	case "divide":
		result = divide(numbers);
		break;
	default:
		console.log("Unknown action");
}

console.log("🚀 ~ result:", result);
