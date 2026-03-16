import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

export default User;