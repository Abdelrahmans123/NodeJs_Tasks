import { query } from "../DB/connectDB.js";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../validation/auth.js";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
	const { error } = registerSchema.validate(req.body);
	if (error) {
		return res.status(400).json({
			error: error.details[0].message,
		});
	}

	const { name, email, password, age } = req.body;
	const users = await query("SELECT * FROM users WHERE email = ?", [email]);
	if (users.length) {
		return res.status(409).json({ error: "email already in use" });
	}
	const hashedPassword = await bcrypt.hash(password, 1);
	const result = await query(
		"insert into users (name, password_hash, email, age) values(?, ?, ?, ?)",
		[name, hashedPassword, email, age]
	);
	res.send({ created: result.affectedRows });
};
export const login = async (req, res) => {
	const { error } = loginSchema.validate(req.body);
	if (error) {
		return res.status(400).json({
			error: error.details[0].message,
		});
	}

	const { email, password } = req.body;
	const users = await query("SELECT * FROM users WHERE email = ?", [email]);

	const user = users[0];
	console.log("🚀 ~ user:", users);

	if (!user) {
		return res.status(401).json({ error: "invalid credentials" });
	}
	const isValid = await bcrypt.compare(password, user.password_hash);
	if (!isValid) {
		return res.status(401).json({ error: "invalid credentials" });
	}
	const token = jwt.sign({ id: user.id }, "secretkeygfsgd");
	res.send({ token });
};
