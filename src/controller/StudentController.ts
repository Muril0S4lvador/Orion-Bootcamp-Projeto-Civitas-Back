import { Request, Response } from 'express';
import { RouteResponse } from '../helpers/RouteResponse';
import { StudentRepository } from '../repositories/StudentRepository';
import { ClassRepository } from '../repositories/ClassRepository';
import { validationResult } from 'express-validator';

export class StudentController {
    /**
     * @swagger
     * /students:
     *   post:
     *     summary: Cria um novo estudante
     *     description: Endpoint para criar um novo estudante com turma, matricula, nome, cpf e email.
     *     tags:
     *        - Student
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 example: "Thais Oliveira"
     *               registration:
     *                 type: integer
     *                 example: 111
     *               schoolClassIdentifier:
     *                 type: array
     *                 items:
     *                 type: string
     *                 example: ["TURMA 1-A", "TURMA 2-B"]
     *               cpf:
     *                 type: string
     *                 maxLength: 11
     *                 example: "00000000000"
     *               email:
     *                  type: string
     *                  example: "example@gmail.com"
     *     responses:
     *       201:
     *         description: Estudante criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: object
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */
    static async createStudent(req: Request, res: Response) {
        const errors = validationResult(req);
        const studentRepository = new StudentRepository();
        const classRepository = new ClassRepository();

        if (!errors.isEmpty()) {
            return RouteResponse.error(res, 'Dados inválidos.');
        }

        const { name, registration, schoolClassIdentifier, cpf, email } = req.body;
        const registrationExists = await studentRepository.findStudentByRegistration(registration);
        if (registrationExists) {
            return RouteResponse.error(res, 'Já existe um estudante com essa matrícula.');
        }
        const emailExists = await studentRepository.findStudentByEmail(email);
        if (emailExists) {
            return RouteResponse.error(res, 'Já existe um estudante com esse e-mail cadastrado.');
        }

        try {
            const classIdentifiers = Array.isArray(schoolClassIdentifier) ? schoolClassIdentifier : [schoolClassIdentifier];

            const classes = await Promise.all(classIdentifiers.map(identifier => classRepository.findClassByIdentifier(identifier)));
            const invalidClasses = classes.filter(cls => cls === undefined);

            if (invalidClasses.length > 0) {
                return RouteResponse.error(
                    res,
                    `As seguintes turmas são inválidas ou não existem: ${schoolClassIdentifier.filter((_, index) => classes[index] === undefined).join(', ')}`
                );
            }

            const validClasses = classes.filter(cls => cls !== undefined);

            const newStudent = studentRepository.create({
                name: name,
                registration: registration,
                classes: validClasses,
                cpf: cpf,
                email: email
            });
            await studentRepository.saveStudent(newStudent);
            return RouteResponse.sucess(res, newStudent);
        } catch (error) {
            return RouteResponse.error(res, error);
        }
    }
}
