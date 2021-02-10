import { Router} from "express";
import employeeController from "../../controllers/employeeController";
import {authJWT} from '../../middleware';
class EmployeeRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        
        this.router.get('/', [authJWT.verifyToken, authJWT.isVentas], employeeController.findAll)
        this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],employeeController.findById)
        this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,employeeController.create)
        this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas], employeeController.update)
        this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],employeeController.delete)
    }

}


const route = new EmployeeRouter();
export default route.router