import Activity from "../models/Activity.js";

export async function getAllActivities(req, res) {
    try {
        const activities = await Activity.find().sort({createdAt:-1}); // newest first
        res.status(200).json(activities);
    } catch (error) {
        console.error("Error in getAllActivities controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function getActivityById(req, res) {
    try {
        const activity = await Activity.findById(req.params.id);
        if(!activity) return res.status(404).json({messaage:"Activity not found!"});
        res.json(activity);
    } catch (error) {
        console.error("Error in getActivityById controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function createActivity(req, res) {
    try {
        const {name,goalID} = req.body;
        const activity = new Activity({name, goalID});

        const savedActivity = await activity.save();
        res.status(201).json(savedActivity);
    } catch (error) {
        console.error("Error in createActivity controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function updateActivity(req, res) {
    try {
        const {name,goalID} = req.body;
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id,{name,goalID},{new: true,});
        if(!updatedActivity) return res.status(404).json({messaage:"Activity not found"});
        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error("Error in updateActivity controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function deleteActivity(req, res) {
        try {
        const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
        if(!deletedActivity) return res.status(404).json({messaage:"Activity not found"});
        res.status(200).json({messaage:"Activity deleted successfully"});
    } catch (error) {
        console.error("Error in deleteActivity controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}