import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Class } from '../entity/Class';

export class ClassRepository extends Repository<Class> {
    constructor() {
        super(Class, MysqlDataSource.manager);
    }

    /**
     * Salva um novo registro de turma no banco de dados
     * @param schoolClass O objeto de turma que será salvo
     * @returns A turma salva, incluindo qualquer modificação realizada durante o processo de salvamento
     */
    async saveClass(schoolClass: Class): Promise<Class> {
        return await this.manager.save(schoolClass);
    }

    /**
     * Busca uma turma com base no identificador
     * @param identifier Identificador da turma
     * @returns A turma encontrada ou undefined
     */
    async findClassByIdentifier(identifier: string): Promise<Class | undefined> {
        try {
            const schoolClass = await MysqlDataSource.getRepository(Class).findOne({
                where: { identifier }
            });

            return schoolClass;
        } catch (error) {
            console.error('Error finding class by identifier:', error);
            throw new Error('Failed to find class by identifier');
        }
    }
}
