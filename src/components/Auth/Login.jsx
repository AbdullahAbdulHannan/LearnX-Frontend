import React, { useState } from 'react';
import './AuthForm.css';
import { FaBookOpen } from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/user-context";
import { CourseData } from "../context/course-context";

const Login = () => { 
  const navigate = useNavigate();
  const { btnLoading, loginUser,user } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  }; 
  return (
    <div>
     <div className="logo mb-1 flex ms-[25%] md:!ms-[40%] mt-8 md:mt-0 text-myBlue ">
         <FaBookOpen size={65}/>
         <span className=' font-extrabold text-4xl mt-3  ms-2 text-center'>LearnX</span>
        </div>
<div className='w-[100%] md:w-[45%] font-sans bg-teal-300 text-myBlue block ps-5 md:ms-48'>
  <h1 className='text-lg'>Testing Email and Password:</h1>
  <p>Admin Email: <span className='font-bold'>admin@admin.com</span></p>
  <p>Student Email: <span className='font-bold'>student@student.com</span></p>
  <p>Password (for both admin and student): <span className='font-bold'>12345678</span></p>
  <p className='font-semibold'>OR Signup with your email you will get a verification code, verify your email and proceed</p>
</div>
      <div className='shadow-lg shadow-gray-500/50 ms-[1em] mb-[1em] me-[1em] mt-4  flex '>
        <div className="form-container md:!w-[55%] w-full rounded-tl-md rounded-bl-md">
          <p className="title">
             Sign In</p>
          <form className="form" onSubmit={submitHandler}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-group mb-4">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder=""  value={password}
            onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className="sign" type='submit'> {btnLoading ? "Please Wait..." : "Login"}</button>
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
          <p className="signup">Don't have an account?
            <Link to="/register">Signup</Link>
          </p>
        </div>
        <img src="/images/download.jpeg" alt="" className='w-[45%] rounded-tr-md rounded-br-md me-5 hidden md:block
        ' />
      </div></div>
  );
};

export default Login;
