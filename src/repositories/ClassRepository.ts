import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Class } from '../entity/Class';

export class ClassRepository extends Repository<Class> {
    constructor() {
        super(Class, MysqlDataSource.manager);
    }
    /**
     * Busca uma turma com base no identificador
     * @param identifier Identificador da turma
     * @returns A turma encontrada ou undefined
     */
    async findClassByIdentifier(identifier: string): Promise<Class | undefined> {
        const schoolClass = await MysqlDataSource.getRepository(Class).findOne({
            where: { identifier }
        });

        return schoolClass;
    }
    /**
     * Busca uma turma com base no id
     * @param id o array de ids das turmas no banco
     * @returns As turmas encontradas e/ou undefined
     */
    async findClassesByIds(ids: number[]): Promise<(Class | null)[]> {
        const repository = MysqlDataSource.getRepository(Class);
        const result = await Promise.all(
            ids.map(async id => {
                const schoolClass = await repository.findOne({ where: { id } });
                return schoolClass || null;
            })
        );
        return result;
    }
    async findAllClasses(): Promise<Class[]> {
        return await MysqlDataSource.getRepository(Class).find();
    }
}
