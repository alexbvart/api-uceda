import { Router } from 'express';
import productController from '../../controllers/productController';
import {authJWT} from '../../middleware';

class ProductRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        
        this.router.get('/all', [authJWT.verifyToken, authJWT.isVentas], productController.findAll)
        this.router.get('/true', [authJWT.verifyToken, authJWT.isVentas], productController.findTrue)
        this.router.get('/bajostock', [authJWT.verifyToken, authJWT.isVentas], productController.findBajoStock)
        this.router.get('/false', [authJWT.verifyToken, authJWT.isVentas], productController.findFalse)
        this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],productController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,productController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas] ,productController.update)
        this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],productController.delete)
    }

}


const route = new ProductRouter();
export default route.router