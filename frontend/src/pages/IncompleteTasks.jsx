import React from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const IncompleteTasks = () => {
  const [Data, setData] = React.useState();
  const headers = { id: localStorage.getItem("id") };
  React.useEffect(() => {
    const fetch = async () => {
      console.log("get complete taks called")
      try {
        const response = await axios.get(
          "https://task-managment-ochre.vercel.app/api/v2/get-Incomplete-tasks",
          {
            headers,
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.log("Error fetching Completing tasks in sidebar=", error);
      }
    };
    fetch();
  },[]);
  return (
    <div>
      <Cards home='false' data={Data}/>
    </div>
  )
}

export default IncompleteTasks
