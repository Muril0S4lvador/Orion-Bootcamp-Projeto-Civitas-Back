import { Request, Response } from 'express';
import { Class } from '../entity/Class';
import { RouteResponse } from '../helpers/RouteResponse';
//import { ClassRepository } from 'repositories/ClassRepository';
import { enumYears } from '../models/enums/EnumYears';
import { enumShifts } from '../models/enums/EnumShifts';
import { enumTeaching } from '../models/enums/EnumTeaching';
import { MysqlDataSource } from '../config/database';
import { body, validationResult } from 'express-validator';


export class ClassController {
    
  // Middleware de validação
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

  static async create(req: Request, res: Response) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return RouteResponse.error(res, 'Dados inválidos.');
      }

      const { year, shift, teaching, identifier } = req.body;
      
      try {
          // Verificação de duplicidade
          const classExists = await MysqlDataSource.getRepository(Class).findOneBy({ identifier });
          if (classExists) {
              return RouteResponse.error(res, 'Já existe uma turma com este identificador.');
          }

          const schoolClass = new Class();
          schoolClass.yearType = year;
          schoolClass.shiftType = shift;
          schoolClass.teachingType = teaching;
          schoolClass.identifier = identifier;

          await MysqlDataSource.getRepository(Class).save(schoolClass);
          return RouteResponse.sucess(res, schoolClass);

      } catch (error) {
          return RouteResponse.error(res, (error as Error).message);
      }
  }
}