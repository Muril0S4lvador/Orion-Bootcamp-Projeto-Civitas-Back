import { body } from 'express-validator';
import { SchoolYearRepository } from '../repositories/SchoolYearRepository';
import { TeachingRepository } from '../repositories/TeachingRepository';
import { ShiftRepository } from '../repositories/ShiftRepository';

export const validateClassData = () => {
    return [
        body('year')
            .notEmpty()
            .withMessage('O campo do ano escolar é obrigatório.')
            .custom(async year => {
                const isValid = await SchoolYearRepository.findYearById(year);
                if (!isValid) {
                    throw new Error('Ano escolar inválido.');
                }
                return true;
            }),
        body('shift')
            .notEmpty()
            .withMessage('O campo do turno é obrigatório.')
            .custom(async shift => {
                const isValid = await ShiftRepository.findShiftById(shift);
                if (!isValid) {
                    throw new Error('Turno inválido.');
                }
                return true;
            }),
        body('teaching')
            .notEmpty()
            .withMessage('O campo de ensino é obrigatório.')
            .custom(async teaching => {
                const isValid = await TeachingRepository.findTeachingById(teaching);
                if (!isValid) {
                    throw new Error('Nível de ensino inválido.');
                }
                return true;
            }),
        body('identifier')
            .notEmpty()
            .withMessage('O campo de identificador é obrigatório.')
            .isLength({ max: 20 })
            .withMessage('O identificador deve ter no máximo 20 caracteres.')
    ];
};
