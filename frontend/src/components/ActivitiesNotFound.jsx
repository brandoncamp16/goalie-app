import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const ActivitiesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No activities yet</h3>
      <p className="text-base-content/70">
        No activities found! Create your first activity to start using Goalie.
      </p>
      <Link to="/createActivity" className="btn btn-primary">
        Create Your First Activity
      </Link>
    </div>
  );
};
export default ActivitiesNotFound;