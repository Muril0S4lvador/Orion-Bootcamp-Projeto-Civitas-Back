import { Router } from 'express';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { validateClassData } from './validators/ClassValidator';
import { validationResult } from 'express-validator';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

router.post(
  '/classes',
  validateClassData(), // Note os parênteses aqui - a função retorna um array de validadores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  ClassController.createClass // Note que mudamos para createClass, não create
);

// Class
router.get('/classes-options', new ClassController().getEnumsInfos);

export default router;
