
import {  useState } from 'react';

import axios from 'axios';

import { useNavigate  } from 'react-router-dom';
import Chat from '../Chat/Chat';

export default function Signup() {
  

  const navigate = useNavigate()
 
    
    const [userData, setUserData] = useState({
      userName: '',
      userEmail:'',
      password:''
    })

    const handleChange = (e)=>{
        const ID = e.target.id;

        setUserData(prevState => ({
          ...prevState,
          [ID]: e.target.value
        }));
    
        
        
    }

    const handleSubmit = async (e)=>{
      e.preventDefault()

      await axios.post('/register', userData, { withCredentials: true })
        .then(async(res)=> {

         if( res.status === 201 ){
              handleReset();
              navigate('/')

          }

        }
        )
      };


    function handleReset(){
      setUserData({ userName: '',  userEmail:'',  password:'' });
    }


  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up  your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
               {/*   usrname  */}
          <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                User Name 
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="username"
                  type="text"
                  value={userData.userName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
               {/*    email  */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="userEmail"
                  name="email"
                  type="email"
                  value={userData.userEmail}
                  autoComplete="email"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
               {/*  passowrd  */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
               {/*   submit button  */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>

          </form>

 
        </div>
      </div>
      <Chat />
    </>
  );
  }
