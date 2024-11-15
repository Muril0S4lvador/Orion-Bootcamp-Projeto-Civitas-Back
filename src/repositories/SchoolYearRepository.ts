import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { SchoolYear } from '../entity/SchoolYear';

export class SchoolYearRepository extends Repository<SchoolYear> {
    constructor() {
        super(SchoolYear, MysqlDataSource.manager);
    }

    /**
     * @returns Todos os anos escolares da tabela SchoolYear
     */
    static async getSchoolYearByName(name: string): Promise<SchoolYear | undefined> {
        return MysqlDataSource.getRepository(SchoolYear).findOne({
            where: { name }
        });
    }
    async getAllSchoolYears(): Promise<SchoolYear[]> {
        return this.find();
    }
    /**
     * @param nameYear O nome do ano escolar para buscar.
     * @returns O ano escolar com o nome fornecido, ou null se não encontrado.
     */
    static async findIdByName(nameYear: string): Promise<number | null> {
        try {
            const result = await MysqlDataSource.getRepository(SchoolYear)
                .createQueryBuilder('schoolYear')
                .select('schoolYear.id')
                .where('schoolYear.name = :name', { name: nameYear })
                .getOne();

            return result ? result.id : null;
        } catch (error) {
            console.error('Error finding id by name:', error);
            throw new Error('Failed to find id by name');
        }
    }
}
