import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Answer } from '../entity/Answer';

export class AnswerRepository extends Repository<Answer> {
    constructor() {
        super(Answer, MysqlDataSource.manager);
    }

    /**
     * @returns Todos as possíveis respostas de um PDI
     */
    async getAllPossibleAnswers(): Promise<Answer[] | undefined> {
        return this.find();
    }
}
