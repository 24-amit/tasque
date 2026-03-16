import mongoose from 'mongoose';
const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: String, // If referencing User._id, better use Schema.Types.ObjectId
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String
        },

        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },

        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },

        dueDate: {
            type: Date
        },

        completedAt: {
            type: Date
        },

        forwardedFrom: {
            type: Date
        }
    },
    {
        timestamps: true // adds createdAt & updatedAt
    }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;