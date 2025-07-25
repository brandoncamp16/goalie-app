import { Dumbbell } from "lucide-react";
import { Award } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import api from "../lib/axios";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      toast.success("Login successful");
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
    }
  };

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />
      <div className='container mx-auto px-4 py-8'>
        <div className='mx-auto'>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4 mx-auto'>Admin Settings</h2>
              {/* <div className="card-actions min-w-full"> */}
                <select class="select select-primary select-lg">
                    <option disabled selected>Select a Theme</option>
                    <option>Light</option>
                    <option>Dark</option>
                </select>
              {/* </div> */}
                <div className="card-actions">
                  <Link to={"/goals"} className='btn btn-primary btn-block btn-lg mx-auto' disabled={loading}>
                    {loading ? "Loading..." : "Goals"}
                    <Award className='size-5' />
                  </Link>
                </div>
                <div className="card-actions">
                  <Link to={"/activities"} className='btn btn-primary btn-block btn-lg mx-auto' disabled={loading}>
                    {loading ? "Loading..." : "Activities"}
                    <Dumbbell className='size-5' />
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;