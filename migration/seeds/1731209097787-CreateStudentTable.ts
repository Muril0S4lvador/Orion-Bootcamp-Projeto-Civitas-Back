import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateStudentTable1731209097787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'registration',
            type: 'int',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar',
            length: '11',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'classId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'student',
      new TableForeignKey({
        columnNames: ['classId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'class',
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('student');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('classId') !== -1);
    await queryRunner.dropForeignKey('student', foreignKey);
    await queryRunner.dropTable('student');
  }
}