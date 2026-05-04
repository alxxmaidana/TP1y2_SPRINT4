import { param, query } from "express-validator";
import Superhero from "../models/superhero.mjs";
import SuperheroRepository from "../repositories/SuperheroRepository.mjs";

import {
	actualizarSuperheroePorId,
	agregarNuevoSuperheroe,
	buscarSuperheroesPorAtributo,
	eliminarSuperheroePorId,
	eliminarSuperheroePorNombre,
	obtenerSuperheroePorId,
	obtenerSuperheroesMayoresDe30,
	obtenerTodosLosSuperheroes,
} from "../services/superheroService.mjs";

// import {
// 	renderizarlistaSuperheroes,
// 	renderizarSuperheroe,
// } from "../layouts/views/responseView.mjs";

// OBTENER SUPERHÉROE POR ID
export async function obtenerSuperheroePorIdController(req, res) {
	try {
		const { id } = req.params;
		const superheroe = await obtenerSuperheroePorId(id);
		if (superheroe === null) {
			return res.status(404).send({ mesagge: "Superhéroe no encontrado" });
		}
		res.render("editSuperhero", { superheroe, title: "Editar Superhéroe" });
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar el superhéroe",
			err: err.mesagge,
		});
	}
}

// OBTENER TODOS LOS SUPERHÉROES
export async function obtenerTodosLosSuperheroesController(req, res) {
	try {
		const superheroes = await obtenerTodosLosSuperheroes();
		if (!superheroes) {
			return res.status(404).send({
				message: "No hay superhéroes, la colección se encuentra vacía"
			})
		}
		res.render("dashboard", { superheroes, title: "Lista de Superhéroes" });
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al obtener todos los superhéroes",
			err: err.mesagge,
		});
	}
}

// BUSCAR SUPERHÉROE POR ATRIBUTO Y VALOR
export async function buscarSuperheroesPorAtributoController(req, res) {
	try {
		// const atributo = (req.query.atributo || "");
		// const valor = (req.query.valor || "");
		const atributo = (req.query.atributo || "");
		const valor = (req.query.valor || "");
		console.log(atributo, valor)

		//const superheroes = q ? await buscarSuperheroesPorAtributo(params) : [];
		// let superheroes = []
		// if (atributo && valor) {
		// 	superheroes = await buscarSuperheroesPorAtributo(atributo, valor)
		// }
		const superheroes = atributo && valor ? await buscarSuperheroesPorAtributo(atributo, valor) : [];
		console.log(superheroes)
		res.render("searchSuperhero", {
			title: "Buscar superhéroes",
			atributo: (req.query.atributo || ""),
			valor: (req.query.valor || ""),
			superheroes,
			total: superheroes.length
		});

		// const superheroes = await buscarSuperheroesPorAtributo(params);
		// res.render("resultSearch", { superheroes, title: "Resultado de la búsqueda" });
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al buscar sueperhéroes por atributo",
			err: err.mesagge,
		});
	}
}

// OBTENER SUEPERHÉROES MAYORES DE 30
// export async function obtenerSuperheroesMayoresDe30Controller(_req, res) {
// 	try {
// 		const superheroes = await obtenerSuperheroesMayoresDe30();
// 		if (superheroes.length === 0) {
// 			return res.status(404).send({
// 				mesagge: "No se encontraron superhéroes mayores a 30 años",
// 			});
// 		}
// 		const superheroesFormateados = renderizarlistaSuperheroes(superheroes);
// 		res.status(200).json(superheroesFormateados);
// 	} catch (err) {
// 		res.status(500).send({
// 			mesagge: "Error al buscar superhéros mayores a 30 años",
// 			err: err.mesagge,
// 		});
// 	}
// }

