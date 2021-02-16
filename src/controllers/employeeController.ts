import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import Employee from '../models/Employee';

import User from '../models/User';
import Role from '../models/Role';
import Workstation from '../models/Workstation';



class EmployeeController {


    /**
    * findAll
    */
    public async findAll(req: Request, res: Response) {
        try {
            const employees = await Employee.find()
            let workstations: any[] = []
            for (let i = 0; i < employees.length; i++) {
                const element = await Workstation.findById(employees[i].workstation);
                workstations[i] = element.name
            }

            let iterator = -1;
            var list = await employees.map((element: any) => {
                iterator +=  1
                return {
                    "_id": element._id,
                    "name": element.name,
                    "lastname": element.lastname,
                    "dni": element.dni,
                    "email": element.email,
                    "phone": element.phone,
                    "birth": element.birth,
                    "workstation": workstations[iterator],
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
            const user = new User({
                email: email,
                username: name,
                password: await bcrypt.hash(dni, salt),
            });
            let rolname;
            const newWorkstation = await Workstation.findById(workstation)
            if(newWorkstation.name == 'Ventas'){
                rolname = 'ventas'
            }else if(newWorkstation.name == 'RR.HH'){
                rolname = 'rrhh'
            }else if(newWorkstation.name == 'Administrador'){
                rolname = 'admin'
            }
            const rol = await Role.findOne({ name: rolname})
            const newUser = await user.save()
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
            const workstation = await Workstation.findById(employee.workstation)
            var newEmployee: { _id: any, name: any, lastname: any, dni: any, email: any, phone: any, birth: any, workstation: any } = {
                "_id": employee._id,
                "name": employee.name,
                "lastname": employee.lastname,
                "dni": employee.dni,
                "email": employee.email,
                "phone": employee.phone,
                "birth": employee.birth,
                "workstation": workstation.name,
            }

            res.status(200).json(newEmployee)
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