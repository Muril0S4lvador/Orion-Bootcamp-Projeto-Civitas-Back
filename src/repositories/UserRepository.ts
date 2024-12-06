import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

export class UserRepository extends Repository<User> {
    constructor() {
        super(User, MysqlDataSource.manager);
    }

    /**
     * Busca um usuário com base no email
     * @param email E-mail do usuário
     * @returns O usuário encontrado ou undefined
     */
    async findUserByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: { email },
            relations: ['roles']
        });

        if (user) {
            user.roles = user?.roles.map((role: Role) => role.authType);
        }

        return user;
    }

    /**
     * Busca um usuário com base no id
     * @param id Id do usuário
     * @returns O usuário encontrado ou undefined
     */
    async findUserById(id: number): Promise<User | undefined> {
        const user = await this.findOne({
            where: { id }
        });

        return user;
    }
    async findUserByRegistration(registration: number): Promise<User | undefined> {
        const user = await this.findOne({
            where: { registration }
        });
        return user;
    }
    /**
     * Gera uma senha aleatória de 12 caracteres
     * @returns A senha gerada
     */
    async generateRandomPassword(): Promise<string | undefined> {
        const length = 12;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
        return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }
}
