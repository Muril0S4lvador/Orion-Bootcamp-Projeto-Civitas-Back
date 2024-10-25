import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
  constructor() {
    super(Shift, MysqlDataSource.manager);
  }

  /**
   * @returns Todos os turnos da tabela Shift
   */
  async getAllShifts(): Promise<Shift | undefined> {
    return this.find();
  }
}
