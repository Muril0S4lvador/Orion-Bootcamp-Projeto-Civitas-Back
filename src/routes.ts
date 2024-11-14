import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { PDIController } from './controller/PDIController';
import { PDICreateMiddleware } from './middlewares/PDICreateMiddleware';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

// Class
router.get('/classes-options', new ClassController().getEnumsInfos);

// PDI
router.post('/create-pdi', PDICreateMiddleware, new PDIController().createPDI);

export default router;
