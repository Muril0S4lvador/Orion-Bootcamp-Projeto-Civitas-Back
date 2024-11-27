import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnswerSeeder1731873454489 implements MigrationInterface {
    private table = 'answer';
    private readonly answers = [
        { answerType: 'Excepcional', points: 5 },
        { answerType: 'Acima das expectativas', points: 4 },
        { answerType: 'Adequado', points: 3 },
        { answerType: 'Abaixo das expectativas', points: 2 },
        { answerType: 'Precisa de melhorias', points: 1 },
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.answers);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.answers.map(answer => answer.answerType);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('name IN (:...names)', { names }).execute();
    }
}
