import { Router } from "express";
import saleController from "../../controllers/saleController";
import { authJWT } from '../../middleware';
class SaleRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {

        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], saleController.findAll)
        this.router.get('/:id', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], saleController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isAdmin], saleController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isAdmin], saleController.update)
        this.router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], saleController.delete)
        this.router.delete('/detalles/:id', saleController.deleteDetails)
    }

}


const route = new SaleRouter();
export default route.router