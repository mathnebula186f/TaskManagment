import React from 'react'
import {CgNotes} from 'react-icons/cg';
import { MdLabelImportant} from 'react-icons/md';
import {FaCheckDouble} from 'react-icons/fa6';
import {TbNotebookOff} from 'react-icons/tb'
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const data= [
        {
            title:"All Tasks",
            icon:<CgNotes/>,
            link:"/"
        },
        {
            title:"Important Tasks",
            icon: <MdLabelImportant/>,
            link:'/importanttasks'
        },
        {
            title:"Completed Tasks",
            icon:<FaCheckDouble/>,
            link:'/completedtasks',
        },
        {
            title:"Incompleted Tasks",
            icons:<TbNotebookOff/>,
            link:'/incompletetasks',
        },
    ]
  return (
    <>
      <div>
        <h2 className='text-xl font-semibold'> The code Master</h2>
        <h4 className='mb-1 text-gray-400'>tcm@gmail.com</h4>
        <hr/>
      </div>
      <div>
        {data.map((item,i) => (
            <Link to={item.link}  key={i} className='my-2 flex items-center hover:bg-gray-600 transition-all duration-300'>
               {item.icon} &nbsp; {item.title}
            </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-600 w-full p-2 rounded'>Log Out</button>
      </div>
    </>
  )
}

export default Sidebar
