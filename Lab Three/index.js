import fs from "fs/promsies";
import express from "express";
const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.get("/api/todos", async (req, res) => {
	try {
		const data = await fs.readFile("data.json", "utf-8");
		res.json(JSON.parse(data));
	} catch (error) {
		res.status(500).send("Error reading data");
	}
});
app.get("/api/todos/:id", async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const data = await fs.readFile("data.json", "utf-8");
	const todos = JSON.parse(data);
	const todo = todos.find((t) => t.id === id);
	if (todo) {
		res.json(todo);
	} else {
		res.status(404).send("Todo not found");
	}
});
app.post("/api/todos", async (req, res) => {
	const newTodo = req.body;
	const data = await fs.readFile("data.json", "utf-8");
	const todos = JSON.parse(data);
	todos.push(newTodo);
	await fs.writeFile("data.json", JSON.stringify(todos, null, 2));
	res.status(201).json(newTodo);
});
app.delete("/api/todos/:id", async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const data = await fs.readFile("data.json", "utf-8");
	let todos = JSON.parse(data);
	todos = todos.filter((t) => t.id !== id);
	await fs.writeFile("data.json", JSON.stringify(todos, null, 2));
	res.status(204).send();
});
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
