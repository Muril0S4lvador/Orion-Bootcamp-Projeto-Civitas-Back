import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { enumYears } from "../../src/models/enums/EnumYears";
import { enumShifts } from "../../src/models/enums/EnumShifts";
import { enumTeaching } from '../../src/models/enums/EnumTeaching';

export class CreateClassTable1730309097787 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "schoolYearId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "shiftId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "teachingId",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "identifier",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                        isUnique: true,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["schoolYearId"],
                        referencedTableName: "schoolYear",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["shiftId"],
                        referencedTableName: "shift",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",

                    },
                    {
                        columnNames: ["teachingId"],
                        referencedTableName: "teaching",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",

                    },
                ],
            })
        );

        // Definindo a chave estrangeira para associar 'students' com 'classes'
        await queryRunner.createForeignKey(
            "classes",
            new TableForeignKey({
                columnNames: ["id"],
                referencedColumnNames: ["classId"],
                referencedTableName: "students",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Removendo a chave estrangeira e a tabela 'classes'
        await queryRunner.dropForeignKey("classes", "FK_class_students");
        await queryRunner.dropTable("classes");
    }
}
