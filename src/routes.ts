import { Router } from 'express';
import { validationResult } from 'express-validator';
import { HomeController } from './controller/HomeController';
import { AuthController } from './controller/AuthController';
import { ClassController } from './controller/ClassController';
import { PDIController } from './controller/PDIController';
import { validatePDIData } from 'validators/PDIValidator';

const router = Router();

router.get('/', new HomeController().hello);

// Auth
router.post('/login', new AuthController().login);

router.get('/me', new AuthController().returnUserInfo);

// Class
router.get('/classes-options', new ClassController().getEnumsInfos);

// PDI
router.post(
    '/create-pdi',
    validatePDIData(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    new PDIController().createPDI
);

export default router;
