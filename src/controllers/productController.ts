import { Request, Response } from 'express';
import Product from '../models/Product';

class ProductController {

    /**
     * findAll
     */
    public async findAll(req: Request, res: Response) {
        try {
            const products = await Product.find()
            res.status(200).json(products)
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
            const { name, description, price, stock, status, category, brand } = req.body
            const newProduct = new Product({ name, description, price, stock, status, category, brand })
            const productSaved = await newProduct.save()
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
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
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
            const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
           return res.status(204).json({ message: "updated" });
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
            await Product.findByIdAndDelete(id)
            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }

    }

}

const productController = new ProductController();
export default productController