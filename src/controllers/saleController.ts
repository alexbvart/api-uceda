import { Request, Response } from 'express'
import Sale from '../models/Sale'
import Detail from '../models/SaleDetail';


class SaleController {



    /**
    * findAll
    */
    public async findAll(req: Request, res: Response) {
        try {
            const sale = await Sale.find()
            const details = await Detail.find(sale._id)
            res.status(200).json({ sale, details })
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
     * findById
     */
    public async findById(req: Request, res: Response) {
        try {
            const sale = await Sale.findById(req.params.id)
            const details = await Detail.find({ sale: sale._id })
            res.status(200).json({ sale, details })
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

                res.status(200).json({message: "updated"})
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
            await Sale.findByIdAndDelete(id)
            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

}

const saleController = new SaleController()
export default saleController