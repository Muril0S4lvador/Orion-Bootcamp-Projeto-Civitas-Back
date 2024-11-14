import { enumAnswers } from 'models/enums/EnumAnswers';

export interface PDICreateRequestBody {
    studentId: number;
    answersEmotionalInteligence: enumAnswers[];
    answersAcademicDevelopment: enumAnswers[];
    answersResponsability: enumAnswers[];
    considerations: string;
}
