import { body } from 'express-validator';
import { enumYears } from '../models/enums/EnumYears';
import { enumShifts } from '../models/enums/EnumShifts';
import { enumTeaching } from '../models/enums/EnumTeaching';

export const validateClassData = () => {
  console.log('2. Validating class data...');
  return [
    body('year')
      .notEmpty()
      .withMessage('O campo do ano escolar é obrigatório.')
      .isIn(Object.values(enumYears))
      .withMessage('Ano escolar inválido.'),
    body('shift')
      .notEmpty()
      .withMessage('O campo do turno é obrigatório.')
      .isIn(Object.values(enumShifts))
      .withMessage('Turno inválido.'),
    body('teaching')
      .notEmpty()
      .withMessage('O campo de ensino é obrigatório.')
      .isIn(Object.values(enumTeaching))
      .withMessage('Ensino inválido.'),
    body('identifier')
      .notEmpty()
      .withMessage('O campo de identificador é obrigatório.')
      .isLength({ max: 20 })
      .withMessage('O identificador deve ter no máximo 20 caracteres.')
  ];
  console.log('2. passou class data...');
};
