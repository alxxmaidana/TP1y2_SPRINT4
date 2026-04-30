import { Router } from "express";

import {
	//actualizarSuperheroePorIdController,
	agregarSuperheroeController,
	//buscarSuperheoresPorAtributoController,
	//eliminarSuperheroePorIdController,
	//eliminarSuperheroePorNombreController,
	obtenerSuperheroePorIdController,
	//obtenerSuperheroesMayoresDe30Controller,
	obtenerTodosLosSuperheroesController,
	editarSuperheroeController,
	eliminarSuperheroeController,
	//agregarNuevoSuperheroeController
} from "../controllers/superheroController.mjs";


import { handleValidationErrors } from "../validations/errorMiddleware.mjs";
import { superheroValidations } from "../validations/validationRules.mjs";

const router = Router();

///////////////////////////////////
// Rutas para renderizar las vistas 
///////////////////////////////////

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


////////////////////////////
// Rutas Backend
////////////////////////////

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

////////////////////////////////
// Rutas de TPs enteriores
///////////////////////////

// Ruta para buscar y leer un superhéroe por _id
// router.get("/heroes/buscar/id/:id", obtenerSuperheroePorIdController);

// Obtener superhéroes mayores de 30, sean el planeta tierra y tengan almenos 2 poderes
// router.get("/heroes/mayores-30", obtenerSuperheroesMayoresDe30Controller);

// // Ruta para buscar superhéroes por atributo y valor
// router.get(
// 	"/heroes/buscar/:atributo/:valor",
// 	buscarSuperheoresPorAtributoController,
// );

// // agregar un nuevo superhéroe
// router.post(
// 	"/heroes",
// 	superheroValidations,
// 	handleValidationErrors,
// 	agregarNuevoSuperheroeController,
// );

// // Actualizar superhéroe por ID
// router.put(
// 	"/heroes/actualizar/:id",
// 	superheroValidations,
// 	handleValidationErrors,
// 	actualizarSuperheroePorIdController
// );

// // Ruta para eliminar un superheroe por su nombre de superhéroe
// router.delete(
// 	"/heroes/eliminar/nombreSuperheroe/:nombreSuperheroe",
// 	eliminarSuperheroePorNombreController,
// );

// // Eliminar un superhéroe por id
// router.delete("/heroes/eliminar/:id", eliminarSuperheroePorIdController);

export default router;
