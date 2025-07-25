import { useState } from 'react';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import ActivityCardSmall from '../components/ActivityCardSmall';
import api from '../lib/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from 'react-hot-toast';

const ActivitiesList = ({goalIndex, entryIndex}) => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [activities,setActivities] = useState([]);
    const [filteredActivities,setFilteredActivities] = useState([]);
    const [goals,setGoals] = useState([]);
    const [entries,setEntries] = useState([]);
    const [filteredEntries,setFilteredEntries] = useState([]);
    const [loading,setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axiosPrivate.get("/activities");
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
                const res = await axiosPrivate.get("/goals");
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
                const res = await axiosPrivate.get("/entries");
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
                const activityRes = await axiosPrivate.get("/activities");
                const activityData = activityRes.data;
                const goalRes = await axiosPrivate.get("/goals");
                const goalData = goalRes.data;
                const entryRes = await axiosPrivate.get("/entries");
                const entryData = entryRes.data;
                const entryFilter = entryData.map(itemEntryData => { return itemEntryData.selectedActivities; });
                const filteredEntries = activityData.filter(itemActivityData => entryFilter[entryIndex].includes(itemActivityData._id));
                const goalFilter = goalData.map(itemGoalData => { return itemGoalData._id; });
                const filteredActivities = filteredEntries.filter(itemActivityData => goalFilter[goalIndex].includes(itemActivityData.goalID));
                // console.log(goalFilter);
                // console.log(goalFilter[0]);
                // console.log(goalIndex);
                // console.log(filteredEntries);
                setFilteredActivities(filteredActivities);
                setFilteredEntries(filteredEntries);
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



    },[])

    return (
        <div className='activityListDiv'>

            {isRateLimited && <RateLimitedUI />}



            <div className='max-w-7xl mx-auto p-4 mt-6'>
            {/* Only show div here if filteredActivities is greater than zero, otherwise don't create this div. Then go to each previous element and hide them if they have no content to eventually hide the goal card small if this is empty. */}
                {loading && <div className='text-center text-primary py-10'>Loading activities...</div>}

                {activities.length === 0 && !isRateLimited}

                {filteredActivities.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                        {/* {console.log(filteredActivities.length)} */}
                        {/* I need to create a filtered activity list before mapping it to the activity cards. So take the original list of activities and then remove all activities without a matching goal ID. With only the activities associated with goal left in the data map it. This will need to be done with each goal, so filter it with the first goal ID then map it before moving to the second ID for the next goal.*/}
                        {/* {console.log(entryIndex)} */}
                        {/* {console.log(entryActivities.entryActivities[0])} */}
                        {/* {console.log(entryIndex)} */}
                        {/* {console.log(entries[entryIndex])} */}
                        {filteredActivities.map((activity) => (
                            <div>
                                {/* {console.log(activity.goalID)} */}
                                <ActivityCardSmall key={activity._id} activity={activity} setActivities={setActivities}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivitiesList;
