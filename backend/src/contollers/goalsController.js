import Goal from "../models/Goal.js";

export async function getAllGoals(req, res) {
    try {
        const goals = await Goal.find().sort({createdAt:-1}); // newest first
        res.status(200).json(goals);
    } catch (error) {
        console.error("Error in getAllGoals controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

// export async function getAllGoalsById(req, res) {
//     try {
//         const goals = await Goal.find({}, {_id: 1, name: 1});
//         res.status(200).json(goals);
//     } catch (error) {
//         console.error("Error in get GoalAllGoalsById controller");
//         res.status(500).json({messaage: "Internal server error"});
//     }
// }

export async function getGoalById(req, res) {
    try {
        const goal = await Goal.findById(req.params.id);
        if(!goal) return res.status(404).json({messaage:"Goal not found!"});
        res.json(goal);
    } catch (error) {
        console.error("Error in getGoalById controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function createGoal(req, res) {
    try {
        const {name} = req.body;
        const goal = new Goal({name});

        const savedGoal = await goal.save();
        res.status(201).json(savedGoal);
    } catch (error) {
        console.error("Error in createGoal controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function updateGoal(req, res) {
    try {
        const {name} = req.body;
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,{name},{new: true,});
        if(!updatedGoal) return res.status(404).json({messaage:"Goal not found"});
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error("Error in updateGoal controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function deleteGoal(req, res) {
        try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if(!deletedGoal) return res.status(404).json({messaage:"Goal not found"});
        res.status(200).json({messaage:"Goal deleted successfully"});
    } catch (error) {
        console.error("Error in deleteGoal controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}