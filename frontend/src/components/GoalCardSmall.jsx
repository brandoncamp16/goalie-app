import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from "react-router";
import ActivitiesList from '../pages/ActivitiesList';
import api from '../lib/axios';
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';

const GoalCardSmall = ({goal, goalIndex, entryIndex, filteredEntries, goalFilter}) => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [activities,setActivities] = useState([]);
    const [filteredActivities,setFilteredActivities] = useState([]);
    const [goals,setGoals] = useState([]);
    const [entries,setEntries] = useState([]);
    const [loading,setLoading] = useState(true);
    

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await api.get("/activities");
                // console.log(res.data);
                setActivities(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching activities");
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load activities");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();

        const fetchGoals = async () => {
            try {
                const res = await api.get("/goals");
                // console.log(res.data);
                setGoals(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching goals");
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load goals");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();

        const fetchEntries = async () => {
            try {
                const res = await api.get("/entries");
                setEntries(res.data);
                setIsRateLimited(false);
            } catch (error) {
                console.log("Error fetching entries");
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load entries");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();

        const filterActivities = async () => {
            try {
                const filteredActivities = filteredEntries.filter(itemActivityData => goalFilter[goalIndex].includes(itemActivityData.goalID));
                // console.log(goalFilter);
                // console.log(goalFilter[0]);
                // console.log(goalIndex);
                // console.log(filteredEntries);
                
                setFilteredActivities(filteredActivities);
                // {console.log(filteredActivities)}
            } catch (error) {
                console.log("Error filtering activities");
                if(error.response?.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Error filtering activities");
                }
            } finally {
                setLoading(false);
            }
        };

        filterActivities();




    },[entries])

    

    return (
        <div to={`/goals/${goal._id}`} className="goalCardDiv">
          {filteredActivities.length > 0 && (
            <div className="goalCard">
              <p className='card-title text-base-content line-clamp-3 text-center'>{goal.name}</p>
              <ActivitiesList goalIndex={goalIndex} entryIndex={entryIndex}/>
            </div>
          )}
        </div>
    );
};

export default GoalCardSmall;