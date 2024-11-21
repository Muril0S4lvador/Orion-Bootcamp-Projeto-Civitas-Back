import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudentTable1730709097787 implements MigrationInterface {
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
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false
                    },
                    {
                        name: 'registration',
                        type: 'int',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        length: '11',
                        isUnique: false,
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        isUnique: true,
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
        await queryRunner.dropTable('student');
    }
}
