import fs from "fs/promises";
const [, , action, ...args] = process.argv;
const getAllUsers = async () => {
	const data = await fs.readFile("./Task_Two/data/users.json", "utf-8");
	return JSON.parse(data);
};
const getUserById = async (id) => {
	const users = await getAllUsers();
	return users.find((user) => user.id === parseInt(id));
};
const addUser = async (user) => {
	const users = await getAllUsers();
	users.push(user);
	await fs.writeFile(
		"./Task_Two/data/users.json",
		JSON.stringify(users, null, 2)
	);
};
const updateUser = async (id, updatedInfo) => {
	const users = await getAllUsers();
	const index = users.findIndex((user) => user.id === parseInt(id));
	if (index !== -1) {
		users[index] = { ...users[index], ...updatedInfo };
		await fs.writeFile(
			"./Task_Two/data/users.json",
			JSON.stringify(users, null, 2)
		);
	} else {
		console.log("User not found");
	}
};
const deleteUser = async (id) => {
	const users = await getAllUsers();
	const filteredUsers = users.filter((user) => user.id !== parseInt(id));
	await fs.writeFile(
		"./Task_Two/data/users.json",
		JSON.stringify(filteredUsers, null, 2)
	);
};
let count = (await getAllUsers()).length + 1;
switch (action) {
	case "list":
		const users = await getAllUsers();
		console.log("🚀 ~ users:", users);
		break;
	case "get":
		const user = await getUserById(args[0]);
		console.log("🚀 ~ user:", user);
		break;
	case "add":
		const newUser = {
			id: count++,
			name: args[0],
			email: args[1],
		};
		await addUser(newUser);
		console.log("User added:", newUser);
		break;
	case "update":
		const updatedUser = {
			name: args[1],
			email: args[2],
		};
		await updateUser(args[0], updatedUser);
		console.log("User updated:", updatedUser);
		break;
	case "delete":
		await deleteUser(args[0]);
		console.log("User deleted with id:", args[0]);
		break;
	default:
		console.log("Unknown action");
}
