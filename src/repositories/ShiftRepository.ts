import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
  constructor() {
    super(Shift, MysqlDataSource.manager);
  }
  static async getShiftByName(name: string): Promise<Shift | undefined> {
    return MysqlDataSource.getRepository(Shift).findOne({
      where: { name }
    });
  }
  static async findIdByName(nameShift: string): Promise<number | null> {
    try {
      const result = await MysqlDataSource.getRepository(Shift)
        .createQueryBuilder('shift')
        .select('shift.id')
        .where('shift.name = :name', { name: nameShift })
        .getOne();

      return result ? result.id : null;
    } catch (error) {
      console.error('Error finding id by name:', error);
      throw new Error('Failed to find id by name');
    }
  }

  /**
   * @returns Todos os turnos da tabela Shift
   */
  async getAllShifts(): Promise<Shift[] | undefined> {
    return this.find();
  }
}
