import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { PDI } from '../entity/PDI';

export class PDIRepository extends Repository<PDI> {
    constructor() {
        super(PDI, MysqlDataSource.manager);
    }
}
