import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import Employee from '../models/Employee';

import User from '../models/User';
import Role from '../models/Role';
import Workstation from '../models/Workstation';
import authController from './authController';



class EmployeeController {


    /**
    * findAll
    */
    public async findAll(req: Request, res: Response) {
        try {
            const employees = await Employee.find()
            const workstations = await Workstation.find()
            var list = employees.map((element: any) => {

                let station = element.workstation + ""

                for (const work of workstations) {
                    if (work._id == station) {
                        return {
                            _id: element._id,
                            name: element.name,
                            lastname: element.lastname,
                            dni: element.dni,
                            email: element.email,
                            phone: element.phone,
                            birth: element.birth,
                            workstation: work.name,
                            user: element.user
                        }

                    }
                }
            });

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
            const salt = await bcrypt.genSalt(10);
            const { name, lastname, dni, email, phone, birth, workstation } = req.body
            const station = await Workstation.findById(workstation)

            const user = new User({
                email: email,
                username: name,
                password: await bcrypt.hash(dni, salt),
            });
            const newUser = await user.save()
            const rol = await Role.findOne({ name: station.name })
            await User.findByIdAndUpdate(newUser._id, { roles: rol._id })
            const newEmployee = new Employee({ name, lastname, dni, email, phone, birth, workstation, user: newUser._id })
            const savedEmployee = await newEmployee.save()
            res.status(201).json({ message: "created"})
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
            const workstations = await Workstation.find()
            let station = employee.workstation + ""

            for (const work of workstations) {
                if (work._id == station) {

                    res.status(200).json({
                        _id: employee._id,
                        name: employee.name,
                        lastname: employee.lastname,
                        dni: employee.dni,
                        email: employee.email,
                        phone: employee.phone,
                        birth: employee.birth,
                        workstation: work.name,
                        user: employee.user
                    })


                }
            }

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
            const employee = await Employee.findById(req.params.id);
            if(req.body.dni){
                authController.updatePassword(req.body.dni, employee.user)
            }
            if(req.body.email){
                authController.updateEmail(req.body.email, employee.user)
            }
            const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            
            res.status(200).json(updateEmployee)
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
            const employee = await Employee.findById(id)
                await User.findByIdAndDelete(employee.user)
                await Employee.findByIdAndDelete(id)
            res.status(200).json({ message: "Deleted" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

}

const employeeController = new EmployeeController()
export default employeeController


interface newEmployee {
    name: any,
    lastname: any,
    dni: any,
    email: any,
    phone: any,
    birth: any,
    workstation: any
}