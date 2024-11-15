import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Teaching } from '../entity/Teaching';

export class TeachingRepository extends Repository<Teaching> {
    constructor() {
        super(Teaching, MysqlDataSource.manager);
    }
    /**
     * Busca um registro de ensino com base no nome
     * @param name Nome do ensino
     * @returns O registro de ensino encontrado ou undefined
     */
    static async getTeachingByName(name: string): Promise<Teaching | undefined> {
        return MysqlDataSource.getRepository(Teaching).findOne({
            where: { name }
        });
    }
    /**
     * Busca o ID de um registro de ensino pelo nome
     * @param nameTeaching Nome do ensino
     * @returns O ID do ensino ou null, caso não encontrado
     * @throws Erro caso a busca pelo ID falhe
     */
    static async findIdByName(nameTeaching: string): Promise<number | null> {
        try {
            const result = await MysqlDataSource.getRepository(Teaching)
                .createQueryBuilder('teaching')
                .select('teaching.id')
                .where('teaching.name = :name', { name: nameTeaching })
                .getOne();

            return result ? result.id : null;
        } catch (error) {
            console.error('Error finding id by name:', error);
            throw new Error('Failed to find id by name');
        }
    }

    /**
     * Retorna todos os registros de ensino da tabela Teaching
     * @returns Uma lista de todos os registros de ensino ou undefined, caso nenhum seja encontrado
     */
    async getAllTeachings(): Promise<Teaching[] | undefined> {
        return this.find();
    }
}
