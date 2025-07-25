import { useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';
import EntryCard from '../components/EntryCard';
import api from '../lib/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from 'react-hot-toast';
import EntriesNotFound from '../components/EntriesNotFound';

// Got to find a way to properly add a unique key prop for each child in lists to avoid the react warning.

const EntriesPage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [entries,setEntries] = useState([]);
    const [loading,setLoading] = useState(true);
    const [entryIndex] = useState([0]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
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
    },[])

    return (
        <div className='min-h-screen'>
            <Navbar />

            {isRateLimited && <RateLimitedUI />}

            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>Loading entries...</div>}

                {entries.length === 0 && !isRateLimited && <EntriesNotFound /> }

                {entries.length > 0 && !isRateLimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
                        {entries.map((entry, entryIndex) => (
                            <div>
                                {/* {console.log(entryIndex)} */}
                                <EntryCard key={entry._id} entry={entry} setEntries={setEntries} entryIndex={entryIndex}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EntriesPage;
