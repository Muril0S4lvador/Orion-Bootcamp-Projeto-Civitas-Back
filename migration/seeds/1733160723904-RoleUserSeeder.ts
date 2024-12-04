import { MigrationInterface, QueryRunner } from "typeorm"

export class RoleUserSeeder1733160723904 implements MigrationInterface {
    private table = 'role_user';
    private readonly role_users = [
        {
            userId: '1',
            roleId: '1'
        },
        {
            userId: '2',
            roleId: '2'
        },
        {
            userId: '3',
            roleId: '3'
        }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.role_users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const roleIds = this.role_users.map(roleUser => roleUser.roleId);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('roleId IN (:...roleIds)', { roleIds }).execute();
    }
}
