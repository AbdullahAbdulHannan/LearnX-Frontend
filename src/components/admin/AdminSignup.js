import React, { useState } from 'react';
import '../Auth/AuthForm.css';
import { FaBookOpen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from "../context/user-context";
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner';

const AdminRegister = () => {  

  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password,role, navigate);
    // localStorage.setItem(email)
    // console.log(localStorage.setItem(email));
    
  };
  return (
    <div>
     <div className="logo mb-1 flex ms-[25%] md:!ms-[40%] mt-8 text-myBlue ">
         <FaBookOpen size={65}/>
         <span className=' font-extrabold text-4xl mt-3 ms-2 text-center'>LearnX</span>
        </div>
      <div className='shadow-lg shadow-gray-500/50 ms-[1em] mb-[1em] me-[1em] mt-0  flex'>
        <div className="form-container md:!w-[55%] w-full rounded-tl-md rounded-bl-md">
          <p className="title">
             Sign Up</p>
          <form className="form" onSubmit={handleRegister}>
            
              
                <div className='flex gap-7'>
                  <div className="input-group !w-[50%]">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" placeholder=""   value={name}
            onChange={(e) => setName(e.target.value)}/>
                  </div>
                  <div className="input-group !w-[50%]">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" placeholder="" />
                  </div>
                </div>
                
              
           
            <div className="input-group">
              <label htmlFor="role">Role</label>
              <input type="text" name="role" id="role" placeholder=""  value={role} disabled
            />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder=""  value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-4">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder=""  value={password}
        onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="sign" type='submit'>{btnLoading?<RotatingLines
        visible={true}
        height="16"
        width="16"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        strokeColor="white"
        />:"Sign Up" }</button>
          </form>
          <p className="signup">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
          <p className="signup">
            Register as Student?
            <Link to="/register">Click Here</Link>
          </p>
        </div>
        <img src="/images/download.jpeg" alt="" className='w-[45%] rounded-tr-md rounded-br-md me-5 hidden md:block
        ' />
      </div></div>
  );
};

export default AdminRegister;
