import { Request, Response } from 'express'
import Coustomer from '../models/Coustomer';
import Product from '../models/Product';
import Sale from '../models/Sale'
import Detail from '../models/SaleDetail';
import User from '../models/User';
import productController from './productController';

class SaleController {



    /**
    * findAll
    */
    public async findAll(req: Request, res: Response) {
        try {

            const sales = await Sale.find()
            const details = await Detail.find()
            const products = await Product.find()
            // return res.json(details)
            let clients: any[] = []
            let users: any[] = []
            for (let i = 0; i < sales.length; i++) {
                const client = await Coustomer.findById(sales[i].client);
                const user = await User.findById(sales[i].user)
                clients[i] = client.name
                users[i] = user.username
            }

            let newlist: {
                _id: any,
                cuantity: any,
                product: any,
                price: any,
                subTotal: any
            }[] = [];
            let iterator = -1
            var list = sales.map((element: any) => {
                iterator += 1


                newlist = []
                for (let j = 0; j < details.length; j++) {
                    const detail = details[j].sale + ""
                    const sale = element._id + ""
                    const d = details[j]
                    if (sale.match(detail)) {
                        const idD = d.product + ""
                        for (let k = 0; k < products.length; k++) {
                            const idP = products[k]._id + ""
                            if (idD.match(idP)) {
                                newlist[j] = {
                                    _id: d._id,
                                    cuantity: d.cuantity,
                                    product: products[k].name,
                                    price: products[k].price,
                                    subTotal: products[k].price * d.cuantity
                                }
                            }
                        }
                    }
                }

                return {
                    "_id": element._id,
                    "date": element.date,
                    "total": element.total,
                    "client": clients[iterator],
                    "user": users[iterator],
                    "details": newlist
                }
            })
            res.status(200).json(list)
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
            const sale = await Sale.findById(req.params.id)
            const details = await Detail.find({ sale: sale._id })
            const products = await Product.find()
            let newlist: {
                _id: any,
                cuantity: any,
                product: any,
                price: any,
                subTotal: any
            }[] = [];
            for (let j = 0; j < details.length; j++) {
                const d = details[j]
                for (let k = 0; k < products.length; k++) {
                    const idP = products[k]._id + ""
                    const idD = d.product + ""
                    if (idD.match(idP)) {
                        newlist[j] = {
                            _id: d._id,
                            cuantity: d.cuantity,
                            product: products[k].name,
                            price: products[k].price,
                            subTotal: products[k].price * d.cuantity
                        }
                    }
                }
            }

            const client = await Coustomer.findById(sale.client);
            const user = await User.findById(sale.user)


            var list: { _id: any, date: any, total: any, client: any, user: any, details: any } = {
                "_id": sale._id,
                "date": sale.date,
                "total": sale.total,
                "client": client.name,
                "user": user.username,
                "details": newlist
            }

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
            const { date, total, client, user, details } = req.body
            if (details.length > 0) {
                const newSale = new Sale({ date, total, client, user })
                const savedSale = await newSale.save()
                details.forEach(async (element: any) => {
                    const detail = new Detail({
                        cuantity: element.cuantity,
                        product: element.product,
                        sale: savedSale._id
                    })
                    productController.updateStockForSale(detail);
                    await detail.save()
                });
            } else {
                return res.status(400).json({ message: "wrong sale" })
            }

            res.status(200).json({ message: "created" })
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
            const { date, total, client, user, details } = req.body

            const sale = await Sale.findById({ _id: req.params.id })

            const updateSale = await Sale.findByIdAndUpdate(sale._id, { date, total, client, user }, {
                new: true
            })

            if (details.length > 0) {
                await Detail.deleteMany({ sale: updateSale._id })

                details.forEach(async (element: any) => {
                    const detail = new Detail({
                        cuantity: element.cuantity,
                        product: element.product,
                        sale: updateSale._id
                    })
                    await detail.save()
                });
                // const foundDetail = await Detail.find({ sale: sale._id }) //* Details

                res.status(200).json({ message: "updated" })
            }


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
            const sale = await Sale.findById(id)

            await Detail.deleteMany({ sale: id })
            await Sale.findByIdAndDelete(id)

            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }
    /**
     * deleteDetails
     */
    public async deleteDetails(req: Request, res: Response) {
        try {
            await Detail.deleteMany({ sale: req.params.id })
            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

}


const saleController = new SaleController()
export default saleController