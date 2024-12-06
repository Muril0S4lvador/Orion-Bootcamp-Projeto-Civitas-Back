import { Answer } from '../entity/Answer';
import { PDIAnswer } from '../entity/PDIAnswer';
import { PDIAnswerRepository } from '../repositories/PDIAnswerRepository';
import { enumQuestionType } from '../models/enums/EnumQuestionType';

/**
 * Aplica para todas as respostas um índice e um tipo de questão
 * @param answersId Id das respostas
 * @param possibleAnswers Todas as respostas possíveis do banco de dados
 * @param questionType Tipo da pergunta
 * @returns Um vetor com as respostas do banco de dados, tipo da questão e seu índice
 */
export function applyTypeIndexToAnswersService(answersId: number[], possibleAnswers: Answer[], questionType: enumQuestionType): Partial<PDIAnswer>[] {
    const pdiAnswerRepository: PDIAnswerRepository = new PDIAnswerRepository();

    return answersId.map((answerId, index) => {
        const answer = possibleAnswers.find(answer => answer.id === answerId);
        return pdiAnswerRepository.create({
            answerRelation: answer,
            index: index,
            questionType: questionType
        });
    });
}
