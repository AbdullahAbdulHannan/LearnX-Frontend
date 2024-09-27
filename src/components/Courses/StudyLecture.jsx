import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import {IoMdArrowRoundBack} from 'react-icons/io'
import { server } from '../..';

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLecture, setLoadingLecture] = useState(false);
  const params = useParams();
  // Function to fetch all lectures for the course
  const fetchLectures = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
    } catch (error) {
      toast.error('Failed to fetch lectures');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single lecture by ID
  const fetchLecture = async (lectureId) => {
    setLoadingLecture(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${lectureId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setSelectedLecture(data.lecture);
    } catch (error) {
      toast.error('Failed to fetch lecture');
    } finally {
      setLoadingLecture(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [params.id]);

  return (
    <>
    <div className="bg-white shadow-lg shadow-myBlue py-4 px-5 ">
    <Link to={'/admin-dash'}><IoMdArrowRoundBack size={24} className="cursor-pointer"/></Link>
    </div>
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Lectures</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
         <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lectures.length > 0 ? (
            lectures.map((lecture) => (
              <div
              key={lecture._id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer transition transform hover:scale-105 hover:bg-gray-50"
                onClick={() => fetchLecture(lecture._id)}
              >
                <h3 className="text-xl font-semibold mb-2">{lecture.title}</h3>
                <p className="text-gray-600">{lecture.description}</p>
              </div>
            ))
        ) : (
            <p className="text-center text-gray-500">No lectures available</p>
          )}
        </div>
      )}

      {loadingLecture ? (
          <div className="flex justify-center items-center h-32">
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : selectedLecture && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">{selectedLecture.title}</h2>
          <div className="mt-4">
            <video
              className="w-full rounded-lg"
              src={`${server}/${selectedLecture.video}`}
              controls
            />
          <p className="mt-2 text-gray-600">Description:<br/>{selectedLecture.description}</p>
          </div>
        </div>
      )}
    </div>
      </>
  );
};

export default LectureList;
