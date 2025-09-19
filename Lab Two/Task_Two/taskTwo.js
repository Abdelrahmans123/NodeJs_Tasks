import http from "http";
import fs from "fs/promises";

const getAllUsers = async () => {
	const data = await fs.readFile("./data/users.json", "utf-8");
	return JSON.parse(data);
};
const getUserById = async (id) => {
	const users = await getAllUsers();
	return users.find((user) => user.id === parseInt(id));
};
const addUser = async (user) => {
	const users = await getAllUsers();
	users.push(user);
	await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
};
const updateUser = async (id, updatedInfo) => {
	const users = await getAllUsers();
	const index = users.findIndex((user) => user.id === parseInt(id));
	if (index !== -1) {
		users[index] = { ...users[index], ...updatedInfo };
		await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2));
	} else {
		console.log("User not found");
	}
};
const deleteUser = async (id) => {
	const users = await getAllUsers();
	const filteredUsers = users.filter((user) => user.id !== parseInt(id));
	await fs.writeFile(
		"./data/users.json",
		JSON.stringify(filteredUsers, null, 2)
	);
};
let count = (await getAllUsers()).length + 1;
const server = http.createServer(async (req, res) => {
	if (req.url === "/users" && req.method === "GET") {
		const users = await getAllUsers();
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(users));
	} else if (req.url.match(/\/users\/\d+/) && req.method === "GET") {
		const id = req.url.split("/")[2];
		const user = await getUserById(id);
		if (user) {
			res.writeHead(200, { "Content-Type": "application/json" });

			res.end(JSON.stringify(user));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "User not found" }));
		}
	} else if (req.url === "/users" && req.method === "POST") {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", async () => {
			try {
				const user = JSON.parse(body);
				user.id = count++;
				await addUser(user);
				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "User added", user }, null, 2));
			} catch (err) {
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Invalid JSON" }));
			}
		});
	} else if (req.url.match(/\/users\/\d+/) && req.method === "PUT") {
		const id = req.url.split("/")[2];
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", async () => {
			try {
				const user = JSON.parse(body);
				await updateUser(id, user);
				res.writeHead(201, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "User added", user }, null, 2));
			} catch (err) {
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Invalid JSON" }));
			}
		});
	} else if (req.url.match(/\/users\/\d+/) && req.method === "DELETE") {
		const id = req.url.split("/")[2];
		await deleteUser(id);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User deleted" }));
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
});
server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
