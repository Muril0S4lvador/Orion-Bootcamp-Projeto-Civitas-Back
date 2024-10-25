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

    if (user) user.roles = user?.roles.map((role: Role) => role.authType);

    return user;
  }
}
