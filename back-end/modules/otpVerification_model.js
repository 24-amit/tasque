import mongoose from 'mongoose';
const { Schema } = mongoose;

const otpVerificationSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        otp: {
            type: String,
            required: true
        },

        purpose: {
            type: String,
            enum: ['signup', 'forgot_password'],
            required: true
        },

        expiresAt: {
            type: Date,
            required: true
        },

        isUsed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

const OtpVerification = mongoose.model('OtpVerification', otpVerificationSchema);

export default OtpVerification;