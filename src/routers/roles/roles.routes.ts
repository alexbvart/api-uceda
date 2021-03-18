import { Router } from 'express'
import rolesController from '../../controllers/rolesController'
import { verifyRoleAuth, verifyToken } from '../../middleware/authJWT'


class RoleRouter {
    public router: Router = Router()

    constructor() {
        this.config()
    }

    private middlewareGet = ['RR.HH', 'Administrador']
    private middlewarePost = ['Administrador']

    /**
     * config
     */
    public config() {

        this.router.get('/', [verifyToken, verifyRoleAuth(this.middlewareGet)], rolesController.findAll)
        // this.router.get('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.findById)
        // this.router.post('/', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.create)
        // this.router.put('/:id', [authJWT.verifyToken, authJWT.isVentas] ,categoryController.update)
        // this.router.delete('/:id',[authJWT.verifyToken, authJWT.isVentas],categoryController.delete)
    }

}


const route = new RoleRouter();
export default route.router