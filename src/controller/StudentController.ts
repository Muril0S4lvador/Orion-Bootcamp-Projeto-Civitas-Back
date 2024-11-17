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
     *                 type: int
     *                 example: 111
     *               schoolClassIdentifier:
     *                 type: string
     *                 example: "TURMA 1-A"
     *               cpf:
     *                 type: string
     *                 maxLength: 11
     *                 example: "00000000000"
     *               email:
     *                  type: string
     *                  example: "example@gmail.com.br"
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
            const classExists = await classRepository.findClassByIdentifier(schoolClassIdentifier);
            if (!classExists) {
                return RouteResponse.error(res, 'Essa turma não existe.');
            }
            const newStudent = studentRepository.create({
                name: name,
                registration: registration,
                classes: [classExists],
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
