import mysql from "mysql2/promise";

export const query = async (sql, params = []) => {
	let connection;
	try {
		connection = await mysql.createConnection({
			host: "localhost",
			user: "root",
			database: "nodejs_lab_four",
			password: "",
		});
		const [results] = await connection.execute(sql, params);
		return results;
	} catch (err) {
		console.error("❌ Database query error:", err);
	}
};
