import express from "express";
import { connectDB } from "./config/dbConfig.mjs";
import routes from "./routes/superheroRoutes.mjs";
import path from "path";
import expressLayoyts from "express-ejs-layouts";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB(); // Conectar a la Base de Datos

// Middleware para parsear JSON
app.use(express.json());

// Configurar EJS cómo el motor de vistas
app.set("view engine", "ejs");
app.set("views", path.resolve("./layouts/views")); // Esto define el directorio donde se almacenan los archivos de plantilla.

// Activar expressLayout
app.use(expressLayoyts);
app.set("layout", "layout"); // Definir archivo base para los layout

// Servir archivo estáticos
app.use(express.static(path.resolve("./layouts/public")));


// Asignar prefijo /api a todas las rutas
app.use("/api", routes);

// Manejo de errores para rutas no encontradas
app.use((_req, res) => {
	res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Levantar servidor
app.listen(PORT, () => {
	console.log("Servidor escuchado en el puerto:", PORT);
});
