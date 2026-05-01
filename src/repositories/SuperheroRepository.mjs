// Implementación de la interfáz
import Superhero from "../models/superhero.mjs";
import IRepository from "./IRepository.mjs";

class SuperheroRepository extends IRepository {
	// OBTENER POR ID
	async obtenerPorId(id) {
		return await Superhero.findById(id);
	}

	// OBTENTER TODOS LOS SUPERHÉROES
	async obtenerTodos() {
		return await Superhero.find();
	}

	// BUSCAR POR ATRIBUTO Y VALOR
	async buscarPorAtributo(params) {
		const query = {};
		for (const [atributo, valor] of Object.entries(params)) {
			if (Array.isArray(valor)) {
				// Si es array -> busca docuemtos que contengan todos los valores
				query[atributo] = { $all: valor };
			} else  {
				// Si no es array -> busqueda normal
				query[atributo] = valor;
			}
		}
		return await Superhero.find(query);
	}

	// OBTENER MAYORES DE 30
	async obtenerMayoresDe30() {
		return await Superhero.find({
			$and: [
				{ edad: { $gt: 30 } },
				{ planetaOrigen: "Tierra" },
				{ $expr: { $gte: [{ $size: "$poderes" }, 2] } },
				// 			└── operador de agregación ──┘
			],
		});
	}

	// AGREGAR SUPERHÉROE
	async agregarSuperheroe(superheroe) {
		return await superheroe.save();
	}

	// ELIMINAR SUPERHÉROE POR NOMBRE
	async eliminarSuperheroe(nombreSuperheroe) {
		return await Superhero.findOneAndDelete({
			nombreSuperheroe: nombreSuperheroe,
		});
	}

	// ELIMINAR SUPERHÉROE POR ID
	async eliminarPorId(id) {
		return await Superhero.findByIdAndDelete(id);
	}

	// ACTUALIZAR SUPERHÉROE
	async actualizarSuperheroe(id, datosActualizados) {
		return await Superhero.findByIdAndUpdate(id, datosActualizados, {
			returnDocument: "after"
		});
	}
}

export default new SuperheroRepository();
