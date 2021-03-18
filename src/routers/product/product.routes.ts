import { Router } from 'express';
import productController from '../../controllers/productController';
import { verifyRoleAuth, verifyToken } from '../../middleware/authJWT';


class ProductRouter {
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

        this.router.get('/all', [verifyToken, verifyRoleAuth(this.middlewareGet)], productController.findAll)
        this.router.get('/true', [verifyToken, verifyRoleAuth(this.middlewareGet)], productController.findTrue)
        this.router.get('/bajostock', [verifyToken, verifyRoleAuth(this.middlewareGet)], productController.findBajoStock)
        this.router.get('/false', [verifyToken, verifyRoleAuth(this.middlewareGet)], productController.findFalse)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], productController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewarePost)], productController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], productController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], productController.delete)
    }

}


const route = new ProductRouter();
export default route.router