import { useState } from 'react';
import GoalNavbar from '../components/GoalNavbar';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import GoalCard from '../components/GoalCard';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import GoalsNotFound from '../components/GoalsNotFound';

const GoalsPage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [goals,setGoals] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const res = await api.get("/goals");
                console.log(res.data);
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
    },[])

    return (
        <div className='min-h-screen'>
            <GoalNavbar />

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading goals...</div>}

                {goals.length === 0 && !isRateLimited && <GoalsNotFound /> }

                {goals.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {goals.map((goal) => (
                            <div>
                                <GoalCard key={goal._id} goal={goal} setGoals={setGoals} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalsPage;
