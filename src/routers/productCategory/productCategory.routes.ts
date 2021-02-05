import { Router } from 'express';
import categoryController from '../../controllers/productCategoryController'
import {authJWT} from '../../middleware';

class CategoryRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        
        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas], categoryController.findAll)
        this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.update)
        this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.delete)
    }

}


const route = new CategoryRouter();
export default route.router