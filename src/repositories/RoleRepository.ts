import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Role } from '../entity/Role';
import { enumRoles } from '../models/enums/EnumRoles';

export class RoleRepository extends Repository<Role> {
    constructor() {
        super(Role, MysqlDataSource.manager);
    }

    /**
     * Retorna um nível de permissão de acordo com seu nome
     * @param name Nome do nível de permissão
     * @returns Role do nível de permissão
     */
    async findRoleByName(name: string): Promise<Role | undefined> {
        const authType: enumRoles = enumRoles[name as keyof enumRoles];
        return this.findOne({ where: { authType: authType } });
    }
}
