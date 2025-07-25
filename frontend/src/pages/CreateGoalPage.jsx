import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreateGoalPage = () => {
  const [name, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosPrivate.post("/goals", {
        name,
      });

      toast.success("Goal created successfully!");
      navigate("/goals");
    } catch (error) {
      console.log("Error creating goal", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating goals too fast", {
          duration: 4000,
          icon: "🛑",
        });
      } else {
        toast.error("Failed to create goal");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/goals"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Goals
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Goal</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' placeholder='Goal Title' className='input input-bordered' value={name} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Goal"}
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
export default CreateGoalPage;