import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController {

    /**
     * findAll
     */
    public async findAll(req: Request, res: Response) {
        const products = await Product.find()
        res.status(200).json(products)
    }

    /**
     * create
     */
    public async create(req: Request, res: Response) {
        const { name, description, price, stock, status, id_category, id_brand } = req.body
        const newProduct = new Product({ name, description, price, stock, status, id_category, id_brand })
        const productSaved = await newProduct.save()
        console.log(productSaved);

        res.status(201).json({ message: "created" })

    }



    /**
     * findById
     */
    public async findById(req: Request, res: Response) {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }


    /**
     * update
     */
    public async update(req: Request, res: Response) {

        const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(204).json(productUpdate)
    }

    /**
     * delete
     */
    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        await Product.findByIdAndDelete(id)
        res.status(200).json({message : "Deleted"})
    }

}

const productController = new ProductController();
export default productController