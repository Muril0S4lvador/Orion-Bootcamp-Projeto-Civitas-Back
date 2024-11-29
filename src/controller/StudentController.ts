import { Request, Response } from 'express';
import { RouteResponse } from '../helpers/RouteResponse';
import { StudentRepository } from '../repositories/StudentRepository';
import { ClassRepository } from '../repositories/ClassRepository';
import { validationResult } from 'express-validator';
import { Student } from '../entity/Student';

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
     *                 description: nome completo do estudante
     *                 type: string
     *                 example: "Thais Oliveira"
     *               registration:
     *                 description: matrícula do estudante
     *                 type: integer
     *                 example: 111
     *               schoolClassIds:
     *                 description: id(s) da(s) turma(s)
     *                 type: array
     *                 items:
     *                 example: [1, 2]
     *               cpf:
     *                 description: cpf do responsável do estudante
     *                 type: string
     *                 maxLength: 11
     *                 example: "00000000000"
     *               email:
     *                  description: email do responsável do estudante
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

        const { name, registration, schoolClassIds, cpf, email } = req.body;
        const registrationExists = await studentRepository.findStudentByRegistration(registration);
        if (registrationExists) {
            return RouteResponse.error(res, 'Já existe um estudante com essa matrícula.');
        }
        const emailExists = await studentRepository.findStudentByEmail(email);
        if (emailExists) {
            return RouteResponse.error(res, 'Já existe um estudante com esse e-mail cadastrado.');
        }

        try {
            const classIds = Array.isArray(schoolClassIds) ? schoolClassIds : [schoolClassIds];
            const classList = await classRepository.findClassesByIds(classIds);

            const notFoundClasses = classList.map((cls, index) => (cls === null ? classIds[index] : null)).filter(id => id !== null);

            if (notFoundClasses.length > 0) {
                return RouteResponse.error(res, `Uma ou mais turmas informadas são inválidas.`);
            }

            const validClasses = classList.filter(cls => cls !== undefined);

            const newStudent = studentRepository.create({
                name: name,
                registration: registration,
                classes: validClasses,
                cpf: cpf,
                email: email
            });
            await studentRepository.save(newStudent);
            return RouteResponse.sucessCreated(res, newStudent);
        } catch (error) {
            return RouteResponse.error(res, error);
        }
    }
    /**
     * @swagger
     * /classes/{id}/students:
     *   get:
     *     summary: Retorna os estudantes por ID da turma
     *     tags:
     *       - Class
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: O ID da turma para buscar os estudantes.
     *     responses:
     *       '200':
     *         description: Lista de estudantes retornada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       id:
     *                         type: integer
     *                         example: 1
     *                         description: ID do estudante.
     *                       name:
     *                         type: string
     *                         example: "João da Silva"
     *                         description: Nome do estudante.
     *                       registration:
     *                         type: integer
     *                         example: 12345
     *                         description: Matrícula única do estudante.
     *                       cpf:
     *                         type: string
     *                         example: "00000000000"
     *                         description: CPF do responsável pelo estudante.
     *                       email:
     *                         type: string
     *                         example: "joao.silva@gmail.com"
     *                         description: Email único do responsável pelo estudante.
     *                       createdAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2024-11-24T10:00:00Z"
     *                         description: Timestamp de criação do registro.
     *                       updatedAt:
     *                         type: string
     *                         format: date-time
     *                         example: "2024-11-24T12:00:00Z"
     *                         description: Timestamp da última atualização do registro.
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */

    static async getStudentsByClassId(req: Request, res: Response) {
        const studentRepository = new StudentRepository();
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return RouteResponse.error(res, 'Dados inválidos.');
        }
        const { id } = req.params;
        console.log(id);

        try {
            const students: Student[] = await studentRepository.findStudentsByClassId(id);

            if (students[0] == null) {
                return RouteResponse.error(res, 'Não há estudantes nessa turma.');
            }

            students.sort((a, b) => a.name.localeCompare(b.name));
            return RouteResponse.sucess(res, students);
        } catch (error) {
            return RouteResponse.error(res, 'Erro ao tentar encontrar estudantes.');
        }
    }
}
