import React from 'react'
import {CiHeart} from 'react-icons/ci';
import {FaEdit} from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {IoAddCircleSharp} from 'react-icons/io5';

const Cards = () => {
    const data=[
        {
            title:"Hell1",
            desc:"Hehheheh1"
        },
        {
            title:"Hell2",
            desc:"Hehheheh2"
        },
        {
            title:"Hell3",
            desc:"Hehheheh3"
        },
        {
            title:"Hell4",
            desc:"Hehheheh4"
        }
        
    ]
  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data && data.map((item,i)=>(
        <div className='flex flex-col justify-between bg-gray-800 rounded-sm p-4'>
        <div > 
        <h3 className='text-xl font-semibold'>{item.title}</h3>
            <p className='text-gray-300 my-2'>{item.desc}</p>
        </div>
        <div className='mt-4 w-full flex items-center'>
            <button className='bg-red-400 p-2 rounded w-3/6'>InCompleted</button>
            <div className='text-white p-2 w-3/6 text-2xl font-semibold justify-around'>
                <button><CiHeart/></button>
                <button><FaEdit/></button>
                <button><MdDelete/></button>
            </div>
            </div>
        </div>
      ))}
      <div className='flex flex-col text-gray-300 justify-center item-center bg-gray-800 rounded-sm p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300'>
        <IoAddCircleSharp className='text-5xl'/>
        <h2 className='text-2xl '>Add Task</h2>
      </div>
    </div>
  )
}

export default Cards
