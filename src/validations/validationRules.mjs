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

  // Validaciones para los campos opcionales
  // body("planetaOrigen")
  //   .optional()
  //   .trim()
  //   .isLength({ min: 3 }).withMessage("El planeta de origen debe tener al menos 3 caracteres.")
  //   .isLength({ max: 60 }).withMessage("El planeta de origen no puede superar los 60 caracteres.")
  //   .escape(),
  // body("debilidad")
  //   .optional()
  //   .trim()
  //   .isLength({ min: 3 }).withMessage("La debilidad debe tener almenos 3 carácteres.")
  //   .isLength({ max: 60 }).withMessage("La debilidad no puede superar los 60 caracteres.")
  //   .escape(),
  // body("creador")
  //   .optional()
  //   .trim()
  //   .isLength({ min: 3 }).withMessage("El creador debe tener almenos 3 carácteres.")
  //   .isLength({ max: 60 }).withMessage("El creador no puede superar los 60 caracteres.")
  //   .escape(),
  // body("aliados")
  //   .optional()
  //   .isArray({ min: 1 }).withMessage("aliados debe ser un array de almenos un elemento"),
  // body("aliados.*")
  //   .optional()
  //   .isString().withMessage("Aliados debe ser una array de strings")
  //   .trim()
  //   .isLength({ min: 3 }).withMessage("Cada aliado debe tener al menos 3 caracteres.")
  //   .isLength({ max: 60 }).withMessage("Cada aliado no puede superar los 60 caracteres.")
  //   .escape(),
  // body("enemigos")
  //   .optional()
  //   .isArray({ min: 1 }).withMessage("enemigos debe ser un array de almenos un elemento"),
  // body("enemigos.*")
  //   .optional()
  //   .isString().withMessage("enemigos de ser un array de strings")
  //   .trim()
  //   .isLength({ min: 3 }).withMessage("Cada enemigo debe tener al menos 3 caracteres.")
  //   .isLength({ max: 60 }).withMessage("Cada enemigo no puede superar los 60 caracteres.")
  ];
