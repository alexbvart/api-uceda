import { Router } from "express";
import coustomerController from "../../controllers/coustomerController";
import { verifyRoleAuth, verifyToken } from "../../middleware/authJWT";

class CoustomerRouter {
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

        this.router.get('/', [verifyToken,verifyRoleAuth(this.middlewareGet)], coustomerController.findAll)
        this.router.get('/:id', [verifyToken,verifyRoleAuth(this.middlewareGet)], coustomerController.findById)
        this.router.post('/', [verifyToken,verifyRoleAuth(this.middlewarePost)], coustomerController.create)
        this.router.put('/:id', [verifyToken,verifyRoleAuth(this.middlewarePost)], coustomerController.update)
        this.router.delete('/:id', [verifyToken,verifyRoleAuth(this.middlewarePost)], coustomerController.delete)
    }

}


const route = new CoustomerRouter();
export default route.router