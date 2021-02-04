import { Router } from 'express';

// * Routes
import productRoute from './product/product.routes';
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
        this.router.get('/',(req, res)=> res.json('Hello inicio'))  
        this.router.use('/productos', productRoute)
        this.router.use('/', authRoute )
    }

}

const route = new Route();
export default route.router