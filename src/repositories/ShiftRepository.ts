import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
  constructor() {
    super(Shift, MysqlDataSource.manager);
  }

  async getAllShifts(): Promise<string[] | undefined> {
    const result = await this.find();
    let shifts: string[] = [];
    if (result) shifts = result?.map((shift: Shift) => shift.shiftType);
    return shifts;
  }
}
