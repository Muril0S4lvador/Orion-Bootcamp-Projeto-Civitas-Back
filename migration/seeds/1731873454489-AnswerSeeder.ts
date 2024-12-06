import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnswerSeeder1731873454489 implements MigrationInterface {
    private table = 'answer';
    private readonly answers = [
        { answer: 'Excepcional', points: 5 },
        { answer: 'Acima das expectativas', points: 4 },
        { answer: 'Adequado', points: 3 },
        { answer: 'Abaixo das expectativas', points: 2 },
        { answer: 'Precisa de melhorias', points: 1 }
    ];

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.insert(this.table, this.answers);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const names = this.answers.map(answer => answer.answer);
        await queryRunner.manager.createQueryBuilder().delete().from(this.table).where('name IN (:...names)', { names }).execute();
    }
}
