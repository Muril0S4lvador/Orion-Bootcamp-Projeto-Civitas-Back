import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

// Class
router.get('/classes-options', new ClassController().getEnumsInfos);

router.get('/schoolYear-options', new ClassController().getEnumSchoolYear);

export default router;
