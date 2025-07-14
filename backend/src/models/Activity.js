import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        goalID: {
            type: String,
            required: true,
        },
    }
);

const Activity = mongoose.model("Activity", activitySchema)

export default Activity