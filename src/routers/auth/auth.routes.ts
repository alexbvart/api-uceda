import { Router } from 'express';
import authController from '../../controllers/authController';
import { authJWT } from '../../middleware';

class AuthRouter {

    public router: Router = Router()
    constructor() {
        this.config()
    }

    public config() {

        this.router.post('/signin', authController.singIn)
        this.router.post('/signup', authController.signUp)
        this.router.get('/user/all', [authJWT.verifyToken, authJWT.isRRHH || authJWT.isAdmin], authController.all)
        this.router.get('/user/:id', [authJWT.verifyToken, authJWT.isRRHH || authJWT.isAdmin], authController.findID)
        this.router.put('/user/false/:id', [authJWT.verifyToken, authJWT.isRRHH || authJWT.isAdmin], authController.falseUser)
        this.router.put('/user/true/:id', [authJWT.verifyToken, authJWT.isRRHH || authJWT.isAdmin], authController.trueUser)
    }
}
const route = new AuthRouter();
export default route.router