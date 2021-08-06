import { Router } from 'express';

// * Routes
import productRoute from './product/product.routes';
import brandRoute from './brand/brand.routes';
import categoryRoute from './productCategory/productCategory.routes';
import authRoute from './auth/auth.routes';
import roleRoute from "./roles/roles.routes";
import saleRoutes from './sale/sale.routes';
import employeeRoutes from './employee/employee.routes';
import workstationRoutes from './workstation/workstation.routes';
import coustomerRoutes from './coustomer/coustomer.routes';
import uploadRoutes from './uploads/upload.routes';
import uploadController from '../controllers/uploadController';


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
        this.router.use('/rol', roleRoute)
        this.router.use('/venta',saleRoutes)
        this.router.use('/empleado', employeeRoutes)
        this.router.use('/puesto', workstationRoutes)
        this.router.use('/cliente', coustomerRoutes)
        this.router.use('/uploads', uploadRoutes)
        this.router.use('/data', uploadController.listData)
        // this.router.get('/document', uploadController.getDocument)
    }
}

const route = new Route();
export default route.router