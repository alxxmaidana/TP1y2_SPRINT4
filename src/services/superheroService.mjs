import SuperheroRepository from "../repositories/SuperheroRepository.mjs";

// BUSCAR SUPERHÉROES POR ID
export async function obtenerSuperheroePorId(id) {
	return await SuperheroRepository.obtenerPorId(id);
}
// OBTENER TODOS LOS SUPERHÉROES
export async function obtenerTodosLosSuperheroes() {
	return await SuperheroRepository.obtenerTodos();
}
// BUSCAR SUPERHÉROES POR ATRIBUTO Y VALOR
export async function buscarSuperheroesPorAtributo(atributo, valor) {
	return await SuperheroRepository.buscarPorAtributo(atributo, valor);
}
// OBTENER SUPERHÉROES POR ID
export async function obtenerSuperheroesMayoresDe30() {
	return await SuperheroRepository.obtenerMayoresDe30();
}
// AGRAGAR NUEVOS SUPERHÉROES
export async function agregarNuevoSuperheroe(superheroe) {
	return await SuperheroRepository.agregarSuperheroe(superheroe);
}
//  ELIMINAR SUPERHÉROE POR NOMBRE SUPERHÉROE
export async function eliminarSuperheroePorNombre(nombreSuperheroe) {
	return await SuperheroRepository.eliminarSuperheroe(nombreSuperheroe);
}
// ELIMINAR UN SUPERHÉROE POR ID
export async function eliminarSuperheroePorId(id) {
	return await SuperheroRepository.eliminarPorId(id);
}
// ACTUALIZAR SUPERHÉROE
export async function actualizarSuperheroePorId(id, datosActualizados) {
	return await SuperheroRepository.actualizarSuperheroe(id, datosActualizados);
}
