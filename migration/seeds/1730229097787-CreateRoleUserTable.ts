import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRoleUserTable719209097787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role_user',
        columns: [
          {
            name: 'userId',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'roleId',
            type: 'int',
            isPrimary: true
          }
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          },
          {
            columnNames: ['roleId'],
            referencedTableName: 'role',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE'
          }
        ]
      }),
      true
    );
  }
}
