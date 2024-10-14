import { Repository } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { Token } from '../entity/Token';
import { Role } from '../entity/Role';

export class TokenRepository extends Repository<Token> {
  constructor() {
    super(Token, MysqlDataSource.manager);
  }

  /**
   * Cria ou atualiza um token, caso exista um vencido, do usuário
   * @param token Token criado com JWT
   * @param expiresAt Data da expiração do token
   * @param userId Id do usuário
   */
  async saveToken(
    token: string,
    role: Role,
    expiresAt: Date,
    userId: number
  ): Promise<void> {
    await this.save({
      token: token,
      role: role,
      expiresAt: expiresAt,
      userId: userId
    });
  }

  /**
   * Retorna Token de acordo com Id do usuário e permissão pedida
   * @param userId Id do usuário
   * @param role Nível de permissão pedido
   * @returns Token do usuário com nível de permissão pedido
   */
  async findTokenByUserIdAndRole(
    userId: number,
    roleStr: string
  ): Promise<Token | undefined> {
    return this.findOne({
      where: { userId: userId, role: { authType: roleStr } }
    });
  }

  /**
   * Remove token
   * @param token Token a ser removido
   */
  async removeToken(token: Token) {
    this.remove(token);
  }
}
