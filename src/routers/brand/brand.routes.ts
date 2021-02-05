import { Router } from 'express';
import brandController from '../../controllers/brandController';
import {authJWT} from '../../middleware';

class BrandRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        
        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas], brandController.findAll)
        this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],brandController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,brandController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas] ,brandController.update)
        this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],brandController.delete)
    }

}


const route = new BrandRouter();
export default route.router