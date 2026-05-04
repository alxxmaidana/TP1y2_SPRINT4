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
	async buscarPorAtributo(atributo, valor) {
		const valoresDeBusqueda = valor.split(",").map(v => v.trim());
		return await Superhero.find({[atributo]: { $in: valoresDeBusqueda }});
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
