import { Request, Response } from 'express';
import { RouteResponse } from '../helpers/RouteResponse';
import { ClassRepository } from '../repositories/ClassRepository';
import { enumYears } from '../models/enums/EnumYears';
import { enumShifts } from '../models/enums/EnumShifts';
import { enumTeaching } from '../models/enums/EnumTeaching';
import { MysqlDataSource } from '../config/database';
import { body, validationResult } from 'express-validator';
import { ShiftRepository } from '../repositories/ShiftRepository';
import { SchoolYearRepository } from '../repositories/SchoolYearRepository';
import { TeachingRepository } from '../repositories/TeachingRepository';
import { Teaching } from '../entity/Teaching';
import { SchoolYear } from '../entity/SchoolYear';
import { Shift } from '../entity/Shift';


export class ClassController {
    
  static validateClassData() {
      return [
          body('year')
              .notEmpty().withMessage('O campo do ano escolar é obrigatório.')
              .isIn(Object.values(enumYears)).withMessage('Ano escolar inválido.'),
          body('shift')
              .notEmpty().withMessage('O campo do turno é obrigatório.')
              .isIn(Object.values(enumShifts)).withMessage('Turno inválido.'),
          body('teaching')
              .notEmpty().withMessage('O campo de ensino é obrigatório.')
              .isIn(Object.values(enumTeaching)).withMessage('Ensino inválido.'),
          body('identifier')
              .notEmpty().withMessage('O campo de identificador é obrigatório.')
              .isLength({ max: 20 }).withMessage('O identificador deve ter no máximo 20 caracteres.')
      ];
  }
  /**
 * @swagger
 * /classes:
 *   post:
 *     summary: Cria uma nova turma
 *     description: Endpoint para criar uma nova turma com ano, turno, ensino e identificador.
 *     tags:
 *       - Turmas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: string
 *                 enum: 
 *                   - 1º ano
 *                   - 2º ano
 *                   - 3º ano
 *                   - 4º ano
 *                   - 5º ano
 *                   - 6º ano
 *               shift:
 *                 type: string
 *                 enum:
 *                   - Manhã
 *                   - Tarde
 *                   - Noite
 *               teaching:
 *                 type: string
 *                 enum:
 *                   - Maternal
 *                   - Pré-escola
 *                   - Fundamental I
 *               identifier:
 *                 type: string
 *                 maxLength: 20
 *                 example: "TURMA 1-A"
 *     responses:
 *       201:
 *         description: Turma criada com sucesso
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
  static async create(req: Request, res: Response) {
      const errors = validationResult(req);
      const classRepository = new ClassRepository();

      if (!errors.isEmpty()) {
        return RouteResponse.error(res, 'Dados inválidos.');
      }

      const { year, shift, teaching, identifier } = req.body;
      
      try {
         const classExists = await classRepository.findClassByIdentifier(identifier);
         if (classExists) {
                return RouteResponse.error(res, 'Já existe uma turma com este identificador.');
         }
         const newClass = classRepository.create({
            year,
            shift,
            teaching,
            identifier,
          });
    
          await classRepository.save(newClass); 
    
          return RouteResponse.sucess(res, newClass); 

        } catch (error) {
          return RouteResponse.error(res, 'Erro ao criar a turma');
      }
  }



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
    const schoolYearRepository: SchoolYearRepository =
      new SchoolYearRepository();
    const teachingRepository: TeachingRepository = new TeachingRepository();

    const teachings: Teaching = await teachingRepository.getAllTeachings();
    const shifts: Shift = await shiftRepository.getAllShifts();
    const schoolYears: SchoolYear =
      await schoolYearRepository.getAllSchoolYears();

    return RouteResponse.sucess(res, { teachings, shifts, schoolYears });
  }
}

