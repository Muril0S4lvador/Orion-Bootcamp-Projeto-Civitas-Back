import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePDITable1731560096206 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'pdi',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'considerations',
                        type: 'varchar',
                        length: '600',
                        isNullable: true
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'NOW()'
                    },
                    {
                        name: 'studentId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'teacherId',
                        type: 'int',
                        isNullable: false
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'pdi',
            new TableForeignKey({
                columnNames: ['studentId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'student',
                onDelete: 'CASCADE'
            })
        );
        await queryRunner.createForeignKey(
            'pdi',
            new TableForeignKey({
                columnNames: ['teacherId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pdi', 'FK_893f5229110622ed384fa951f17 ');
        await queryRunner.dropForeignKey('pdi', 'FK_6e373dff2510d0ac5b1eb00b64f');
        await queryRunner.dropTable('pdi');
    }
}
