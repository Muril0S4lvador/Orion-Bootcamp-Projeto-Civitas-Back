import { body } from 'express-validator';
import { enumAnswers } from 'models/enums/EnumAnswers';

export const validatePDIData = () => {
    return [
        body('studentId').notEmpty().withMessage('O campo studentId é obrigatório.').isNumber().withMessage('studentId precisa ser um número'),
        body('teacherId').notEmpty().withMessage('O campo teacherId é obrigatório.').isNumber().withMessage('teacherId precisa ser um número'),
        body('answersEmotionalInteligence')
            .notEmpty()
            .withMessage('O campo answersEmotionalInteligence é obrigatório.')
            .isIn(Object.values(enumAnswers))
            .withMessage('answersEmotionalInteligence inválido.'),
        body('answersAcademicDevelopment')
            .notEmpty()
            .withMessage('O campo answersAcademicDevelopment é obrigatório.')
            .isIn(Object.values(enumAnswers))
            .withMessage('answersAcademicDevelopment inválido.'),
        body('answersResponsability')
            .notEmpty()
            .withMessage('O campo answersResponsability é obrigatório.')
            .isIn(Object.values(enumAnswers))
            .withMessage('answersResponsability inválido.'),
        body('considerations')
            .optional()
            .withMessage('O campo considerations é obrigatório.')
            .isLength({ max: 600 })
            .withMessage('As considerações devem ter no máximo 600 caracteres.')
    ];
};
