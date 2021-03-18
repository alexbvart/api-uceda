import { Router } from 'express';
import categoryController from '../../controllers/productCategoryController'
import { verifyRoleAuth, verifyToken } from '../../middleware/authJWT';

class CategoryRouter {
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

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], categoryController.findAll)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], categoryController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewarePost)], categoryController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], categoryController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], categoryController.delete)
    }

}


const route = new CategoryRouter();
export default route.router