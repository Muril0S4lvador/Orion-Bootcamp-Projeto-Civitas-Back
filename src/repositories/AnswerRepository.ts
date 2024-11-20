import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Answer } from '../entity/Answer';

export class AnswerRepository extends Repository<Answer> {
    constructor() {
        super(Answer, MysqlDataSource.manager);
    }
}
