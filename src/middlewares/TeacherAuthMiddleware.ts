import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RouteResponse } from '../helpers/RouteResponse';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from '../repositories/UserRepository';
import { DecodedToken } from '../models/interfaces/DecodedToken';
import { Token } from '../entity/Token';
import { User } from '../entity/User';
import { enumRoles } from '../models/enums/EnumRoles';

export async function TeacherAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const userRepository: UserRepository = new UserRepository();
    const tokenRepository: TokenRepository = new TokenRepository();
    if (!req.headers.authorization || !req.headers.authorization.includes('Bearer')) {
        return RouteResponse.error(res, 'Token inválido ou ausente');
    }

    const token: string = req.headers.authorization.replace('Bearer ', '');
    let decoded: DecodedToken | null = null;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const tokenFound: Token = await tokenRepository.findToken(token);
        if (!decoded || !decoded.email || !tokenFound) {
            throw new Error();
        }
    } catch (error) {
        return RouteResponse.error(res, 'Token inválido ou ausente');
    }

    const existingUser: User | undefined = await userRepository.findUserByEmail(decoded.email);

    if (!existingUser) {
        return RouteResponse.error(res, 'Usuário não encontrado');
    }

    if (!existingUser.roles.some(role => role == enumRoles.TEACHER)) {
        return RouteResponse.unauthorizedError(res);
    }

    req.headers.email = decoded.email;

    next();
}
