import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { SchoolYear } from '../entity/SchoolYear';

export class SchoolYearRepository extends Repository<SchoolYear> {
    constructor() {
        super(SchoolYear, MysqlDataSource.manager);
    }
    /**
     * Verifica se um registro correspondente ao `id` existe na tabela `schoolYear`.
     *
     * @param id - O identificador único do ano escolar
     * @returns Uma Promise que resolve para `true` se o registro existir, ou `false` caso contrário.
     */
    static async findYearById(id: number): Promise<boolean> {
        const result = await MysqlDataSource.getRepository(SchoolYear).findOne({
            where: { id }
        });
        return !!result;
    }
    /**
     * Retorna todos os anos escolares registrados na tabela SchoolYear
     * @returns Uma lista de todos os anos escolares
     */
    async getAllSchoolYears(): Promise<SchoolYear[]> {
        return this.find();
    }
}
