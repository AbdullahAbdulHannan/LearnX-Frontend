import React from "react";
import { CourseData } from "../context/course-context";
import CourseCard from "./CourseCard";

const CourseEnrolled = () => {
  const { mycourse } = CourseData();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Enrolled Courses</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {mycourse && mycourse.length > 0 ? (

        mycourse.map((e) => <div >
            <CourseCard key={e._id} course={e} />
            </div>)
      ) : (
        <p className="text-gray-300 text-center col-span-full">No course enrolled yet</p>
      )}
    </div>
  </div>
  );
};

export default CourseEnrolled;