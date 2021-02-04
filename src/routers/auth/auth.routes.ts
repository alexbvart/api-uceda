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
    }
}
const route = new AuthRouter();
export default route.router