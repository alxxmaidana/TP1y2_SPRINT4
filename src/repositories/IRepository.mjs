class IRepository {
	obtenerPorId(_id) {
		throw new Error("Método 'obtenerPorId()' no implementado");
	}
	obtenerTodos() {
		throw new Error("Método 'obtenerTodos()' no implementado");
	}
	buscarPorAtributo(_atributo, _valor) {
		throw new Error("Método 'buscarPorAtributo()' no implementado");
	}
	obtenerMayores30() {
		throw new Error("Método 'obtenerMayores30()' no implementado");
	}
	agregarSuperheroe(_superheroe) {
		throw new Error("Método 'agregarSueperheroes()' no implementado");
	}
	actualizarSuperheroe(_id, _operacion) {
		throw new Error("Método 'actualizarSuperheroe()' no implementado");
	}
	eliminarPorId(_id) {
		throw new Error("Método 'eliminarPorId()' no implementado");
	}
	eliminarSuperheroe(_nombreSuperheroe) {
		throw new Error("Método 'eliminarSuperheroe()' no implementado");
	}
}

export default IRepository;
