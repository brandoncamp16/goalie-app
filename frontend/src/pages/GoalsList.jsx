import { useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import GoalCardSmall from '../components/GoalCardSmall';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import GoalsNotFound from '../components/GoalsNotFound';

const GoalsList = ({entryIndex}) => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [goals,setGoals] = useState([]);
    const [loading,setLoading] = useState(true);
    const [goalIndex] = useState([0]);
    const [activityData, setActivities] = useState([]); 
    const [filteredEntries,setFilteredEntries] = useState([]);
    const [goalFilter, setGoalFilter] = useState([]);
    

    useEffect(() => {
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

        const filteredEntries = async () => {
            try {
                const activityRes = await api.get("/activities");
                const activityData = activityRes.data;
                const goalRes = await api.get("/goals");
                const goalData = goalRes.data;
                const entryRes = await api.get("/entries");
                const entryData = entryRes.data;
                const entryFilter = entryData.map(itemEntryData => { return itemEntryData.selectedActivities; });
                const filteredEntries = activityData.filter(itemActivityData => entryFilter[entryIndex].includes(itemActivityData._id));
                const goalFilter = goalData.map(itemGoalData => { return itemGoalData._id; });
                // const filteredActivities = filteredEntries.filter(itemActivityData => goalFilter[goalIndex].includes(itemActivityData.goalID));
                setActivities(activityData);
                setFilteredEntries(filteredEntries);
                setGoalFilter(goalFilter);
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

        filteredEntries();
    },[])

    return (
        <div>

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading goals...</div>}

                {goals.length === 0 && !isRateLimited }

                {goals.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 text-base-content line-clamp-3 text-center'>
                        {/* {console.log(filteredEntries.length)} */}
                        {/* {goalIndex} */}
                        {/* {console.log(entryActivities)} */}
                        {/* {console.log(entryActivities.entryActivities[0])} */}
                        {goals.map((goal, goalIndex) => ( 
                            <div>
                                {/* {console.log(entryIndex)} */}
                                <GoalCardSmall key={goal._id} goal={goal} setGoals={setGoals} goalIndex={goalIndex} entryIndex={entryIndex} filteredEntries={filteredEntries} activityData={activityData} goalFilter={goalFilter}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalsList;
