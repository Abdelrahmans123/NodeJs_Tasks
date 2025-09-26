import { query } from "../DB/connectDB.js";

export const getProfile = async (req, res) => {
	const userId = req.user.id;
	console.log("🚀 ~ getProfile ~ userId:", userId);

	const user = await query("SELECT id, name, email, age FROM users WHERE id = ?", [
		userId,
	]);
	res.send({ user });
};
