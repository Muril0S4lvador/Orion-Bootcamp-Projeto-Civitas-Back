import { QueryRunner } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { PDI } from '../entity/PDI';
import { PDIAnswer } from '../entity/PDIAnswer';
import { createPDIAnswerService } from './CreatePDIAnswerService';

export async function PDITransactionService(pdi: PDI, answers: Partial<PDIAnswer>[]) {
    const queryRunner: QueryRunner = MysqlDataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
        const pdiRepository = queryRunner.manager.getRepository(PDI);
        const savedPDI = await pdiRepository.save(pdi);

        const createdAnswers: PDIAnswer[] = createPDIAnswerService(savedPDI, answers);

        const pdiAnswerRepository = queryRunner.manager.getRepository(PDIAnswer);
        const savedAnswers = await pdiAnswerRepository.save(createdAnswers);

        await queryRunner.commitTransaction();

        return { pdi: savedPDI, answers: savedAnswers };
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
}
