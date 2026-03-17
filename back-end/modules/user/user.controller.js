import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./user_model.js"; // adjust path if needed
import { generateOTP, getOTPExpiry } from "../../utils/otp.util.js";
import { sendEmail } from "../../utils/mail.util.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;

        // 1. Validation
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 2. Check existing user
        const existingUser = await User.findOne({
            $or: [{ email }, { mobile }]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Generate OTP
        const otp = generateOTP();
        const otpExpiry = getOTPExpiry();

        // 5. Create user with OTP
        const newUser = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            otp,
            otpExpiry,
            isVerified: false
        });

        // 6. Send OTP Email
        await sendEmail(
            email,
            "Verify Your Account",
            `Your OTP is ${otp}. It expires in 5 minutes.`
        );

        // 7. Response
        return res.status(201).json({
            success: true,
            message: "User registered. Please verify OTP.",
            data: {
                id: newUser._id,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // 2. Check user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // 4. Generate JWT
        const accessToken = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 5. Store token in DB (your requirement)
        user.accessToken = accessToken;
        await user.save();

        // 6. Response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};