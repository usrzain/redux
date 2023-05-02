import './App.css'
import Signup from './Components/Register/Signup'
import Login from './Components/Register/Login';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Chat from './Components/Chat/Chat';




function App() {

  axios.defaults.baseURL = 'http://localhost:5000';

  //  for setting cookies from our Api is we use this

  axios.defaults.withCredentials = true

  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>


    </>
  )
}

export default App
