import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Teaching } from '../entity/Teaching';

export class TeachingRepository extends Repository<Teaching> {
  constructor() {
    super(Teaching, MysqlDataSource.manager);
  }

  async getAllTeachings(): Promise<Teaching | undefined> {
    return this.find();
  }
}
