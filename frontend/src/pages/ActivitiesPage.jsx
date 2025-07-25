import { useState } from 'react';
import ActivityNavbar from '../components/ActivityNavbar';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import ActivityCard from '../components/ActivityCard';
import api from '../lib/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from 'react-hot-toast';
import ActivitiesNotFound from '../components/ActivitiesNotFound';

const ActivitiesPage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [activities,setActivities] = useState([]);
    const [loading,setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await axiosPrivate.get("/activities");
                console.log(res.data);
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
    },[])

    return (
        <div className='min-h-screen'>
            <ActivityNavbar />

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading activities...</div>}

                {activities.length === 0 && !isRateLimited && <ActivitiesNotFound /> }

                {activities.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {activities.map((activity) => (
                            <div>
                                <ActivityCard key={activity._id} activity={activity} setActivities={setActivities} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivitiesPage;
