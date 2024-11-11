import { Request, Response } from 'express';
import { ShiftRepository } from '../repositories/ShiftRepository';
import { SchoolYearRepository } from '../repositories/SchoolYearRepository';
import { TeachingRepository } from '../repositories/TeachingRepository';
import { RouteResponse } from '../helpers/RouteResponse';
import { Teaching } from '../entity/Teaching';
import { SchoolYear } from '../entity/SchoolYear';
import { Shift } from '../entity/Shift';

export class ClassController {
    /**
     * @swagger
     * /classes-options:
     *   get:
     *     summary: Retorna as opções de criação de turma
     *     tags: [class]
     *     produces:
     *       - application/json
     *     responses:
     *       '200':
     *          description: Requisição executada com sucesso
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  success:
     *                    type: boolean
     *                    example: 'true'
     *                  data:
     *                    type: object
     *                    properties:
     *                      shifts:
     *                        type: array
     *                        items:
     *                          type: object
     *                          properties:
     *                            id:
     *                              type: number
     *                              example: 1
     *                            name:
     *                              type: string
     *                              example: 'Manhã'
     *                            createdAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     *                            updatedAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     *                      schoolYears:
     *                        type: array
     *                        items:
     *                          type: object
     *                          properties:
     *                            id:
     *                              type: number
     *                              example: 1
     *                            name:
     *                              type: string
     *                              example: '1º ano'
     *                            createdAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     *                            updatedAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     *                      teachings:
     *                        type: array
     *                        items:
     *                          type: object
     *                          properties:
     *                            id:
     *                              type: number
     *                              example: 1
     *                            name:
     *                              type: string
     *                              example: 'Maternal'
     *                            createdAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     *                            updatedAt:
     *                              type: string
     *                              example: '2024-10-21T11:04:32.000Z'
     */
    async getEnumsInfos(req: Request, res: Response) {
        const shiftRepository: ShiftRepository = new ShiftRepository();
        const schoolYearRepository: SchoolYearRepository = new SchoolYearRepository();
        const teachingRepository: TeachingRepository = new TeachingRepository();

        const teachings: Teaching = await teachingRepository.getAllTeachings();
        const shifts: Shift = await shiftRepository.getAllShifts();
        const schoolYears: SchoolYear = await schoolYearRepository.getAllSchoolYears();

        return RouteResponse.sucess(res, { teachings, shifts, schoolYears });
    }
}
