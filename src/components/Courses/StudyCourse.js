import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../context/course-context";
import { server } from "../../index";
import { UserData } from "../context/user-context";
import { Appbar } from "../Navbar";

const CourseStudy = () => {
  const params = useParams();
  const { user } = UserData();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  // if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
  //   return navigate("/");
  // }

  // useEffect(() => {
  //   fetchCourse(params.id);
  // }, [fetchCourse, params.id]);

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");  // If user is not admin or doesn't have subscription, redirect.
    } else {
      fetchCourse(params.id);  // Otherwise, fetch the course.
    }
  }, [user, params.id, navigate, fetchCourse]);
  return (
    <>
    <Appbar/>
      {course && (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Course Image and Title */}
          <div className="text-center">
            <img
              src={`${server}/${course.image}`}
              alt={course.title}
              className="mx-auto w-64 rounded-lg shadow-md"
            />
            <h2 className="text-3xl font-bold text-gray-800 mt-4">
              {course.title}
            </h2>
          </div>

          {/* Course Description and Details */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">
            <p className="text-lg text-gray-600">{course.description}</p>
            <h5 className="text-md text-gray-700">
              <span className="font-semibold">Instructor:</span> {course.createdBy}
            </h5>
            <h5 className="text-md text-gray-700">
              <span className="font-semibold">Duration:</span> {course.duration} weeks
            </h5>
          </div>

          {/* Lectures Button */}
          <div className="text-center">
            <Link
              to={`/lectures/${course._id}`}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Lectures
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
