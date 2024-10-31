import { Request, Response } from 'express';
import { Class } from '../entity/Class';
import { RouteResponse } from '../helpers/RouteResponse';
import { ClassRepository } from '../repositories/ClassRepository';
import { enumYears } from '../models/enums/EnumYears';
import { enumShifts } from '../models/enums/EnumShifts';
import { enumTeaching } from '../models/enums/EnumTeaching';
import { MysqlDataSource } from '../config/database';
import { body, validationResult } from 'express-validator';


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
}