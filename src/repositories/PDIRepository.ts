import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { PDI } from '../entity/PDI';

export class PDIRepository extends Repository<PDI> {
    constructor() {
        super(PDI, MysqlDataSource.manager);
    }

    /**
     * Busca um PDI com base no id
     * @param id Id do PDI
     * @returns O PDI encontrado ou undefined
     */
    async findPDIById(id: number): Promise<PDI | undefined> {
        const user = await this.findOne({
            where: { id },
            relations: ['answers']
        });

        return user;
    }
}
