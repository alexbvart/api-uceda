import { Router } from "express";
import uploadController from "../../controllers/uploadController";
import upload from '../../libs/multer';
class UploadRouter {

    public router: Router = Router()


    constructor() {
        this.config()
    }

    /**
     * config
     */
    public config() {
        this.router.post('/', upload.single('file'), uploadController.create)
        this.router.get('/', uploadController.findAll)
        this.router.get('/:id', uploadController.findById)
        this.router.delete('/:id', uploadController.delete)
       
        
    }
}

const route = new UploadRouter()
export default route.router