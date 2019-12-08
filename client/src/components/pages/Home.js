import React, { useContext, useEffect } from "react";

import Tasks from "../tasks/Tasks";
import TasksForm from "../tasks/TasksForm";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    
    //eslint-disable-next-line
  }, []);

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
