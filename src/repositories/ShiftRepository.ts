import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Shift } from '../entity/Shift';

export class ShiftRepository extends Repository<Shift> {
    constructor() {
        super(Shift, MysqlDataSource.manager);
    }
    /**
     * Verifica se um registro correspondente ao `id` existe na tabela `shift`.
     *
     * @param id - O identificador único do turno
     * @returns Uma Promise que resolve para `true` se o registro existir, ou `false` caso contrário.
     */
    static async findShiftById(id: number): Promise<boolean> {
        const result = await MysqlDataSource.getRepository(Shift).findOne({
            where: { id }
        });
        return !!result;
    }
    /**
     * Retorna todos os turnos registrados na tabela Shift
     * @returns Uma lista de todos os turnos ou undefined, caso nenhum turno seja encontrado
     */
    async getAllShifts(): Promise<Shift[] | undefined> {
        return this.find();
    }
}
