import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RouteResponse } from '../helpers/RouteResponse';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from '../repositories/UserRepository';
import { LoginRequestBody } from '../models/interfaces/LoginRequestBody';
import { DecodedToken } from '../models/interfaces/DecodedToken';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

export class AuthController {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: Autenticação do Usuário
   *     tags: [Login]
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     requestBody:
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            required:
   *              - email
   *              - password
   *            properties:
   *              email:
   *                type: string
   *                example: "usuario@email.com"
   *              password:
   *                type: string
   *                example: "senha"
   *     responses:
   *       '200':
   *         description: Requisição executada com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   description: Status da requisição
   *                   example: "true"
   *                 data:
   *                   type: string
   *                   description: Token JWT de autenticação
   *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   *       '500':
   *         description: Dados incorretos ou ausentes
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   *       '404':
   *         description: Dados do usuário incorretos
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Nome de usuário ou senha incorretos"
   */
  async login(request: Request, response: Response) {
    const { email, password }: LoginRequestBody = request.body;
    const tokenRepository: TokenRepository = new TokenRepository();
    const userRepository: UserRepository = new UserRepository();

    if (!email || !password) {
      return RouteResponse.error(
        response,
        'email ou senha do usuário ausentes'
      );
    }

    const existingUser: User | undefined = await userRepository.findUserByEmail(
      email
    );

    if (!existingUser) {
      return RouteResponse.notFound(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const validPassword: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!validPassword) {
      return RouteResponse.error(
        response,
        'Nome de usuário ou senha incorretos'
      );
    }

    const token: string = jwt.sign(
      { email: email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h'
      }
    );

    const decoded: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const expiresAt: Date = new Date(decoded.exp * 1000);

    tokenRepository.save({ token, expiresAt, userId: existingUser.id });

    return RouteResponse.sucess(response, token);
  }

  /**
   * @swagger
   * /me:
   *   get:
   *     summary: Retorna as informações de um usuário de acordo com o token
   *     tags: [auth]
   *     produces:
   *       - application/json
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       '200':
   *          description: Requisição executada com sucesso
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  success:
   *                    type: boolean
   *                    example: 'true'
   *                  data:
   *                    type: object
   *                    properties:
   *                      id:
   *                        type: number
   *                        example: 1
   *                      name:
   *                        type: string
   *                        example: 'usuario'
   *                      email:
   *                        type: string
   *                        example: 'usuario@email.com'
   *                      createdAt:
   *                        type: string
   *                        example: '2024-10-21T11:04:32.000Z'
   *                      updatedAt:
   *                        type: string
   *                        example: '2024-10-21T11:04:32.000Z'
   *                      roles:
   *                        type: array
   *                        items:
   *                          type: string
   *                          example: ['ADMIN', 'TEACHER']
   *       '404':
   *         description: Token válido, mas usuário não encontrado
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Usuário não encontrado"
   *       '400':
   *         description: Token ausente ou inválido
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Token inválido ou ausente"
   */
  async returnUserInfo(req: Request, res: Response) {
    const userRepository: UserRepository = new UserRepository();
    const tokenRepository: TokenRepository = new TokenRepository();
    if (
      !req.headers.authorization ||
      !req.headers.authorization.includes('Bearer')
    ) {
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

    const existingUser: User | undefined = await userRepository.findUserByEmail(
      decoded.email
    );

    if (!existingUser) {
      return RouteResponse.notFound(res, 'Usuário não encontrado');
    }

    delete existingUser.password;

    return RouteResponse.sucess(res, existingUser);
  }
}
