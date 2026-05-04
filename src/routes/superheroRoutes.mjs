import { Router } from "express";

import {
	agregarSuperheroeController,
	buscarSuperheroesPorAtributoController,
	obtenerSuperheroePorIdController,
	obtenerTodosLosSuperheroesController,
	editarSuperheroeController,
	eliminarSuperheroeController,
} from "../controllers/superheroController.mjs";


import { handleValidationErrors } from "../validations/errorMiddleware.mjs";
import { superheroValidations } from "../validations/validationRules.mjs";
import Superhero from "../models/superhero.mjs";

const router = Router();

// Renderizar la página principal 
router.get("/", (_req, res) => {
	res.render("index", { title: "Superhero Manager" });
});

// Obtener todos los superhéroes y renderizarlos
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Renderizar formulario para agregar superheroes
router.get("/heroes/agregar", (_req, res) => {
	res.render("addSuperhero", { title: "Agregar Superhéroe" });
});

// Ruta para renderizar el formulario de edición y precargar los datos del superhéroe a editar
// Busca el superhéroe por su atributo id, y se lo pasamos a la vista (editSuperhero.ejs) para que precargue los datos del superhéroe 
router.get("/heroes/:id/editar", obtenerSuperheroePorIdController);

// Renderizar formulario para buscar por atributo y valor
router.get("/heroes/buscar", buscarSuperheroesPorAtributoController);

// Ruta para agregar un superheroe
router.post(
	"/heroes/agregar",
	superheroValidations,
	handleValidationErrors,
	agregarSuperheroeController
);

// Ruta para editar un superhéroe
router.put(
	"/heroes/:id/editar",
	superheroValidations,
	handleValidationErrors,
	editarSuperheroeController
);

// Ruta DELETE para elimnar un superhéroe por su id
router.delete("/heroes/:id", eliminarSuperheroeController);

export default router;
