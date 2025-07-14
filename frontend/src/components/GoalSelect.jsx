import { useEffect, useState } from "react";
import api from "../lib/axios";

function GoalSelect() {
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState('')

    const fetchGoals = async() => {
            const res = await api.get("/goals");
            console.log(res.data);
            setGoals(res.data);
    }
    useEffect(() => {
        fetchGoals()
    },[])

    const handleSelect = (e) => {
        console.log(e.target.value)
        setSelectedGoal(e.target.value)
    }
    return (
        <div>
            <select className="select select-primary select-lg" onChange={(e)=>handleSelect(e)}>
                <option disabled selected value={""}>Select a Goal</option>
                <option value={"0"}>Uncatigorized</option>
                {goals.map((index,value)=> (
                    <option value={goals[value]["_id"]}>{goals[value]["name"]}</option>
                ))}

            </select>

            <p>{selectedGoal}</p>
        </div>
    )
}

export default GoalSelect;