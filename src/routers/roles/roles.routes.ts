import { Router } from 'express'
import rolesController from '../../controllers/rolesController'
import {authJWT} from '../../middleware'

class RoleRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        
        this.router.get('/', rolesController.findAll)
        // this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.findById)
        // this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.create)
        // this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.update)
        // this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.delete)
    }

}


const route = new RoleRouter();
export default route.router