import { useEffect, useState } from "react";
import './App.css'
import Form from "./components/Form";
import Task from "./components/Task";
import axios from 'axios';
import { ToastContainer, } from 'react-toastify';


export default function App() {

  const[task, setTasks] = useState([])
  const getTask = () =>{
    axios.get('http://localhost:8000/task')
    .then(({data}) => setTasks(data))
    .catch((e) => console.log(e))
  }

  useEffect(() => {
    getTask()
  }, [])

  return (
    <>
      <Form getTask={getTask}/>
      <Task task={task} getTask={getTask}/>
      <ToastContainer theme="dark"/>
    </>
  )
}
