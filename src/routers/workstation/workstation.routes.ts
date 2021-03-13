import { Router } from "express";
import workstationController from "../../controllers/workstationController";
import { authJWT } from '../../middleware';
class WorkstationRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {

        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], workstationController.findAll)
        this.router.get('/:id', [authJWT.verifyToken, authJWT.isVentas || authJWT.isAdmin], workstationController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isAdmin], workstationController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isAdmin], workstationController.update)
        this.router.delete('/:id', [authJWT.verifyToken, authJWT.isAdmin], workstationController.delete)
    }

}


const route = new WorkstationRouter();
export default route.router