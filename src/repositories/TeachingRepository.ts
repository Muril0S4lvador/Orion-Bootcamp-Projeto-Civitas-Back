import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Teaching } from '../entity/Teaching';

export class TeachingRepository extends Repository<Teaching> {
  constructor() {
    super(Teaching, MysqlDataSource.manager);
  }

  async getAllTeachings(): Promise<string[] | undefined> {
    const result = await this.find();
    let teachings: string[] = [];
    if (result)
      teachings = result?.map((teaching: Teaching) => teaching.teachingType);
    return teachings;
  }
}
