import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { SchoolYear } from '../entity/SchoolYear';

export class SchoolYearRepository extends Repository<SchoolYear> {
  constructor() {
    super(SchoolYear, MysqlDataSource.manager);
  }

  async getAllSchoolYears(): Promise<string[] | undefined> {
    const result = await this.find();
    let schoolYears: string[] = [];
    if (result)
      schoolYears = result?.map(
        (schoolYear: SchoolYear) => schoolYear.yearType
      );
    return schoolYears;
  }
}
