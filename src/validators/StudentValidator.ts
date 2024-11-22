import { body } from 'express-validator';

export const validateStudentData = () => {
    return [
        body('name')
            .notEmpty()
            .withMessage('O campo do nome do estudante é obrigatório.')
            .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
            .withMessage('Caracteres especiais e números não são permitidos.'),
        body('cpf')
            .notEmpty()
            .withMessage('O campo do CPF do responsável é obrigatório.')
            .isLength({ min: 11, max: 11 })
            .withMessage('Número de CPF inválido.'),
        body('registration')
            .notEmpty()
            .withMessage('O campo de matrícula é obrigatório.')
            .isNumeric()
            .withMessage('A matrícula deve ter apenas números.'),
        body('schoolClassIds').notEmpty().withMessage('O campo de turma é obrigatório.'),
        body('email')
            .notEmpty()
            .withMessage('O campo de e-mail do responsável é obrigatório.')
            .isEmail()
            .withMessage('O endereço de e-mail não é válido.')
    ];
};
