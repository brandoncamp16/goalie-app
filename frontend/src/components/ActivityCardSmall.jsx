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
    // Using a Link instead of div leads to a hydration error. Implement a on click event for links to work without causing a hydration error.
    <div to={`/activities/${activity._id}`} className="card bg-base-200 hover:shadow-lg transition-all duration-200 min-w-max">
        {/* {console.log(entryActivities)} */}
        <div className='card-body'>
            <h3 className='card-title text-base-content text-center justify-center'>{activity.name}</h3>
        </div>
    </div>
  );
};

export default ActivityCard;