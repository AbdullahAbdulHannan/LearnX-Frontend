import React, { useRef, useEffect, useState } from "react";
import "./Verify.css";
import { RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/user-context";

const VerifyAccount = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill("")); // State for each OTP digit
  const { btnLoading, verifyOtp, user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0].focus();
    // console.log(user);
    
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key >= 0 && e.key <= 9) {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      setTimeout(() => {
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }, 10);
    } else if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setTimeout(() => {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }, 10);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteOtp = paste.slice(0, 6).split(""); // Only take the first 6 digits
    const newOtp = [...otp];
    pasteOtp.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });
    setOtp(newOtp);
    inputRefs.current[pasteOtp.length - 1].focus(); // Focus on the last entered digit
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const otpString = otp.join(""); // Convert OTP array to string
    await verifyOtp(Number(otpString), navigate);
  };

  return (
    <div className="containe">
      <form onSubmit={submitHandler}>
        <h2>Verify Your Account</h2>
        <p>
          {`We emailed you the six digit code to *********@gmail.com 
          Enter the code below to confirm your email address.`}
        </p>
        <div className="code-container" onPaste={handlePaste}>
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="number"
              className="code text-4xl"
              placeholder="0"
              min="0"
              max="9"
              value={otp[index]} // Bind each input to its corresponding OTP digit
              onChange={() => {}} // Disable direct input change
              required
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <button className="sign" type="submit">
          {btnLoading ? (
            "Please Wait..." + (
              <RotatingLines
                visible={true}
                height="16"
                width="16"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
