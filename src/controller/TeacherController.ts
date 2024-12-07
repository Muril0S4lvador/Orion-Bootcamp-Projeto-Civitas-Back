import { Request, Response } from 'express';
import { RouteResponse } from '../helpers/RouteResponse';
import { ClassRepository } from '../repositories/ClassRepository';
import { UserRepository } from '../repositories/UserRepository';
import { validationResult } from 'express-validator';
import { Class } from '../entity/Class';
import bcrypt from 'bcryptjs';
import { enumRoles } from '../models/enums/EnumRoles';
import { RoleRepository } from '../repositories/RoleRepository';
import { Role } from '../entity/Role';

export class TeacherController {
    /**
     * @swagger
     * /teachers:
     *   post:
     *     summary: Cria um novo professor
     *     description: Endpoint para criar um novo professor com nome, e-mail, número de matrícula e turmas.
     *     tags:
     *        - Teacher
     *     security:
     *       - BearerAuth: []
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
        const roleRepository = new RoleRepository();

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

            const rawPassword = await userRepository.generateRandomPassword();

            const hashedPassword = await bcrypt.hash(rawPassword, 10);

            const role: Role[] = [];
            role.push(await roleRepository.findRoleByName(enumRoles.TEACHER));

            const newTeacher = userRepository.create({
                name: name,
                email: email,
                password: hashedPassword,
                isFirstPassword: true,
                registration: registration,
                classes: validClasses,
                roles: role
            });

            await userRepository.save(newTeacher);

            return RouteResponse.sucessCreated(res, newTeacher);
        } catch (error) {
            return RouteResponse.error(res, error);
        }
    }
    /**
     * @swagger
     * /classes/{id}/teachers:
     *   get:
     *     summary: Retorna as turmas por ID do professor
     *     tags:
     *       - Class
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: O ID do professor.
     *     responses:
     *       '200':
     *         description: Lista de turmas retornada com sucesso.
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
     *                         description: ID da turma.
     *                       schoolYear:
     *                         type: integer
     *                         example: 1
     *                         description: Id do ano escolar.
     *                       shift:
     *                         type: integer
     *                         example: 1
     *                         description: Id do turno escolar.
     *                       teaching:
     *                         type: integer
     *                         example: 2
     *                         description: Id do nível de ensino.
     *                       identifier:
     *                         type: string
     *                         example: "TURMA 1-A"
     *                         description: Nome da turma.
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */

    static async getClassesByTeacherId(req: Request, res: Response) {
        const userRepository = new UserRepository();
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return RouteResponse.error(res, 'Dados inválidos.');
        }
        const { id } = req.params;

        try {
            const classes: Class[] = await userRepository.findClassesByTeacherId(id);

            if (classes[0] == null) {
                return RouteResponse.error(res, 'Este professor não existe ou não tem turmas.');
            }

            return RouteResponse.sucess(res, classes);
        } catch (error) {
            return RouteResponse.error(res, 'Erro ao tentar encontrar turmas.');
        }
    }
}
