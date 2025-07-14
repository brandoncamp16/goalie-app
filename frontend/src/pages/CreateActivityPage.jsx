import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreateActivityPage = () => {
  const [name, setTitle] = useState("");
  const [goalID, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);

  const fetchGoals = async() => {
          const res = await api.get("/goals");
          console.log(res.data);
          setGoals(res.data);
  }
  useEffect(() => {
      fetchGoals()
  },[])

  const handleSelect = (e) => {
      console.log(e.target.value)
      setContent(e.target.value)
  }

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !goalID.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/activities", {
        name,
        goalID,
      });

      toast.success("Activity created successfully!");
      navigate("/activities");
    } catch (error) {
      console.log("Error creating activity", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating activities too fast", {
          duration: 4000,
          icon: "🛑",
        });
      } else {
        toast.error("Failed to create activity");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/activities"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Activities
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Activity</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Name</span>
                  </label>
                  <input type='text' placeholder='Activity Title' className='input input-bordered' value={name} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Associated Goal</span>
                  </label>
                  {/* <textarea placeholder='Write your activity here...' className='textarea textarea-bordered h-32' value={goalID} onChange={(e) => setContent(e.target.value)} /> */}
                <select className="select select-primary select-lg" value={goalID} onChange={(e) => handleSelect(e)}>
                    <option disabled selected value={""}>Select a Goal</option>
                    {goals.map((index,value)=> (
                        <option value={goals[value]["_id"]}>{goals[value]["name"]}</option>
                    ))}
                </select>
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Activity"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateActivityPage;