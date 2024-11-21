import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Teaching } from '../entity/Teaching';

export class TeachingRepository extends Repository<Teaching> {
    constructor() {
        super(Teaching, MysqlDataSource.manager);
    }
    /**
     * Verifica se um registro correspondente ao `id` existe na tabela `teaching`.
     *
     * @param id - O identificador único do nível de ensino
     * @returns Uma Promise que resolve para `true` se o registro existir, ou `false` caso contrário.
     */
    static async findTeachingById(id: number): Promise<boolean> {
        const result = await MysqlDataSource.getRepository(Teaching).findOne({
            where: { id }
        });
        return !!result;
    }
}
