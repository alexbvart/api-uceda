import { Response, Request } from 'express'
import Brand from '../models/Brand'

class BrandController {

    /**
    * findAll
    */
    public async findAll(req: Request, res: Response) {
        try {
            const brand = await Brand.find()
            res.status(200).json(brand)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }

    }

    /**
     * create
     */
    public async create(req: Request, res: Response) {
        try {
            const { name } = req.body
            const newBrand = new Brand({ name })
            const savedBrand = await newBrand.save()
            res.status(201).json({ message: "created" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }



    /**
     * findById
     */
    public async findById(req: Request, res: Response) {
        try {
            const brand = await Brand.findById(req.params.id)
            res.status(200).json(brand)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }


    /**
     * update
     */
    public async update(req: Request, res: Response) {

        try {
            const updateBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            res.status(204).json(updateBrand)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    /**
     * delete
     */
    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await Brand.findByIdAndDelete(id)
            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Error of server"}) 
        }
    }
}

const brandController = new BrandController()
export default brandController