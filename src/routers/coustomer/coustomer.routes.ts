import { Router } from "express";
import coustomerController from "../../controllers/coustomerController";
import { authJWT } from '../../middleware';
class CoustomerRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {

        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], coustomerController.findAll)
        this.router.get('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], coustomerController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], coustomerController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], coustomerController.update)
        this.router.delete('/:id', [authJWT.verifyToken, authJWT.isVentas, authJWT.isAdmin], coustomerController.delete)
    }

}


const route = new CoustomerRouter();
export default route.router