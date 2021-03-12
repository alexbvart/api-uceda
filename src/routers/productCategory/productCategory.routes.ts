import { Router } from 'express';
import categoryController from '../../controllers/productCategoryController'
import { authJWT } from '../../middleware';

class CategoryRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {

        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], categoryController.findAll)
        this.router.get('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], categoryController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], categoryController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], categoryController.update)
        this.router.delete('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], categoryController.delete)
    }

}


const route = new CategoryRouter();
export default route.router