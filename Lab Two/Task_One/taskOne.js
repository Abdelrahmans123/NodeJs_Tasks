import { Command } from "commander";
const program = new Command();

program
	.command("add")
	.description("to add mutiple numbers")
	.option("-n, --number [numbers...]", "specify numbers")
	.action(({ number }) => {
		console.log(number.reduce((acc, val) => acc + parseInt(val), 0));
	});
program
	.command("subtract")
	.description("to subtract mutiple numbers")
	.option("-n, --number [numbers...]", "specify numbers")
	.action(({ number }) => {
		const result = number.reduce((acc, val) => {
			if (acc === 0) return parseInt(val);
			if (parseInt(val) === 0) {
				console.log("Subtraction by zero");
				return acc;
			}
			if (acc - parseInt(val) < 0) {
				console.log("Negative Number");
				return acc;
			}
			return acc - parseInt(val);
		}, 0);
		console.log("🚀 ~ result:", result);
	});
program
	.command("Multiply")
	.description("to multiply multiple numbers")
	.option("-n, --number [numbers...]", "specify numbers")
	.action(({ number }) => {
		const result = number.reduce((acc, val) => {
			if (acc === 0) return parseInt(val);
			return acc * parseInt(val);
		}, 1);
		console.log("🚀 ~ result:", result);
	});
program
	.command("divide")
	.description("to divide mutiple numbers")
	.option("-n, --number [numbers...]", "specify numbers")
	.action(({ number }) => {
		const result = number.reduce((acc, val) => {
			if (acc === 0) return parseInt(number);
			if (parseInt(number) === 0) {
				console.log("Division by zero");
				return acc;
			}
			return acc / parseInt(val);
		}, 1);
		console.log("🚀 ~ result:", result);
	});
program.parse();
