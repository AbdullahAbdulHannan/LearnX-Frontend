import React, { useState } from 'react';
import './AuthForm.css';
import { FaBookOpen } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from "../context/user-context";
import axios from 'axios'
import { RotatingLines } from 'react-loader-spinner';

const Register = () => {  

  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password,null, navigate);
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
          {/* <div className="social-message">
            <div className="line"></div>
            <p className="message">Sign up with social accounts</p>
            <div className="line"></div>
          </div>
          <div className="social-icons">
            <button aria-label="Log in with Google" className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
              </svg>
            </button>
            <button aria-label="Log in with Facebook" className="icon">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
    <path d="M29 0h-26c-1.656 0-3 1.344-3 3v26c0 1.656 1.344 3 3 3h14v-11.344h-3.828v-4.656h3.828v-3.406c0-3.826 2.344-5.922 5.766-5.922 1.64 0 3.047 0.122 3.453 0.177v4h-2.368c-1.86 0-2.218 0.883-2.218 2.18v2.969h4.438l-0.578 4.656h-3.859v11.344h7.547c1.656 0 3-1.344 3-3v-26c0-1.656-1.344-3-3-3z"></path>
  </svg>
</button>

          </div> */}
          <p className="signup">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
          <p className="signup">
            Register as Admin?
            <Link to="/admin-register">Click Here</Link>
          </p>
        </div>
        <img src="/images/download.jpeg" alt="" className='w-[45%] rounded-tr-md rounded-br-md me-5 hidden md:block
        ' />
      </div></div>
  );
};

export default Register;
