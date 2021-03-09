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
    * findTrue
    */
    public async findTrue(req: Request, res: Response) {
        try {
            const products = await Product.find()

            var response = products.map((element: any)=>{
                if (element.status == true) {
                    return element
                }else{
                    return 
                }
            })

            res.status(200).json(response)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }

    }

    /**
    * findFalse
    */
     public async findFalse(req: Request, res: Response) {
        try {
            const products = await Product.find()

            var response = products.map((element: any)=>{
                if (element.status == false) {
                    return element
                }else{
                    return 
                }
            })

            res.status(200).json(response)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }

    }


    /**
    * findBajoStock
    */
     public async findBajoStock(req: Request, res: Response) {
        try {
            const products = await Product.find()

            var response = products.map((element: any)=>{
                if (element.stock < 15) {
                    return element
                }else{
                    return 
                }
            })

            res.status(200).json(response)
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
     * updateStockForSale
     */
    public async updateStockForSale(saleDetail: any) {

        try {
            const cuantity = saleDetail.cuantity
            const productID = saleDetail.product
            const product = await Product.findById(productID);
            const stock = product.stock - cuantity
            let status = true
            if (stock <= 0) {
                status = false
            }
            const productUpdate = await Product.findByIdAndUpdate(productID, {
                stock: stock,
                status: status
            }, {
                new: true
            });
        } catch (error) {
            console.error(error);
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