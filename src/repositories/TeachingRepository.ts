import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Teaching } from '../entity/Teaching';

export class TeachingRepository extends Repository<Teaching> {
    constructor() {
        super(Teaching, MysqlDataSource.manager);
    }
    static async getTeachingByName(name: string): Promise<Teaching | undefined> {
        return MysqlDataSource.getRepository(Teaching).findOne({
            where: { name }
        });
    }
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
     * @returns Todos os turnos da tabela Teaching
     */
    async getAllTeachings(): Promise<Teaching[] | undefined> {
        return this.find();
    }
}
