import { Request, Response } from 'express';
import Employee from '../models/Employee';

class EmployeeController  {


    
    /**
    * findAll
    */
   public async findAll(req: Request, res: Response) {
    try {
        const employee = await Employee.find()
        res.status(200).json(employee)
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
        const { name, lastname, dni, email, phone, birth, workstation, user } = req.body
        const newEmployee = new Employee({ name, lastname, dni, email, phone, birth, workstation, user })
        const savedEmployee = await newEmployee.save()
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
        const employee = await Employee.findById(req.params.id)
        res.status(200).json(employee)
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
        const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(204).json(updateEmployee)
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
        await Employee.findByIdAndDelete(id)
        res.status(200).json({ message: "Deleted" })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Error of server"}) 
    }
}

}

const employeeController = new EmployeeController()
export default employeeController


