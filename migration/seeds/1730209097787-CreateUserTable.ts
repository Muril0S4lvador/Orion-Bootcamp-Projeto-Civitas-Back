import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserTable1730209097787 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "NOW()",
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "NOW()",
                    },
                ],
            }),
            true
        );
        
        // Chave estrangeira para a relação `OneToMany` entre `user` e `token`
        await queryRunner.createForeignKey(
            "token",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover chave estrangeira `token.userId`
        await queryRunner.dropForeignKey("token", "FK_token_user");

        // Remover chaves estrangeiras `role_user`
        await queryRunner.dropForeignKey("role_user", "FK_role_user_user");
        await queryRunner.dropForeignKey("role_user", "FK_role_user_role");

        // Remover tabelas `role_user` e `user`
        await queryRunner.dropTable("role_user");
        await queryRunner.dropTable("user");
    }
}
