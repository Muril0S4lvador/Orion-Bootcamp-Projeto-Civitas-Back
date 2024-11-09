import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateStudentClassesTable1730909097787
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student_classes',
        columns: [
          {
            name: 'studentId',
            type: 'int',
            isPrimary: true
          },
          {
            name: 'classId',
            type: 'int',
            isPrimary: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKey(
      'student_classes',
      new TableForeignKey({
        columnNames: ['studentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'student',
        onDelete: 'CASCADE'
      })
    );

    await queryRunner.createForeignKey(
      'student_classes',
      new TableForeignKey({
        columnNames: ['classId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'classes',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_classes');
  }
}
