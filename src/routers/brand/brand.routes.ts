import { Router } from 'express';
import brandController from '../../controllers/brandController';
import { verifyRoleAuth, verifyToken } from '../../middleware/authJWT';


class BrandRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    private middlewareGet = ['Ventas', 'Administrador']
    private middlewarePost = ['Administrador']

    /**
     * config
     */
    public config() {

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], brandController.findAll)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], brandController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewarePost)], brandController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], brandController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], brandController.delete)
    }

}


const route = new BrandRouter();
export default route.router