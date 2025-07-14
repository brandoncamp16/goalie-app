import Entry from "../models/Entry.js";

export async function getAllEntries(req, res) {
    try {
        const entries = await Entry.find().sort({createdAt:-1}); // newest first
        res.status(200).json(entries);
    } catch (error) {
        console.error("Error in getAllEntries controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function getEntryById(req, res) {
    try {
        const entry = await Entry.findById(req.params.id);
        if(!entry) return res.status(404).json({messaage:"Entry not found!"});
        res.json(entry);
    } catch (error) {
        console.error("Error in getEntryById controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function createEntry(req, res) {
    try {
        const {title,content, selectedActivities} = req.body;
        const entry = new Entry({title, content, selectedActivities});

        const savedEntry = await entry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        console.error("Error in createEntry controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function updateEntry(req, res) {
    try {
        const {title,content} = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(req.params.id,{title,content, selectedActivities},{new: true,});
        if(!updatedEntry) return res.status(404).json({messaage:"Entry not found"});
        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error("Error in updateEntry controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}

export async function deleteEntry(req, res) {
        try {
        const deletedEntry = await Entry.findByIdAndDelete(req.params.id);
        if(!deletedEntry) return res.status(404).json({messaage:"Entry not found"});
        res.status(200).json({messaage:"Entry deleted successfully"});
    } catch (error) {
        console.error("Error in deleteEntry controler", error);
        res.status(500).json({messaage: "Internal server error"});
    }
}