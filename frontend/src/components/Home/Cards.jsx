import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cards = ({ home, setInputDiv, data }) => {
  const [importantButton, setImportantButton] = useState("InComplete");
  const history =useNavigate();

  const headers = { id: localStorage.getItem("id") };

  const handleCompleteTask = async (id) => {
    try {
      const response=await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,{},{headers}
      );
      console.log("here is the respinse of completed task",response)
      window.location.reload();
    } catch (error) {
      console.log("Error while completing task=",error)
    }
  };
  const handleImportant = async (id) => {
    try {
      const response=await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`,{},{headers}
      );
      console.log(response.data.messsage)
      window.location.reload();
    } catch (error) {
      console.log("Error while turning imp task=",error)
    }
  };
  const deleteTask = async (id) => {
    try {
      const response=await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`,{},{headers}
      );
    console.log(response.data.messsage)
      window.location.reload();
    } catch (error) {
      console.log("Error while deleting task=",error)
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((item, i) => (
          <div className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={` ${
                  item.complete === false ? "bg-red-400" : "bg-green-700"
                } p-2 rounded w-3/6`}
                onClick={() => handleCompleteTask(item._id)}
              >
                {item.complete === true ? "Completed" : "InComplete"}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl font-semibold justify-around gap-2">
                <button onClick={()=>handleImportant(item._id)}>
                  {item.important===false?<CiHeart />:<FaHeart className="text-red-500"/>}
                </button>
                <button>
                  <FaEdit />
                </button>
                <button onClick={()=> deleteTask(item._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "false" ? null : (
        <div
          onClick={() => setInputDiv("fixed")}
          className="flex flex-col text-gray-300 justify-center item-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl ">Add Task</h2>
        </div>
      )}
    </div>
  );
};

export default Cards;
