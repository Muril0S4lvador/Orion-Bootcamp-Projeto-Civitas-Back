import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
    constructor() {
        super(Shift, MysqlDataSource.manager);
    }
}
