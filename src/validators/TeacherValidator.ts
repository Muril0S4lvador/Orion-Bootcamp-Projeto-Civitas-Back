import { body } from 'express-validator';

export const validateTeacherData = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('O campo do nome do professor é obrigatório.')
            .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
            .withMessage('Caracteres especiais e números não são permitidos.'),
        body('email')
            .notEmpty()
            .withMessage('O campo de e-mail do professor é obrigatório.')
            .isEmail()
            .withMessage('O endereço de e-mail não é válido.'),
        body('registration')
            .notEmpty()
            .withMessage('O campo de matrícula é obrigatório.')
            .isNumeric()
            .withMessage('A matrícula deve ter apenas números.'),
        body('schoolClassIds').notEmpty().withMessage('O campo de turma é obrigatório.')
    ];
};
