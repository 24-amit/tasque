import jwt from "jsonwebtoken";
import User from "../modules/user/user_model.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Get token from header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token"
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Attach user to request
        req.user = await User.findById(decoded.userId).select("-password");

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};