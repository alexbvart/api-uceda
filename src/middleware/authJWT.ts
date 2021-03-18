import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import { NextFunction, Request, Response } from "express";




/**
 * verifyToken
 */
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-access-token"]
    if (!token) return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = jwt.verify(token + "", config.SECRET)

        req.body.userId = decoded.id
        const user = await User.findById(req.body.userId, { password: 0 });
        if (!user) return res.status(404).json({ message: "No user found" })
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" })
    }
}



/**
 * verifyRoleAuth
 */
export const verifyRoleAuth = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { userId } = req.body


            const user = await User.findById(userId)
            const role = await Role.find({ _id: { $in: user.roles } })
            var status = false
            roles.forEach((rol: string) => {
                for (const iterator of role) {
                    if (iterator.name == rol) {
                        status = true
                        next();
                    }
                }
            });
            if (!status) {
                if (roles.length > 1)
                    return res.status(401).json({ message: `Require ${roles[0]} or ${roles[1]} Role!` })
                else
                    return res.status(401).json({ message: `Require ${roles[0]} Role!` })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
    }
}




