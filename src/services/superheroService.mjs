import SuperheroRepository from "../repositories/SuperheroRepository.mjs";

function ordernarSuperheroesPorFechaCreacion(superheroes) {
	return superheroes.sort((superheroeA, superheroeB) => superheroeB.createdAt - superheroeA.createdAt);
}

// BUSCAR SUPERHÉROES POR ID
export async function obtenerSuperheroePorId(id) {
	return await SuperheroRepository.obtenerPorId(id);
}
// OBTENER TODOS LOS SUPERHÉROES
export async function obtenerTodosLosSuperheroes() {
	const superheroes = await SuperheroRepository.obtenerTodos();
	return ordernarSuperheroesPorFechaCreacion(superheroes);
}
// BUSCAR SUPERHÉROES POR ATRIBUTO Y VALOR
export async function buscarSuperheroesPorAtributo(atributo, valor) {
	let query;
	if (["poderes", "aliados", "enemigos"].includes(atributo) && valor.includes(",")) {
		const valoresBusqueda = valor.split(",").map(item => item.trim());
		query = { [atributo]: { $all: valoresBusqueda } };
	} else {
		query = { [atributo]: valor };
	}
	const superheroes = await SuperheroRepository.buscarPorAtributo(query);
	return ordernarSuperheroesPorFechaCreacion(superheroes);
}
// OBTENER SUPERHÉROES POR ID
export async function obtenerSuperheroesMayoresDe30() {
	const query = {
			$and: [
				{ edad: { $gt: 30 } },
				{ planetaOrigen: "Tierra" },
				{ $expr: { $gte: [{ $size: "$poderes" }, 2] } },
				// 			└── operador de agregación ──┘
			]}
	return await SuperheroRepository.obtenerMayoresDe30(query);
}
// AGRAGAR NUEVOS SUPERHÉROES
export async function agregarNuevoSuperheroe(superheroe) {
	return await SuperheroRepository.agregarSuperheroe(superheroe);
}

// ELIMINAR UN SUPERHÉROE POR ID
export async function eliminarSuperheroePorId(id) {
	return await SuperheroRepository.eliminarPorId(id);
}
// ACTUALIZAR SUPERHÉROE
export async function actualizarSuperheroePorId(id, datosActualizados) {
	return await SuperheroRepository.actualizarSuperheroe(id, datosActualizados);
}
// Eliminar por nombre 
export async function eliminarSuperheroePorNombre(nombreSuperheroe) {
	return await SuperheroRepository.eliminarPorNombre(nombreSuperheroe)
}