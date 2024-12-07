import { QueryRunner } from 'typeorm';
import { MysqlDataSource } from '../config/database';
import { PDI } from '../entity/PDI';
import { PDIAnswer } from '../entity/PDIAnswer';
import { createPDIAnswerService } from './CreatePDIAnswerService';
import { PDITransactionResult } from '../models/interfaces/PDITransactionResult';

/**
 * Faz uma transação em conjunto para salvar o PDI e suas respostas no banco de dados simultaneamente
 * @param pdi PDI a ser adicionado ao banco de dados
 * @param answers Respostas do PDI
 * @returns Objeto com as informações do PDI salvo (atributo 'pdi') e suas respostas (atributo 'answers')
 */
export async function PDITransactionService(pdi: PDI, answers: Partial<PDIAnswer>[]): Promise<PDITransactionResult> {
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
