import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/ProductCategory';
import Brand from '../models/Brand';



class ProductController {

    /**
     * findAll
     */
    public async findAll(req: Request, res: Response) {
        try {
            const products = await Product.find()
            let brands: any[] = []
            let categories: any[] = []

            for (let i = 0; i < products.length; i++) {
                const brand = await Brand.findById(products[i].brand);
                const category = await Category.findById(products[i].category);
                brands[i] = brand.name;
                categories[i] = category.name
            }
            let iterator = -1
            var list = products.map((element: any) => {
                iterator += 1
                return {
                    "_id": element._id,
                    "name": element.name,
                    "description": element.description,
                    "price": element.price,
                    "stock": element.stock,
                    "category": categories[iterator],
                    "brand": brands[iterator],
                }
            })
            res.status(200).json(list)
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
            const category = await Category.findById(product.category)
            const brand = await Brand.findById(product.brand)
            var newProduct = {
                "_id": product._id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "stock": product.stock,
                "category": category.name,
                "brand": brand.name,
            }
            res.status(200).json(newProduct)
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