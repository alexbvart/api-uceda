import { Request, Response } from 'express'
import Workstation from '../models/Workstation'

class WorkstationController {


    
    /**
    * findAll
    */
   public async findAll(req: Request, res: Response) {
    try {
        const workstation = await Workstation.find()
        res.status(200).json(workstation)
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
        const newWorkstation = new Workstation({ name })
        const savedWorkstation = await newWorkstation.save()
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
        const workstation = await Workstation.findById(req.params.id)
        res.status(200).json(workstation)
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
        const updateWorkstation = await Workstation.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(204).json(updateWorkstation)
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
        await Workstation.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error of server"}) 
    }
}

}

const workstationController = new WorkstationController()
export default workstationController