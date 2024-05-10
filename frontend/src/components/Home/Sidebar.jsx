import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const [Data, setData] = useState();
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <MdLabelImportant />,
      link: "/importanttasks",
    },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      link: "/completedtasks",
    },
    {
      title: "Incompleted Tasks",
      icons: <TbNotebookOff />,
      link: "/incompletetasks",
    },
  ];
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };
  const headers = { id: localStorage.getItem("id") };
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-all-tasks",
          {
            headers,
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching all tasks in sidebar=", error);
      }
    };
    fetch();
  },[]);
  return (
    <>
      {Data && (
      <div>
        <h2 className="text-xl font-semibold"> {Data.username}</h2>
        <h4 className="mb-1 text-gray-400">{Data.email}</h4>
        <hr />
      </div>
    )}

      <div>
        {data.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 transition-all duration-300"
          >
            {item.icon} &nbsp; {item.title}
          </Link>
        ))}
      </div>
      <div>
        <button onClick={logout} className="bg-gray-600 w-full p-2 rounded">
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
