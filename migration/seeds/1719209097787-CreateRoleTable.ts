import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { enumRoles } from '../../src/models/enums/EnumRoles';

export class CreateRoleTable1719209097787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'autenticacao',
            type: 'enum',
            enum: Object.values(enumRoles) as string[],
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela `role`
    await queryRunner.dropTable('role');
  }
}
