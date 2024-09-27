import React from 'react';
import CourseCard from './CourseCard';
import { CourseData } from '../context/course-context';
import { Appbar } from '../Navbar';
import { UserData } from '../context/user-context';


const Courses = () => {
    const { courses } = CourseData()
    const {user}=UserData()
  return (
    <>
    {/* {user && user.role!=='admin'?<Appbar/> :<AdminAppbar/>}  */}
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e}/>)
        ) : (
          <p className='text-gray-300 text-center'>No Courses Yet!</p>
        )}
      </div>
    </div>
        </>
  );
};

export default Courses;
