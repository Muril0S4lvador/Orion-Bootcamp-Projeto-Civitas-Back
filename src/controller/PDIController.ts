import { Request, Response } from 'express';
import { PDICreateRequestBody } from '../models/interfaces/PDICreateRequestBody';
import { StudentRepository } from '../repositories/StudentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { PDIRepository } from '../repositories/PDIRepository';
import { Student } from '../entity/Student';
import { User } from '../entity/User';
import { PDI } from '../entity/PDI';
import { RouteResponse } from '../helpers/RouteResponse';

export class PDIController {
    /**
     * @swagger
     * /create-pdi
     *   post:
     *     summary: Criação de PDI
     *     tags: [PDI]
     *     consumes:
     *      - application/json
     *     produces:
     *      - application/json
     *     requestBody:
     *       content:
     *        application/json:
     *          schema:
     *            type: object
     *            required:
     *              - studentId
     *              - teacherId
     *              - answersEmotionalInteligence
     *              - answersAcademicDevelopment
     *              - answersResponsability
     *              - considerations
     *            properties:
     *              studentId:
     *                type: number
     *                example: 1
     *              teacherId:
     *                type: number
     *                example: 1
     *              answersEmotionalInteligence:
     *                type: array
     *                items:
     *                  type: string
     *                  example: ['Adequado, Excepcional']
     *              answersAcademicDevelopment:
     *                type: array
     *                items:
     *                  type: string
     *                  example: ['Adequado, Excepcional']
     *              answersResponsability:
     *                type: array
     *                items:
     *                  type: string
     *                  example: ['Adequado, Excepcional']
     *              considerations:
     *                type: string
     *                example: 'Aluno excelente.'
     *     responses:
     *       '201':
     *       '400':
     *         description: Ids válidos, mas entidade não encontrada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'Estudante selecionado não existente'
     */
    async createPDI(req: Request, res: Response) {
        const {
            studentId,
            teacherId,
            answersEmotionalInteligence,
            answersAcademicDevelopment,
            answersResponsability,
            considerations
        }: PDICreateRequestBody = req.body;
        const studentRepository: StudentRepository = new StudentRepository();
        const userRepository: UserRepository = new UserRepository();
        const pdiRepository: PDIRepository = new PDIRepository();

        const student: Student = await studentRepository.findStudentById(studentId);
        const teacher: User = await userRepository.findUserById(teacherId);

        if (!student) {
            return RouteResponse.error(res, 'Estudante selecionado não existente');
        }
        if (!teacher) {
            return RouteResponse.error(res, 'Professor selecionado não existente');
        }

        const pdi: PDI = pdiRepository.save({
            student,
            teacher,
            answersAcademicDevelopment,
            answersEmotionalInteligence,
            answersResponsability,
            considerations
        });

        return RouteResponse.sucessCreated(res, pdi);
    }
}

/*

    studentId: 1,
    teacherId: 1,
    answersEmotionalInteligence: [],
    answersAcademicDevelopment: [],
    answersResponsability: [],
    considerations: ""

*/
