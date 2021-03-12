import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs";
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';

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
                const rol = await Role.findOne({ name: "Administrador"})
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
        res.json({ token: token })
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


}

const authController = new AuthController();
export default authController