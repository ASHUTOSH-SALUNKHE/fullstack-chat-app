import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const protectRoute = async(req, res, next) => {

    try {
        //check if cookie is present or not that means user is logged/signed in or not
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Is Provided."});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token."});
        }

        const user = await User.findById(decoded.userId).select("-password")
        //we do not want to send the password back to the client (-password)

        if(!user){
            return res.status(401).json({message: "Unauthorized - User Not Found."});
        }

        req.user = user;

        next()

    } catch (error) {
        console.log("Error in protectRoute middleware: ",error.message)
    }
}