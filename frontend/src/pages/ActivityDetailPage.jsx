import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const ActivityDetailPage = () => {
  const [activity,setActivity] = useState(null);
  const [name, setTitle] = useState("");
  const [goalID, setContent] = useState("");
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [goals, setGoals] = useState([]);

  const fetchGoals = async() => {
          const res = await api.get("/goals");
          console.log(res.data);
          setGoals(res.data);
  }
  useEffect(() => {
      fetchGoals()
  },[])

  const handleText = (e) => {
      console.log(e.target.value)
      setTitle(e.target.value)
  }
  const handleSelect = (e) => {
      console.log(e.target.value)
      setContent(e.target.value)
  }

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async() => {
      try {
        const res = await api.get(`/activities/${id}`);
        setActivity(res.data);
      } catch (error) {
        console.log("Error in fetching the activity", error);
        toast.error("Failed to fetch the activity"); // Add rate limit check
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  },[id]);

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this activity?")) return;

  try {
    await api.delete(`/activities/${id}`);
    toast.success("Activity deleted");
    navigate("/activities");
  } catch (error) {
    console.log("Error deleting the activity:", error);
    toast.error("Failed to delete activity");
  }
};
const handleSave = async () => {
  if (!name.trim() || !goalID.trim()) { // Change name and goalID to activity.name and goalID.name to allow saving without edits. However the issue of values being null my default needs to be fixed. The values are not null visually in the fields, but are when submitted to the database if unchanged.
    toast.error("Please add a name or goalID");
    return;
  }

  setSaving(true);

  try {
    // await api.put(`/activities/${id}`, activity);
    await api.put(`/activities/${id}`, {
      activity,
      name,
      goalID,
    });
    toast.success("Activity updated successfully");
    navigate("/activities");
  } catch (error) {
    console.log("Error saving the activity:", error);
    toast.error("Failed to update activity");
  } finally {
    setSaving(false);
  }
};


  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/activities" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Activities
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Activity
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                {/* <input type="text" placeholder="Activity name" className="input input-bordered" value={name} onChange={(e) => setActivity({ ...activity, name: e.target.value })} /> */}
                <input type='text' placeholder='Activity Title' className='input input-bordered' value={activity.name} onChange={(e) => {setActivity({ ...activity, name: e.target.value });handleText(e)}}/>              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">GoalID</span>
                </label>
                {/* <textarea placeholder="Write your activity here..." className="textarea textarea-bordered h-32" value={activity.goalID} onChange={(e) => setActivity({ ...activity, goalID: e.target.value })} /> */}
                <select className="select select-primary select-lg" value={activity.goalID} onChange={(e) => {setActivity({ ...activity, goalID: e.target.value });handleSelect(e)}}>
                    <option disabled selected value={""}>Select a Goal</option>
                    {goals.map((index,value)=> (
                        <option value={goals[value]["_id"]}>{goals[value]["name"]}</option>
                    ))}
                </select>
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailPage;
