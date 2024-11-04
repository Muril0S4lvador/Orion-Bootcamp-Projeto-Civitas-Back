import { MigrationInterface, QueryRunner } from "typeorm"

export class TeachingSeeder1730347881899 implements MigrationInterface {

    private table = 'teaching';
    private readonly teachings = [
        {name: "Maternal"},
        {name: "Pré-escola"},
        {name: "Ensino Fundamental 1"}
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.teachings);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.teachings.map((teaching) => teaching.name);
        await queryRunner.manager.createQueryBuilder()
            .delete()
            .from(this.table)
            .where('name IN (:...names)', { names })
            .execute();
    }

}
