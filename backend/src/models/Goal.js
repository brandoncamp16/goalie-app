import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    }
);

const Goal = mongoose.model("Goal", goalSchema)

export default Goal