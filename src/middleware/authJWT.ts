import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import { NextFunction, Request, Response } from "express";


class AuthJWT {

    /**
     * verifyToken
     */
    public async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers["x-access-token"]

        if (!token) return res.status(403).json({ message: "No token provided" });
        try {
            const decoded = jwt.verify(token, config.SECRET)
            req.body.userId = decoded.id
            const user = await User.findById(req.body.userId, { password: 0 });
            if (!user) return res.status(404).json({ message: "No user found" })

            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized!" })
        }
    }


    /**
     * verifyRoles
     */
    public async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.body.userId)
            const roles = await Role.find({ _id: { $in: user.roles } })

            for (let i = 0; i < roles.length; i++) {
                const rol = roles[i].name;
                if (rol == "admin") {
                    next()
                    return;
                }
            }
            return res.status(403).json({ message: "Require Admin Role!" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
    }

    
    /**
     * verifyRoles
     */
    public async isVentas(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.body.userId)
            const roles = await Role.find({ _id: { $in: user.roles } })

            for (let i = 0; i < roles.length; i++) {
                const rol = roles[i].name;
                if (rol == "ventas") {
                    next()
                    return;
                }
            }
            return res.status(403).json({ message: "Require Ventas Role!" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
    }
    public async isRRHH(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findById(req.body.userId)
            const roles = await Role.find({ _id: { $in: user.roles } })

            for (let i = 0; i < roles.length; i++) {
                const rol = roles[i].name;
                if (rol == "rrhh") {
                    next()
                    return;
                }
            }
            return res.status(403).json({ message: "Require RRHH Role!" })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: error });
        }
    }
}

const authJWT = new AuthJWT()
export default authJWT