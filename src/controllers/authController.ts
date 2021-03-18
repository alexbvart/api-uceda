import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs";
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';
import Employee from '../models/Employee';
import Workstation from '../models/Workstation';

class AuthController {


    /**
     * signup
     */
    public async signUp(req: Request, res: Response) {
        try {
            const salt = await bcrypt.genSalt(10);
            const { username, email, password, roles } = req.body
            const newUser = new User({
                username: username,
                email: email,
                password: await bcrypt.hash(password, salt),

            })
            if (roles) {
                const foundRoles = await Role.find({ name: { $in: roles } })
                const id = foundRoles.map((role: { _id: any; }) => role._id)
                newUser.roles = id;
            } else {
                const rol = await Role.findOne({ name: "Administrador" })
                newUser.roles = [rol._id]
            }

            const SaveUser = await newUser.save()
            const token = jwt.sign(
                { id: SaveUser._id },
                config.SECRET,
                { expiresIn: 86400 })
            console.log(SaveUser);

            return res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }

    }


    /**
     * singin
     */
    public async singIn(req: Request, res: Response) {

        const userFound = await User.findOne({ username: req.body.username }).populate("roles")

        if (!userFound)
            return res.status(400).json({ messege: "User not found" })
        const match = await bcrypt.compare(req.body.password, userFound.password)
        if (!match)
            return res.status(400).json({ messege: "fail" })
        const token = jwt.sign(
            { id: userFound._id },
            config.SECRET,
            { expiresIn: 86400 })
        const empleado = await Employee.findOne({ user: userFound._id })
        const workstation = await Workstation.findOne({ _id: empleado.workstation })
        res.json({
            token: token,
            user_id: userFound._id,
            roles: userFound.roles,
            employee: empleado,
            workstation: workstation
        })
    }



    public async logout(req: Request, res: Response) {
        const { id } = req.body
        const userFound = await User.findById(id)
        try {

            await User.findByIdAndDelete(id)
            const { email, username, password, roles } = userFound
            const newUser = await User.create({
                email: email,
                username: username,
                password: password,
                roles: roles
            })
            // const token = jwt.sign({ id: userFound._id}, config.SECRET, {expiresIn: '1'},)
            console.log();
            res.json(newUser)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    /**
     * all
     */
    public async all(req: Request, res: Response) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }
    /**
  * findID
  */
    public async findID(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    public async falseUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id)
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                status: false
            }, {
                new: true
            });
            res.status(200).json(updateUser)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    public async trueUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id)
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                status: true
            }, {
                new: true
            });
            res.status(200).json(updateUser)
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error of server" })
        }
    }

    /**
     * updatePassword
     */
    public async updatePassword(newPassword: any, user_id: any) {
        const salt = await bcrypt.genSalt(10);
        const userUpdate = await User.findByIdAndUpdate(user_id, {
            password: await bcrypt.hash(newPassword, salt)
        }, {
            new: true
        })

    }

    /**
  * updateEmail
  */
    public async updateEmail(newEmail: any, user_id: any) {

        const userUpdate = await User.findByIdAndUpdate(user_id, {
            email: newEmail
        }, {
            new: true
        })

    }

}

const authController = new AuthController();
export default authController