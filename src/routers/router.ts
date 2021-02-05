import { Router } from 'express';

// * Routes
import productRoute from './product/product.routes';
import brandRoute from './brand/brand.routes';
import categoryRoute from './productCategory/productCategory.routes';
import authRoute from './auth/auth.routes';
class Route{

    public router: Router = Router()

    constructor() {
        this.config()
    }
 
    /**
     * config
     */
    public config() {  
        this.router.use('/productos', productRoute)
        this.router.use('/', authRoute )
        this.router.use('/marca', brandRoute)
        this.router.use('/categoria', categoryRoute)
    }
}

const route = new Route();
export default route.router