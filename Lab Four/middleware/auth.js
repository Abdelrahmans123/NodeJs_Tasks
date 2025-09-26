import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	console.log("🚀 ~ auth ~ authHeader:", authHeader);

	if (!token) return res.status(401).send({ error: "unauthorized" });
	jwt.verify(token, "secretkeygfsgd", (err, user) => {
		if (err) return res.status(403).send({ error: "invalid token" });
		req.user = user;
		next();
	});
};
