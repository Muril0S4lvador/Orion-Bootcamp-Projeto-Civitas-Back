export interface PDICreateRequestBody {
    studentId: number;
    answersEmotionalInteligenceId: number[];
    answersAcademicDevelopmentId: number[];
    answersResponsabilityId: number[];
    considerations: string;
}
