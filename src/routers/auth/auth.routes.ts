import { Router } from 'express';
import authController from '../../controllers/authController';

class AuthRouter {

    public router: Router = Router()
    constructor() {
        this.config()
    }

    public config() {

        this.router.post('/signin', authController.singIn)
        this.router.post('/signup', authController.signUp)
        this.router.get('/user/all', authController.all)
        this.router.get('/user/:id', authController.findID)
        this.router.put('/user/false/:id', authController.falseUser)
        this.router.put('/user/true/:id', authController.trueUser)
    }
}
const route = new AuthRouter();
export default route.router