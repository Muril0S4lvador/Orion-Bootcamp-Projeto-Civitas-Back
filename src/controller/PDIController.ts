import { Request, Response } from 'express';
import { PDICreateRequestBody } from '../models/interfaces/PDICreateRequestBody';
import { enumAnswers } from '../models/enums/EnumAnswers';
import { enumQuestionType } from '../models/enums/EnumQuestionType';
import { StudentRepository } from '../repositories/StudentRepository';
import { UserRepository } from '../repositories/UserRepository';
import { PDIRepository } from '../repositories/PDIRepository';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { Student } from '../entity/Student';
import { User } from '../entity/User';
import { PDI } from '../entity/PDI';
import { RouteResponse } from '../helpers/RouteResponse';
import { Answer } from 'entity/Answer';

export class PDIController {
    /**
     * @swagger
     * /create-pdi:
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
     *               - teacherId
     *               - bodyAnswersEmotionalInteligence
     *               - bodyAnswersAcademicDevelopment
     *               - bodyAnswersResponsability
     *               - considerations
     *             properties:
     *               studentId:
     *                 type: number
     *                 example: 1
     *               teacherId:
     *                 type: number
     *                 example: 1
     *               bodyAnswersEmotionalInteligence:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Adequado", "Excepcional"]
     *               bodyAnswersAcademicDevelopment:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Adequado", "Excepcional"]
     *               bodyAnswersResponsability:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: ["Adequado", "Excepcional"]
     *               considerations:
     *                 type: string
     *                 example: 'Aluno excelente.'
     *     responses:
     *       '201':
     *         description: PDI criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 'PDI criado com sucesso'
     *       '400':
     *         description: Ids válidos, mas entidade não encontrada ou respostas inválidas
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
            bodyAnswersEmotionalInteligence,
            bodyAnswersAcademicDevelopment,
            bodyAnswersResponsability,
            considerations
        }: PDICreateRequestBody = req.body;
        const email: string = req.headers.email.toString() || '';
        const studentRepository: StudentRepository = new StudentRepository();
        const userRepository: UserRepository = new UserRepository();
        const pdiRepository: PDIRepository = new PDIRepository();
        const answerRepository: AnswerRepository = new AnswerRepository();

        const allBodyAnswers = [...bodyAnswersAcademicDevelopment, ...bodyAnswersEmotionalInteligence, ...bodyAnswersResponsability];

        if (!allBodyAnswers.every(answer => Object.values(enumAnswers).includes(answer as enumAnswers))) {
            return RouteResponse.error(res, 'Respostas enviadas inválidas');
        }

        const student: Student = await studentRepository.findStudentById(studentId);
        const teacher: User = await userRepository.findUserByEmail(email);

        if (!student) {
            return RouteResponse.error(res, 'Estudante selecionado não existente');
        }
        if (!teacher) {
            return RouteResponse.error(res, 'Professor selecionado não existente');
        }

        const allPossibleAnswers: Answer[] = await answerRepository.getAllPossibleAnswers();

        const answersAcademicDevelopment: Answer[] = allPossibleAnswers.filter(
            answer => bodyAnswersAcademicDevelopment.includes(answer.answerType) && answer.questionType == enumQuestionType.ACADEMIC_DEVELOPMENT
        );

        const answersEmotionalInteligence: Answer[] = allPossibleAnswers.filter(
            answer => bodyAnswersEmotionalInteligence.includes(answer.answerType) && answer.questionType == enumQuestionType.EMOTIONAL_INTELLIGENCE
        );

        const answersResponsability: Answer[] = allPossibleAnswers.filter(
            answer => bodyAnswersResponsability.includes(answer.answerType) && answer.questionType == enumQuestionType.RESPONSABILITY
        );

        await pdiRepository.save({
            student,
            teacher,
            considerations,
            answers: [...answersAcademicDevelopment, ...answersEmotionalInteligence, ...answersResponsability]
        });

        return RouteResponse.successEmpty(res);
    }
}
