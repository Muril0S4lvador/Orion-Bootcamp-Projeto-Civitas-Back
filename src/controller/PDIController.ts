import { Request, Response } from 'express';
import { PDICreateRequestBody } from '../models/interfaces/PDICreateRequestBody';
import { StudentRepository } from '../repositories/StudentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { PDIRepository } from '../repositories/PDIRepository';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { Student } from '../entity/Student';
import { User } from '../entity/User';
import { RouteResponse } from '../helpers/RouteResponse';
import { Answer } from 'entity/Answer';

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
     *               answersEmotionalInteligenceId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [3, 1]
     *               answersAcademicDevelopmentId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [8, 6]
     *               answersResponsabilityId:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [15, 12]
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
     *                 sucess:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: string
     *                   example: 'PDI cadastrado com sucesso'
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

        const answersEmotionalInteligence: Answer[] = allPossibleAnswers.filter(answer => answersAcademicDevelopmentId.includes(answer.id));

        const answersResponsability: Answer[] = allPossibleAnswers.filter(answer => answersAcademicDevelopmentId.includes(answer.id));

        await pdiRepository.save({
            student,
            teacher,
            considerations,
            answersResponsability
        });

        return RouteResponse.sucessCreated(res, 'PDI cadastrado com sucesso');
    }
}
