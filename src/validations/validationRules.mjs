import { body } from "express-validator";

export const superheroValidations = [
  // Validaciones requeridas
  body("nombreSuperheroe")
    .trim() // Eliminar espacios al inicio y al final
    .notEmpty().withMessage("El nombre del superhéroe es requerido.") // Validar que el campo no esté vacío
    .isLength({ min: 3 }).withMessage("El nombre del superhéroe debe tener al menos 3 caracteres.") // Minimo de 3 caracteres
    .isLength({ max: 60 }).withMessage("El nombre del superhéroe no puede superar los 60 caracteres.")
    .escape(), // Máximo de 60 caracteres
  body("nombreReal")
    .trim()
    .notEmpty().withMessage("El nombre real es requerido.")
    .isLength({ min: 3 }).withMessage("El nombre real debe tener al menos 3 caracteres.")
    .isLength({ max: 60 }).withMessage("El nombre real no puede superar los 60 caracteres.")
    .escape(),
  body("edad")
    .trim()
    .notEmpty().withMessage("La edad es requerida.")
    .isNumeric().withMessage("La edad debe ser un número.") // Valida que se un valor númerico
    .custom((value) => { // Valida que la edad sea mayor o igual a cero
      if (Number(value) < 0) {
        throw new Error("La edad no puede ser negativa");
      }
      return true;
    })
    .escape(),
  body("poderes")
    .isArray({ min: 1 }).withMessage("Poderes debe ser un array de almenos un elemento"), // Valida que poderes tenga almenos un elemento
  body("poderes.*")
    .isString().withMessage("Poderes debe ser un array de strings") // Valida que se un array de strings
    .trim()
    .isLength({ min: 3 }).withMessage("Cada poder debe tener al menos 3 caracteres.")
    .isLength({ max: 60 }).withMessage("Cada poder no puede superar los 60 caracteres.")
    .escape(),
  ];
