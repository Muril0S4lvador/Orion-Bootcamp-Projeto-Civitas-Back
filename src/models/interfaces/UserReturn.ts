import { enumRoles } from '../enums/EnumRoles';

export interface UserReturn {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    roles: enumRoles[];
}
