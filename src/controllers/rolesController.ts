import { Request, Response } from 'express';
import Role from '../models/Role';

class RolesController {

    /**
     * findAll
     */
    public async findAll(req: Request, res: Response) {
        const products = await Role.find()
        res.status(200).json(products)
    }

    /**
     * create
     */
    // public async create(req: Request, res: Response) {
    //     const { name, description, price, stock, status, id_category, id_brand } = req.body
    //     const newProduct = new Product({ name, description, price, stock, status, id_category, id_brand })
    //     const productSaved = await newProduct.save()
    //     console.log(productSaved);

    //     res.status(201).json({ message: "created" })

    // }



    /**
     * findById
     */
    public async findById(req: Request, res: Response) {
        const product = await Role.findById(req.params.id)
        res.status(200).json(product)
    }


    /**
     * update
     */
    // public async update(req: Request, res: Response) {

    //     const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
    //         new: true
    //     });
    //     res.status(204).json(productUpdate)
    // }

    /**
     * delete
     */
    // public async delete(req: Request, res: Response) {
    //     const { id } = req.params;
    //     await Product.findByIdAndDelete(id)
    //     res.status(200).json({message : "Deleted"})
    // }

}

const rolesController = new RolesController();
export default rolesController