import { Request, Response } from 'express'
import Category from '../models/ProductCategory'

class ProductCaregoryController {


    
    /**
    * findAll
    */
   public async findAll(req: Request, res: Response) {
    try {
        const category = await Category.find()
        res.status(200).json(category)
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
        const newCategory = new Category({ name })
        const savedCategory = await newCategory.save()
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
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
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
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(204).json(updateCategory)
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
        await Category.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error of server"}) 
    }
}

}

const categoryController = new ProductCaregoryController()
export default categoryController