import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { server } from '../..';
import { UserData } from '../context/user-context';
import './CourseCard.css'; // New CSS file for styling
import toast from 'react-hot-toast';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { FaBookMedical, FaBookReader } from "react-icons/fa";
import LectureFormModal from './LectureModal'; // Adjust the path as needed

const CourseCard = ({ course }) => {
  const { user } = UserData();
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const handleDelete = async () => {
    try {
      setLoading(true); // Start loading state
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("User is not logged in. Token missing.");
      }
  
      // Make the delete request with authorization token
      await axios.delete(`${server}/api/course/${course._id}`, {
        headers: {
          token,
        },
      });
  
      toast.success("Deleted Successfully!");
      navigate(0)
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed. Please try again.");
      console.error(error);
    }
   
  };
  
  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      if (!token) {
        throw new Error("User is not logged in. Token missing.");
      }

      const { data } = await axios.post(
        `${server}/api/course/enroll/${course._id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      toast.success("Enrollment successful!");
      setLoading(false);
      navigate(0)
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed. Please try again.");
      console.log(error, "dfs");
      
      setLoading(false);
    }
  };

  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt={course.title} className="course-card-image" />
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-description italic !text-gray-400">{course.category}</p>
        <p className="course-card-description italic !text-sm !text-gray-400 mt-10">Created by: {course.createdBy}</p>
        <div className="course-card-actions">
          {user && user.role !== 'admin' ? (
            <div>
              {user && user.subscription && user.subscription.includes(course._id) ? (
                <Link to={`/course-lectures/${course._id}`}>
                <button
                  // onClick={() => navigate(`/course-enrolled/${course._id}`)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors ms-2 mt-2 w-40 flex justify-center"
                  >
                  <FaBookReader className='mr-2' /> Study
                </button>
                  </Link>
              ) : (
                <button
                  onClick={checkoutHandler}
                  className="bg-myBlue text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors ms-2 mt-2 w-40 flex justify-center">
                  <FaBookMedical className='mr-2' /> Enroll Now
                </button>
              )}
              <Link to={`/course-details/${course._id}`}>
                <button className="btn view-details-btn ms-2 mt-2 w-40 flex justify-center">
                  <TbListDetails className='mr-2' /> View Details
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <Link to={`/course/${course._id}/add-lectures`}>
              <button
                className="btn add-lec-btn ms-2 mt-5 w-40 !bg-myBlue flex items-center justify-center">
                <IoMdAdd className="mr-2" /> Add Lec
              </button></Link>
              <button className="btn delete-btn ms-2 mt-2 w-40 flex items-center justify-center" onClick={handleDelete}>
                <RiDeleteBin6Line className="mr-2" /> {loading? "Deleting..." :"Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for adding lecture */}
      <LectureFormModal
        courseId={course._id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal function
      />
    </div>
  );
};

export default CourseCard;
