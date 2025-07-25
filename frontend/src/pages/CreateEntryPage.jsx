import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CreateEntryPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchActivities = async() => {
    const res = await axiosPrivate.get("/activities");
    // console.log(res.data);
    setActivities(res.data);
  }
  useEffect(() => {
    fetchActivities()
  },[])

  const navigate = useNavigate();

  const handleSelect = (e) => {
      // console.log(e.target.value)
      const { value, checked } = e.target;

      if (checked) {
        setSelectedActivities(prevSelectedActivities => [...prevSelectedActivities, value]);
      } else {
        setSelectedActivities(prevSelectedActivities =>
          prevSelectedActivities.filter(item => item !== value)
        );
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axiosPrivate.post("/entries", {
        title,
        content,
        selectedActivities,
      });

      toast.success("Entry created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating entry", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating entries too fast", {
          duration: 4000,
          icon: "🛑",
        });
      } else {
        toast.error("Failed to create entry");
      }
    } finally {
      setLoading(false);
      console.log(selectedActivities);
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Entries
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Entry</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' placeholder='Entry Title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Write your entry here...' className='textarea textarea-bordered h-32' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {console.log(activities)}
                  {activities.map((index, value) => (
                    <div className="card bg-neutral text-neutral-content w-48 mx-auto">
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">{activities[value]["name"]}</h2>
                        {/* <p>{activities[value]["_id"]}</p> */}
                        <div className="card-actions justify-end">
                          <input type="checkbox" className="checkbox" value={activities[value]["_id"]} onChange={(e) => handleSelect(e)}/>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-actions justify-end mt-6">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Entry"}
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
export default CreateEntryPage;