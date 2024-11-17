import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleSeeder1731026893635 implements MigrationInterface {
    private readonly table = 'role';
    private readonly roles = [
        { autenticacao: 'ADMIN', description: 'Administrador do sistema' },
        { autenticacao: 'TEACHER', description: 'Professor' },
        { autenticacao: 'GUARDIAN', description: 'Responsável pelo estudante' }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.roles);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const autenticacoes = this.roles.map(role => role.autenticacao);
        await queryRunner.manager
            .createQueryBuilder()
            .delete()
            .from(this.table)
            .where('autenticacao IN (:...autenticacoes)', { autenticacoes })
            .execute();
    }
}
