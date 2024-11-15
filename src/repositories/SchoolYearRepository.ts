import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { SchoolYear } from '../entity/SchoolYear';

export class SchoolYearRepository extends Repository<SchoolYear> {
    constructor() {
        super(SchoolYear, MysqlDataSource.manager);
    }
    /**
     * Busca um ano escolar com base no nome
     * @param name Nome do ano escolar
     * @returns O ano escolar encontrado ou undefined
     */
    static async getSchoolYearByName(name: string): Promise<SchoolYear | undefined> {
        return MysqlDataSource.getRepository(SchoolYear).findOne({
            where: { name }
        });
    }
    /**
     * Retorna todos os anos escolares registrados na tabela SchoolYear
     * @returns Uma lista de todos os anos escolares
     */
    async getAllSchoolYears(): Promise<SchoolYear[]> {
        return this.find();
    }
    /**
     * Busca o ID de um ano escolar com base no nome
     * @param nameYear Nome do ano escolar (exemplo: 1º ano)
     * @returns O ID do ano escolar ou null, caso não encontrado
     * @throws Erro caso a busca pelo ID falhe
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
