import { Request, Response } from 'express';
import { RouteResponse } from '../helpers/RouteResponse';
import { ClassRepository } from '../repositories/ClassRepository';
import { UserRepository } from '../repositories/UserRepository';
import { validationResult } from 'express-validator';

export class TeacherController {
    /**
     * @swagger
     * /teachers:
     *   post:
     *     summary: Cria um novo professor
     *     description: Endpoint para criar um novo professor com nome, e-mail, número de matrícula e turmas.
     *     tags:
     *        - Teacher
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                name:
     *                 description: nome completo do professor
     *                 type: string
     *                 example: "Maria da Silva"
     *                email:
     *                 description: e-mail do professor
     *                 type: string
     *                 example: teacher@gmail.com
     *                registration:
     *                 description: matrícula do professor
     *                 type: integer
     *                 example: 1
     *                schoolClassIds:
     *                 description: id(s) da(s) turma(s) do professor
     *                 type: array
     *                 items:
     *                 example: [1, 2]
     *     responses:
     *       201:
     *         description: Professor criado com sucesso
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
    static async createTeacher(req: Request, res: Response) {
        const errors = validationResult(req);
        const classRepository = new ClassRepository();
        const userRepository = new UserRepository();

        if (!errors.isEmpty()) {
            return RouteResponse.error(res, 'Dados inválidos.');
        }

        const { name, email, registration, schoolClassIds } = req.body;

        const emailExists = await userRepository.findUserByEmail(email);
        if (emailExists) {
            return RouteResponse.error(res, 'Já existe um professor com esse e-mail cadastrado.');
        }

        const registrationExists = await userRepository.findUserByRegistration(registration);
        if (registrationExists) {
            return RouteResponse.error(res, 'Já existe um professor com essa matrícula.');
        }

        try {
            const classIds = Array.isArray(schoolClassIds) ? schoolClassIds : [schoolClassIds];
            const classList = await classRepository.findClassesByIds(classIds);

            const notFoundClasses = classList.map((cls, index) => (cls === null ? classIds[index] : null)).filter(id => id !== null);

            if (notFoundClasses.length > 0) {
                return RouteResponse.error(res, `Uma ou mais turmas informadas são inválidas.`);
            }

            const validClasses = classList.filter(cls => cls !== undefined);

            const newTeacher = userRepository.create({
                name: name,
                email: email,
                password: '1',
                registration: registration,
                classes: validClasses
            });
            await userRepository.save(newTeacher);
            return RouteResponse.sucessCreated(res, newTeacher);
        } catch (error) {
            return RouteResponse.error(res, error);
        }
    }
}
