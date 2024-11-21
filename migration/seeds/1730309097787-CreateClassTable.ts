import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassTable1730309097787 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'classes',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'schoolYear',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'shift',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'teaching',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'identifier',
                        type: 'varchar',
                        length: '20',
                        isNullable: false,
                        isUnique: true
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ['schoolYear'],
                        referencedTableName: 'schoolYear',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: ['shift'],
                        referencedTableName: 'shift',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    },
                    {
                        columnNames: ['teaching'],
                        referencedTableName: 'teaching',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('classes');
    }
}