// AGREGAR NUEVO SUPERHÉROE
// export async function agregarNuevoSuperheroeController(req, res) {
// 	try {
// 		// Crear nuevo superhéroe a partir de los datos enviados en el body (Enviamos un JSON desde postman)
// 		const nuevoSuperheroe = new Superhero(req.body);
// 		await agregarNuevoSuperheroe(nuevoSuperheroe);
// 		// const nuevoSuperheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
// 		// res.status(200).json(nuevoSuperheroeFormateado);
// 	} catch (err) {
// 		res.status(500).send({
// 			mesagge: "Error al agregar el nuevo superheroe",
// 			err: err.mesagge,
// 		});
// 	}
// }

// AGREGAR NUEVO SUPERHÉROE
export async function agregarSuperheroeController(req, res) {
	try {
		const nuevoSuperheroe = new Superhero(req.body);
		await agregarNuevoSuperheroe(nuevoSuperheroe)
		res.status(200).json({ redirectTo: "/api/heroes" });
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al agregar el nuevo superheroe",
			err: err.mesagge,
		});
	}
}


// ACTUALIZAR SUPERHÉROE POR ID
export async function editarSuperheroeController(req, res) {
	try {
		const { id } = req.params;
		await actualizarSuperheroePorId(id, req.body);
		res.status(200).json({ redirectTo: "/api/heroes" });
	} catch (err) {
		res.status(500).send({
			mesagge: "Error al actualizar el superhéroe",
			err: err.mesagge,
		});
	}
}

// ELIMINAR SUPERHÉROE
export async function eliminarSuperheroeController(req, res) {
	try {
		await eliminarSuperheroePorId(req.params.id);
		res.status(204).send();
	} catch (error) {
		res.status(500).send({
			message: "Ocurrió un error al eliminar el Superhéroe",
			error: error.message,
		});
	}
}

// ALIMINAR SUPERHÉROE POR NOMBRE
// export async function eliminarSuperheroePorNombreController(req, res) {
// 	try {
// 		const { nombreSuperheroe } = req.params;
// 		const superheroeEliminado = await eliminarSuperheroePorNombre(nombreSuperheroe);
// 		if (!superheroeEliminado) {
// 			return res.status(404).send({
// 				mesagge: `El superhéroe ${nombreSuperheroe} no existe, no se puede eliminar`,
// 			});
// 		}
// 		const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
// 		res.status(200).json(superheroeFormateado);
// 	} catch (err) {
// 		res.status(500).send({
// 			mesagge: "Error al eliminar el superheroe",
// 			err: err.mesagge,
// 		});
// 	}
// }

// ELIMINAR SUPERHÉROE POR ID
// export async function eliminarSuperheroePorIdController(req, res) {
// 	try {
// 		const { id } = req.params;
// 		const superheroeEliminado = await eliminarSuperheroePorId(id);
// 		if (!superheroeEliminado) {
// 			return res.status(404).send({
// 				mesagge: "El superhéroe no existe, no se puede eliminar",
// 			});
// 		}
// 		const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
// 		res.status(200).json(superheroeFormateado);
// 	} catch (err) {
// 		res.status(500).send({
// 			mesagge: "Error al elminar el superhéroe",
// 			err: err.mesagge,
// 		});
// 	}
// }


// ACTUALIZAR SUPERHÉROE POR ID
// export async function actualizarSuperheroePorIdController(req, res) {
// 	try {
// 		const { id } = req.params;
// 		const superheroeEncotrado = await actualizarSuperheroePorId(id, req.body);
// 		// Verificar si se encontró el superheroe
// 		if (superheroeEncotrado === null) {
// 			return res.status(404).send({
// 				mesagge: "No se encontró el superhéroe, no se pudo actualizar",
// 			});
// 		}
// 		const superheroeFormateado = renderizarSuperheroe(superheroeEncotrado);
// 		res.status(200).json(superheroeFormateado);
// 	} catch (err) {
// 		res.status(500).send({
// 			mesagge: "Error al actualizar el superhéroe",
// 			err: err.mesagge,
// 		});
// 	}
// }