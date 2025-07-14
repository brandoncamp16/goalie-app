import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const GoalDetailPage = () => {
  const [goal,setGoal] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchGoal = async() => {
      try {
        const res = await api.get(`/goals/${id}`);
        setGoal(res.data);
      } catch (error) {
        console.log("Error in fetching the goal", error);
        toast.error("Failed to fetch the goal"); // Add rate limit check
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  },[id]);

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this goal?")) return;

  try {
    await api.delete(`/goals/${id}`);
    toast.success("Goal deleted");
    navigate("/goals");
  } catch (error) {
    console.log("Error deleting the goal:", error);
    toast.error("Failed to delete goal");
  }
};
const handleSave = async () => {
  if (!goal.name.trim()) {
    toast.error("Please add a name");
    return;
  }

  setSaving(true);

  try {
    await api.put(`/goals/${id}`, goal);
    toast.success("Goal updated successfully");
    navigate("/goals");
  } catch (error) {
    console.log("Error saving the goal:", error);
    toast.error("Failed to update goal");
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
            <Link to="/goals" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Goals
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Goal
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Goal name" className="input input-bordered" value={goal.name} onChange={(e) => setGoal({ ...goal, name: e.target.value })} />
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

export default GoalDetailPage;
