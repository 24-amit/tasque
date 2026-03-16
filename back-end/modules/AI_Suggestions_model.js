import mongoose from 'mongoose';
const { Schema } = mongoose;

const aiSuggestionSchema = new Schema(
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

        taskId: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },

        prompt: {
            type: String,
            required: true
        },

        response: {
            type: String,
            required: true
        }
    },
    {
        timestamps: { createdAt: true, updatedAt: false }
    }
);

const AiSuggestion = mongoose.model('AiSuggestion', aiSuggestionSchema);

export default AiSuggestion;