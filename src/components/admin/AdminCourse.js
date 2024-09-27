import React, { useState } from "react";
import { CourseData } from "../context/course-context";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../index";
import CourseCard from "../Courses/CourseCard";
import "./AdminCourse.css"; 
import { Appbar } from "../Navbar";
import { IoMdAdd } from "react-icons/io";
const categories = [
  "Web Development",
  "App Development",
  "Game Development",
  "Data Science",
  "Artificial Intelligence",
];

const AdminCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");//dfgdfg
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // New state to manage drawer visibility

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setDuration("");
      setImagePrev("");
      setCreatedBy("");
      setPrice("");
      setCategory("");
      setDrawerOpen(false); // Close drawer after submission
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false)
    }
  };

  return (
    <>
    {/* <Appbar/> */}
    <div className="admin-courses">
      <div className="left">
        <h1>All Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 me-3">
          {courses && courses.length > 0 ? (
            courses.map((e) => {
              return (
                <div key={e._id}>
                  <CourseCard course={e} />
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 !text-center">No Courses Yet</p>
          )}
        </div>
      </div>

      <button className="open-drawer-btn flex justify-center" onClick={() => setDrawerOpen(true)}>
      <IoMdAdd className="mr-2" />Add Course
      </button>

      <div className={`right-drawer ${drawerOpen ? "open" : ""}`}>
        <div className="add-course">
          <div className="course-form">
            <button className="close-drawer-btn" onClick={() => setDrawerOpen(false)}>
              X
            </button>
            <h2>Add Course</h2>
            <form onSubmit={submitHandler}>
              <label htmlFor="text">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label htmlFor="text">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              

              <label htmlFor="text">Created By</label>
              <input
                type="text"
                value={createdBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                required
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}>Select Category</option>
                {categories.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
              </select>

              <label htmlFor="text">Duration</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />

              <input type="file" required onChange={changeImageHandler} />
              {imagePrev && <img src={imagePrev} alt="" width={300} />}

              <button
                type="submit"
                disabled={btnLoading}
                className="common-btn"
              >
                {btnLoading ? "Please Wait..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default AdminCourses;
