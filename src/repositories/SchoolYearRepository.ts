import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { SchoolYear } from '../entity/SchoolYear';

export class SchoolYearRepository extends Repository<SchoolYear> {
  constructor() {
    super(SchoolYear, MysqlDataSource.manager);
  }

  async getAllSchoolYears(): Promise<SchoolYear | undefined> {
    return this.find();
  }
}
