import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseData } from "../context/course-context";
import { ThreeDots } from "react-loader-spinner";
import { Appbar } from "../Navbar";
import { UserData } from "../context/user-context";
import {AdminAppbar} from "../admin/AdminNav"
const CourseDetails = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { fetchCourse, course } = CourseData();
  // const { user } = UserData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      setLoading(true);

      if (!token) {
        throw new Error("User is not logged in. Token missing.");
      }

      const { data } = await axios.post(
        `${server}/api/course/enroll/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      toast.success("Enrollment successful!");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
    {user && user.role!=='admin'?<Appbar/> :<AdminAppbar/>} 
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ThreeDots visible={true} height="80" width="80" color="#4fa94d" />
        </div>
      ) : (
        <>
          {course && (
            <div className="max-w-7xl mx-auto p-6 space-y-8">
              {/* Course Header */}
              <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={`${server}/${course.image}`}
                  alt={course.title}
                  className="w-full md:w-1/2 object-cover"
                />
                <div className="p-6 md:w-1/2 md:mt-36">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Instructor:</span> {course.createdBy}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Duration:</span> {course.duration} weeks
                  </p>
                  <p className="text-gray-700 mb-6">{course.description}</p>

                  {user && user.subscription && user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course-enrolled/${course._id}`)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
                    >
                      Study
                    </button>
                  ) : (
                    <button
                      onClick={checkoutHandler}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>

              {/* Course Overview Section */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Course Overview</h3>
                <p className="text-gray-600 leading-relaxed">
                  This course is designed to give you a comprehensive understanding of {course.title}.
                  You'll learn essential skills and gain hands-on experience through engaging lessons and projects.
                </p>
              </section>

              {/* Course Objectives */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">What You’ll Learn</h3>
                <ul className="list-disc ml-6 space-y-2">
                  <li className="text-gray-600">Understand the core concepts of {course.title}</li>
                  <li className="text-gray-600">Apply knowledge in practical scenarios</li>
                  <li className="text-gray-600">Work on projects to solidify your learning</li>
                  <li className="text-gray-600">Gain a certificate of completion</li>
                </ul>
              </section>

              {/* Course Curriculum */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Curriculum</h3>
                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                  <ul className="space-y-2">
                    <li className="text-gray-700">Module 1: Introduction to {course.title}</li>
                    <li className="text-gray-700">Module 2: Key Concepts and Tools</li>
                    <li className="text-gray-700">Module 3: Hands-on Projects</li>
                    <li className="text-gray-700">Module 4: Advanced Techniques</li>
                  </ul>
                </div>
              </section>

              {/* FAQs */}
              <section>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold">Who is this course for?</h4>
                    <p className="text-gray-600">
                      This course is for anyone looking to gain expertise in {course.title}, whether you're a beginner or
                      looking to expand your knowledge.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold">How long do I have access to the course?</h4>
                    <p className="text-gray-600">
                      Once enrolled, you’ll have lifetime access to the course materials.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-lg font-semibold">Is there a certificate upon completion?</h4>
                    <p className="text-gray-600">Yes, you'll receive a certificate after successfully completing the course.</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDetails;
