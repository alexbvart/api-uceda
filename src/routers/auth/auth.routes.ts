import { Router } from 'express';
import authController from '../../controllers/authController';
import { verifyRoleAuth, verifyToken } from '../../middleware/authJWT';


class AuthRouter {

    public router: Router = Router()
    constructor() {
        this.config()
    }
    private middlewareGet = ['RR.HH', 'Administrador']
    private middlewarePost = ['Administrador']

    public config() {

        this.router.post('/signin', authController.singIn)
        this.router.post('/signup', authController.signUp)
        this.router.post('/logout', authController.logout)
        this.router.get('/user/all', [verifyToken, verifyRoleAuth(this.middlewareGet)], authController.all)
        this.router.get('/user/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], authController.findID)
        this.router.put('/user/false/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], authController.falseUser)
        this.router.put('/user/true/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], authController.trueUser)
    }
}
const route = new AuthRouter();
export default route.router