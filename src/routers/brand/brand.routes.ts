import { Router } from 'express';
import brandController from '../../controllers/brandController';
import { authJWT } from '../../middleware';

class BrandRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {

        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], brandController.findAll)
        this.router.get('/:id', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], brandController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isAdmin], brandController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isAdmin], brandController.update)
        this.router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], brandController.delete)
    }

}


const route = new BrandRouter();
export default route.router