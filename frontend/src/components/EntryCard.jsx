import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { Link } from "react-router";
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import GoalsList from '../pages/GoalsList';

const EntryCard = ({entry, setEntries, entryIndex}) => {

const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
        await api.delete(`/entries/${id}`);
        setEntries((prev) => prev.filter(entry => entry._id !== id));
        toast.success("Entry deleted successfully");
    } catch (error) {
        console.log("Error in handleDelete", error);
        toast.error("Failed to delete entry");
    }
};
return (
    <Link to={`/entries/${entry._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{entry.title}</h3>
            <p className='text-base-content/70 line-clamp-3'>{entry.content}</p>
            {/* <p className='text-base-content/70 line-clamp-3'>{entryIndex}</p> */}
            {/* {console.log(entryActivities)} */}
            {/* {console.log(entry.activities[0])} */}
            {/* {console.log(entryIndex)} */}
            <GoalsList entryIndex={entryIndex}/>
            <div className='card-actions justify-between items-center mt-4'>
                <span className='text-sm text-base-content/60'>
                    {formatDate(new Date(entry.createdAt))}
                </span>
                <div className='flex items-center gap-1'>
                    <PenSquareIcon className='size-4' />
                    <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e,entry._id)}>
                        <Trash2Icon className='size-4' />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  );
};

export default EntryCard;