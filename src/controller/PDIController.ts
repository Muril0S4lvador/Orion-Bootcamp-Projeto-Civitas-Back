import { Request, Response } from 'express';
import { PDICreateRequestBody } from '../models/interfaces/PDICreateRequestBody';
import { StudentRepository } from '../repositories/StudentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { PDIRepository } from '../repositories/PDIRepository';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { Student } from '../entity/Student';
import { User } from '../entity/User';
import { RouteResponse } from '../helpers/RouteResponse';
import { Answer } from '../entity/Answer';
import { PDI } from '../entity/PDI';

export class PDIController {
    /**
     * @swagger
     * /pdi:
     *   post:
     *     summary: Criação de PDI
     *     tags: [PDI]
     *     consumes:
     *       - application/json
     *     produces:
     *       - application/json
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - studentId
     *               - answersEmotionalInteligenceId
     *               - answersAcademicDevelopmentId
     *               - answersResponsabilityId
     *               - considerations
     *             properties:
     *               studentId:
     *                 type: number
     *                 example: 1
     *               answersAcademicDevelopmentId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [1]
     *               answersEmotionalInteligenceId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [3]
     *               answersResponsabilityId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [4]
     *               considerations:
     *                 type: string
     *                 example: 'Aluno excelente.'
     *     responses:
     *       '201':
     *         description: PDI cadastrado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     student:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                           example: 1
     *                         name:
     *                           type: string
     *                           example: 'Aluno'
     *                         registration:
     *                           type: number
     *                           example: 123
     *                         email:
     *                           type: string
     *                           example: 'aluno@email.com'
     *                         cpf:
     *                           type: string
     *                           example: '11122233399'
     *                         createdAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         updatedAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                     teacher:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                           example: 2
     *                         name:
     *                           type: string
     *                           example: 'professor'
     *                         email:
     *                           type: string
     *                           example: 'professor@email.com'
     *                         createdAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         updatedAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         roles:
     *                           type: array
     *                           items:
     *                             type: string
     *                             example: 'TEACHER'
     *                     considerations:
     *                       type: string
     *                       example: 'Aluno excelente.'
     *                     answersAcademicDevelopment:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                           example: 1
     *                         points:
     *                           type: number
     *                           example: 5
     *                         answer:
     *                           type: string
     *                           example: 'Excepcional'
     *                         createdAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         updatedAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                     answersEmotionalInteligence:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                           example: 3
     *                         points:
     *                           type: number
     *                           example: 3
     *                         answer:
     *                           type: string
     *                           example: 'Adequado'
     *                         createdAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         updatedAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                     answersResponsability:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: number
     *                           example: 4
     *                         points:
     *                           type: number
     *                           example: 2
     *                         answer:
     *                           type: string
     *                           example: 'Abaixo das expectativas'
     *                         createdAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                         updatedAt:
     *                           type: string
     *                           example: '2024-11-29T20:53:35.000Z'
     *                     id:
     *                       type: number
     *                       example: 123
     *                     createdAt:
     *                       type: string
     *                       example: '2024-11-29T20:53:35.000Z'
     *                     updatedAt:
     *                       type: string
     *                       example: '2024-11-29T20:53:35.000Z'
     *       '400':
     *         description: Token inválido, Ids de resposta inválidos ou entidade não encontrada
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'Estudante selecionado não existente'
     *       '401':
     *         description: Usuário não possui role correta para criar PDI
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'Unauthorized Access'
     */
    async createPDI(req: Request, res: Response) {
        const {
            studentId,
            answersEmotionalInteligenceId,
            answersAcademicDevelopmentId,
            answersResponsabilityId,
            considerations
        }: PDICreateRequestBody = req.body;
        const email: string = req.headers.email.toString() || '';
        const studentRepository: StudentRepository = new StudentRepository();
        const userRepository: UserRepository = new UserRepository();
        const pdiRepository: PDIRepository = new PDIRepository();
        const answerRepository: AnswerRepository = new AnswerRepository();

        const allPossibleAnswers: Answer[] = await answerRepository.find();
        const allPossibleIds: number[] = allPossibleAnswers.map(answer => answer.id);

        const allBodyAnswersId = [...answersAcademicDevelopmentId, ...answersEmotionalInteligenceId, ...answersResponsabilityId];

        if (allBodyAnswersId.some(bodyId => !allPossibleIds.includes(bodyId))) {
            return RouteResponse.error(res, 'Ids enviados inválidos');
        }

        const student: Student = await studentRepository.findStudentById(studentId);
        const teacher: User = await userRepository.findUserByEmail(email);

        if (!student) {
            return RouteResponse.error(res, 'Estudante selecionado não existente');
        }
        if (!teacher) {
            return RouteResponse.error(res, 'Professor selecionado não existente');
        }

        const answersAcademicDevelopment: Answer[] = allPossibleAnswers.filter(answer => answersAcademicDevelopmentId.includes(answer.id));

        const answersEmotionalInteligence: Answer[] = allPossibleAnswers.filter(answer => answersEmotionalInteligenceId.includes(answer.id));

        const answersResponsability: Answer[] = allPossibleAnswers.filter(answer => answersResponsabilityId.includes(answer.id));

        const pdi: PDI = await pdiRepository.save({
            student,
            teacher,
            considerations,
            answersAcademicDevelopment,
            answersEmotionalInteligence,
            answersResponsability
        });

        delete pdi.teacher.password;

        return RouteResponse.sucessCreated(res, pdi);
    }
}
