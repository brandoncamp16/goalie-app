import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

const EntryDetailPage = () => {
  const [entry,setEntry] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchActivities = async() => {
    const res = await axiosPrivate.get("/activities");
    // console.log(res.data);
    setActivities(res.data);
  }

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

  const { id } = useParams();

  useEffect(() => {
    const fetchEntry = async() => {
      try {
        const res = await axiosPrivate.get(`/entries/${id}`);
        setEntry(res.data);
      } catch (error) {
        console.log("Error in fetching the entry", error);
        toast.error("Failed to fetch the entry"); // Add rate limit check
      } finally {
        setLoading(false);
      }
    };
    fetchEntry();
    fetchActivities();
  },[id]);

const loadActivities = async () => {
  setSelectedActivities(entry.selectedActivities);
};

const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this entry?")) return;

  try {
    await axiosPrivate.delete(`/entries/${id}`);
    toast.success("Entry deleted");
    navigate("/");
  } catch (error) {
    console.log("Error deleting the entry:", error);
    toast.error("Failed to delete entry");
  }
};
const handleSave = async () => {
  if (!entry.title.trim() || !entry.content.trim()) {
    toast.error("Please add a title or content");
    return;
  }

  setSaving(true);

  try {
    await axiosPrivate.put(`/entries/${id}`, entry);
    toast.success("Entry updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error saving the entry:", error);
    toast.error("Failed to update entry");
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
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Entries
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' />
              Delete Entry
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Entry title" className="input input-bordered" value={entry.title} onChange={(e) => setEntry({ ...entry, title: e.target.value })} />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your entry here..." className="textarea textarea-bordered h-32" value={entry.content} onChange={(e) => setEntry({ ...entry, content: e.target.value })} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {console.log(selectedActivities)}
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

export default EntryDetailPage;
