import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const GoalsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No goals yet</h3>
      <p className="text-base-content/70">
        No journal goals found! Create your first goal to start using Goalie.
      </p>
      <Link to="/createGoal" className="btn btn-primary">
        Create Your First Goal
      </Link>
    </div>
  );
};
export default GoalsNotFound;