import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { PDIAnswer } from '../entity/PDIAnswer';

export class PDIAnswerRepository extends Repository<PDIAnswer> {
    constructor() {
        super(PDIAnswer, MysqlDataSource.manager);
    }
}
