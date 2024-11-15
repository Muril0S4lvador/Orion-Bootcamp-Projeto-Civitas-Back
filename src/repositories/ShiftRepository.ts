import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
    constructor() {
        super(Shift, MysqlDataSource.manager);
    }
    /**
     * Busca um turno com base no nome
     * @param name Nome do turno
     * @returns O turno encontrado ou undefined
     */
    static async getShiftByName(name: string): Promise<Shift | undefined> {
        return MysqlDataSource.getRepository(Shift).findOne({
            where: { name }
        });
    }
    /**
     * Busca o ID de um turno pelo nome
     * @param nameShift Nome do turno (Manhã, Tarde ou Noite)
     * @returns O ID do turno ou null, caso não encontrado
     * @throws Erro caso a busca pelo ID falhe
     */
    static async findIdByName(nameShift: string): Promise<number | null> {
        try {
            const result = await MysqlDataSource.getRepository(Shift)
                .createQueryBuilder('shift')
                .select('shift.id')
                .where('shift.name = :name', { name: nameShift })
                .getOne();

            return result ? result.id : null;
        } catch (error) {
            console.error('Error finding id by name:', error);
            throw new Error('Failed to find id by name');
        }
    }

    /**
     * Retorna todos os turnos registrados na tabela Shift
     * @returns Uma lista de todos os turnos ou undefined, caso nenhum turno seja encontrado
     */
    async getAllShifts(): Promise<Shift[] | undefined> {
        return this.find();
    }
}
