import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const headers = { id: localStorage.getItem("id") };
  const submitData = async () => {
    try {
      if (Data.title === "" || Data.desc === "") {
        alert("All Fields are required!!");
        return;
      }
      console.log("here are the headers",headers);
      const response = await axios.post(
        "http://localhost:1000/api/v2/create-task",
        Data,
        {
          headers,
        }
      );
      console.log("Successfully created the Task=",response);
      window.location.reload();
    } catch (error) {
      console.log("Error creating folder=",error)
    }
  };
  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-700 opacity-50 h-screen w-full`}
      >
        {" "}
      </div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center  justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900  p-4 rounded">
          <div className="flex justify-end">
            <button onClick={() => setInputDiv("hidden")} className="text-2xl">
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Description..."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={submitData}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
