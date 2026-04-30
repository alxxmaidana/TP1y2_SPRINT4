import dns from "node:dns";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Conexión éxitosa a la base de datos");
	} catch (err) {
		console.error("Error al conectar a la base de datos MongoDB", err);
		throw err;
	}
}
