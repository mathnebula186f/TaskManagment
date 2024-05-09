import React from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Alltasks from './pages/Alltasks'
import ImportantTasks from './pages/ImportantTasks'
import CompeletedTasks from './pages/CompeletedTasks'
import IncompleteTasks from './pages/IncompleteTasks'

const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-2'>
      <Router>
        <Routes>
        <Route  exact path='/' element={<Home/>}>
        <Route index element={<Alltasks/>}/>
        <Route path='/importanttasks' element={<ImportantTasks/>}/>
        <Route path='/completedtasks' element={<CompeletedTasks/>}/>
        <Route path='/incompletetasks' element={<IncompleteTasks/>}/>
        </Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
