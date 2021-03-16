import { Router } from "express";
import employeeController from "../../controllers/employeeController";
import { verifyRoleAuth, verifyToken } from "../../middleware/authJWT";

class EmployeeRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }
    private middlewareGet = ['RR.HH', 'Administrador']
    private middlewarePost = ['RR.HH', 'Admistrador']
    /**
     * config
     */
    public config() {

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], employeeController.findAll)
        this.router.get('/:id', [verifyToken, verifyRoleAuth(this.middlewareGet)], employeeController.findById)
        this.router.post('/', [verifyToken, verifyRoleAuth(this.middlewarePost)], employeeController.create)
        this.router.put('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], employeeController.update)
        this.router.delete('/:id', [verifyToken, verifyRoleAuth(this.middlewarePost)], employeeController.delete)
    }

}


const route = new EmployeeRouter();
export default route.router