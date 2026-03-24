import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
            enum: ["pending", "completed"],
            default: "pending"
        },

        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },

        dueDate: {
            type: Date
        },

        completedAt: {
            type: Date,
            default: null
        },

        forwardHistory: [
            {
                from: Date,
                to: Date
            }
        ]
    },
    { timestamps: true }
);

// index for performance
taskSchema.index({ user: 1, dueDate: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;