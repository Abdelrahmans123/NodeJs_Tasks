import express from "express";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
const app = express();
const port = 3000;
import { query } from "./DB/connectDB.js";
import usersTable from "./DB/User/User.js";

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
const errorHandler = (err, req, res, next) => {
	console.log(err);
	if (err === 401) {
		res.status(401).send({ error: "unauthorizared" });
	}
	res.status(400).send({ error: "something went wrong" });
	return;
};
app.use(errorHandler);
const startServer = async () => {
	try {
		await query(usersTable);
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
		});
	} catch (err) {
		console.error("❌ Failed to start server due to DB error:", err);
	}
};

startServer();
