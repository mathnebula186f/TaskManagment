import React from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Alltasks from "./pages/Alltasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompeletedTasks from "./pages/CompeletedTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Value of isloggedin=",isLoggedIn);

  React.useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    else if (!isLoggedIn) {
      navigate("/signup");
    }
  }, []);
  

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/importanttasks" element={<ImportantTasks />} />
          <Route path="/completedtasks" element={<CompeletedTasks />} />
          <Route path="/incompletetasks" element={<IncompleteTasks />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
