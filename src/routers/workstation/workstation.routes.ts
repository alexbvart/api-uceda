import { Router } from "express";
import workstationController from "../../controllers/workstationController";
import { verifyRoleAuth, verifyToken } from "../../middleware/authJWT";

class WorkstationRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    private middlewareGet = ['RR.HH', 'Ventas', 'Administrador']
    private middlewarePost = ['RR.HH', 'Administrador']
    /**
     * config
     */
    public config() {

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], workstationController.findAll)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], workstationController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewarePost)], workstationController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], workstationController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], workstationController.delete)
    }

}


const route = new WorkstationRouter();
export default route.router