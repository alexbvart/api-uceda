import { Request, Response } from "express";
import Coustomer from "../models/Coustomer";

class CoustomerController {
    /**
    * findAll
    */
   public async findAll(req: Request, res: Response) {
    try {
        const coustomers = await Coustomer.find()
        res.status(200).json(coustomers)
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
        const { name, lastname, dni, phone, adress} = req.body
        const newCoustomer = new Coustomer({ name, lastname, dni, phone, adress})
        const savedCoustomer = await newCoustomer.save()
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
        const coustomer = await Coustomer.findById(req.params.id)
        res.status(200).json(coustomer)
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
        const updateCoustomer = await Coustomer.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(204).json(updateCoustomer)
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
        await Coustomer.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error of server"}) 
    }
}
}
const coustomerController = new CoustomerController();
export default coustomerController;