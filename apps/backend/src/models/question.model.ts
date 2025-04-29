import mongoose, { Schema, Document } from "mongoose";

interface Block {
    text: string;
    showInOption: boolean;
    isAnswer: boolean;
}

interface Option {
    text: string;
    isCorrectAnswer: boolean;
}

export interface IQuestion extends Document {
    _id: string;
    type: string;
    title: string;
    blocks?: Block[];
    options?: Option[];
    solution?: string;
    siblingId?: mongoose.Types.ObjectId;
}

const QuestionSchema: Schema = new Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    blocks: [
        {
            text: String,
            showInOption: Boolean,
            isAnswer: Boolean,
        },
    ],
    options: [
        {
            text: String,
            isCorrectAnswer: Boolean,
        },
    ],
    solution: String,
    siblingId: { type: Schema.Types.ObjectId, ref: "Question" },
});

QuestionSchema.index({ title: "text", type: "text" });

export default mongoose.model<IQuestion>("Question", QuestionSchema);