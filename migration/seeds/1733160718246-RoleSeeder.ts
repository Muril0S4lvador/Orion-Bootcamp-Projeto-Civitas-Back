import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleSeeder1733160718246 implements MigrationInterface {
    private table = 'role';
    private readonly roles = [
        {
            authType: 'ADMIN',
            description: 'Role de administrador'
        },
        {
            authType: 'TEACHER',
            description: 'Role de professor'
        },
        {
            authType: 'GUARDIAN',
            description: 'Role de responsável'
        }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.roles);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const authTypes = this.roles.map(role => role.authType);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('authType IN (:...authTypes)', { authTypes }).execute();
    }
}
