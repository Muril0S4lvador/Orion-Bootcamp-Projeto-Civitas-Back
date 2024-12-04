import { Answer } from '../entity/Answer';
import { PDIAnswer } from '../entity/PDIAnswer';
import { PDIAnswerRepository } from '../repositories/PDIAnswerRepository';
import { enumQuestionType } from '../models/enums/EnumQuestionType';

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
