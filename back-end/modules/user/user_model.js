import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        mobile: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        otp: String,
        otpExpiry: Date,
        isVerified: {
            type: Boolean,
            default: false
        },
        accessToken: {
            type: String
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

export default User;