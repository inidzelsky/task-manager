import React from "react";

import Tasks from "../tasks/Tasks";
import TasksForm from "../tasks/TasksForm";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <TasksForm />
      </div>
      <div>
        <Tasks />
      </div>
    </div>
  );
};

export default Home;
