import React, { useState } from "react";
import Cards from "../components/Home/Cards";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "axios";

const Alltasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
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
  console.log(Data)
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks}/>}
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default Alltasks;
