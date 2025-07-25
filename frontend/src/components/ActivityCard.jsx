import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from "react-router";
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import toast from 'react-hot-toast';

const ActivityCard = ({activity,setActivities}) => {
    const axiosPrivate = useAxiosPrivate();

const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
        await axiosPrivate.delete(`/activities/${id}`);
        setActivities((prev) => prev.filter(activity => activity._id !== id));
        toast.success("Activity deleted successfully");
    } catch (error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete activity");
    }
};
return (
    <Link to={`/activities/${activity._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{activity.name}</h3>
            {/* <p className='text-base-content/70 line-clamp-3'>{activity.goalID}</p> */}
            <div className='card-actions justify-between items-center mt-4'>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4' />
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e,activity._id)}>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default ActivityCard;