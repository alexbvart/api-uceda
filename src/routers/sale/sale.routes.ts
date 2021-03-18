import { Router } from "express";
import saleController from "../../controllers/saleController";
import { verifyRoleAuth, verifyToken } from "../../middleware/authJWT";

class SaleRouter {
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

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], saleController.findAll)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], saleController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], saleController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], saleController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], saleController.delete)
        this.router.delete('/detalles/:id', saleController.deleteDetails)
    }

}


const route = new SaleRouter();
export default route.router