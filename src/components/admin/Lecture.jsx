// import React, { useEffect, useState } from "react";
// import "./lecture.css";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../";
// // import Loading from "../../components/loading/Loading";
// import toast from "react-hot-toast";
// import { RotatingLines } from "react-loader-spinner";
// import { UserData } from "../context/user-context";

// const Lecture = () => {
//    const {user}=UserData() 
// //    const {course}=Cour
//   const [lectures, setLectures] = useState([]);
//   const [lecture, setLecture] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lecLoading, setLecLoading] = useState(false);
//   const [show, setShow] = useState(false);
//   const params = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [video, setvideo] = useState("");
//   const [videoPrev, setVideoPrev] = useState("");
//   const [btnLoading, setBtnLoading] = useState(false);
// console.log("params",params.id);


 
//   async function fetchLectures() {
//     try {
//       const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       setLectures(data.lectures);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   async function fetchLecture(id) {
//     setLecLoading(true);
//     try {
//       const { data } = await axios.get(`${server}/api/lecture/${id}`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       setLecture(data.lecture);
//       setLecLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLecLoading(false);
//     }
//   }

//   const changeVideoHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onloadend = () => {
//       setVideoPrev(reader.result);
//       setvideo(file);
//     };
//   };

//   const submitHandler = async (e) => {
//     setBtnLoading(true);
//     e.preventDefault();
//     const myForm = new FormData();

//     myForm.append("title", title);
//     myForm.append("description", description);
//     myForm.append("file", video);

//     try {
//       const { data } = await axios.post(
//         `${server}/api/course/${params.id}`,
//         myForm,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       toast.success(data.message);
//       setBtnLoading(false);
//       setShow(false);
//       fetchLectures();
//       setTitle("");
//       setDescription("");
//       setvideo("");
//       setVideoPrev("");
//     } catch (error) {
//       toast.error(error.response.data.message);
//       setBtnLoading(false);
//     }
//   };

//   const deleteHandler = async (id) => {
//     if (confirm("Are you sure you want to delete this lecture")) {
//       try {
//         const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         });

//         toast.success(data.message);
//         fetchLectures();
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchLectures();
//   }, []);
//   return (
//     <>
//       {loading ? (
//         <RotatingLines
//         visible={true}
//         height="16"
//         width="16"
//         color="grey"
//         strokeWidth="5"
//         animationDuration="0.75"
//         ariaLabel="rotating-lines-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//         strokeColor="white"
//         />
//       ) : (
//         <>
//           <div className="lecture-page">
//             <div className="left">
//               {lecLoading ? (
//                 <RotatingLines
//                 visible={true}
//                 height="16"
//                 width="16"
//                 color="grey"
//                 strokeWidth="5"
//                 animationDuration="0.75"
//                 ariaLabel="rotating-lines-loading"
//                 wrapperStyle={{}}
//                 wrapperClass=""
//                 strokeColor="white"
//                 />
//               ) : (
//                 <>
//                   {lecture.video ? (
//                     <>
//                       <video
//                         src={`${server}/${lecture.video}`}
//                         width={"100%"}
//                         controls
//                         controlsList="nodownload noremoteplayback"
//                         disablePictureInPicture
//                         disableRemotePlayback
//                         autoPlay
//                       ></video>
//                       <h1>{lecture.title}</h1>
//                       <h3>{lecture.description}</h3>
//                     </>
//                   ) : (
//                     <h1>Please Select a Lecture</h1>
//                   )}
//                 </>
//               )}
//             </div>
//             <div className="right">
//               {user && user.role === "admin" && (
//                 <button className="common-btn" onClick={() => setShow(!show)}>
//                   {show ? "Close" : "Add Lecture +"}
//                 </button>
//               )}

//               {show && (
//                 <div className="lecture-form">
//                   <h2>Add Lecture</h2>
//                   <form onSubmit={submitHandler}>
//                     <label htmlFor="text">Title</label>
//                     <input
//                       type="text"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       required
//                     />

//                     <label htmlFor="text">Description</label>
//                     <input
//                       type="text"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       required
//                     />

//                     <input
//                       type="file"
//                       placeholder="choose video"
//                       onChange={changeVideoHandler}
//                       required
//                     />

//                     {videoPrev && (
//                       <video
//                         src={videoPrev}
//                         alt=""
//                         width={300}
//                         controls
//                       ></video>
//                     )}

//                     <button
//                       disabled={btnLoading}
//                       type="submit"
//                       className="common-btn"
//                     >
//                       {btnLoading ? "Please Wait..." : "Add"}
//                     </button>
//                   </form>
//                 </div>
//               )}

//               {lectures && lectures.length > 0 ? (
//                 lectures.map((e, i) => (
//                   <>
//                     <div
//                       onClick={() => fetchLecture(e._id)}
//                       key={i}
//                       className={`lecture-number ${
//                         lecture._id === e._id && "active"
//                       }`}
//                     >
//                       {i + 1}. {e.title}
//                     </div>
//                     {user && user.role === "admin" && (
//                       <button
//                         className="common-btn"
//                         style={{ background: "red" }}
//                         onClick={() => deleteHandler(e._id)}
//                       >
//                         Delete {e.title}
//                       </button>
//                     )}
//                   </>
//                 ))
//               ) : (
//                 <p>No Lectures Yet!</p>
//               )}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Lecture;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";
import { UserData } from "../context/user-context";
import { IoMdArrowRoundBack } from "react-icons/io";
const Lecture = () => {
  const { user } = UserData();
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setvideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
    <div className="bg-white shadow-lg shadow-myBlue py-4 px-5 ">
    <Link to={'/admin-dash'}><IoMdArrowRoundBack size={24} className="cursor-pointer"/></Link>
    </div>
    <div className="container mx-auto p-4">
      <span className="font-bold text-3xl !text-center my-4">ADD LECTURES TO THIS COURSE</span>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md p-4 rounded-lg">
            {lecLoading ? (
              <div className="flex justify-center items-center h-full">
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
              <>
                {lecture.video ? (
                  <div>
                    <video
                      src={`${server}/${lecture.video}`}
                      className="w-full rounded-md"
                      controls
                      controlsList="nodownload noremoteplayback"
                      disablePictureInPicture
                      disableRemotePlayback
                      autoPlay
                    ></video>
                    <h1 className="text-2xl font-bold mt-4">{lecture.title}</h1>
                    <p className="text-gray-600 mt-2">{lecture.description}</p>
                  </div>
                ) : (
                  <h1 className="text-xl font-semibold text-center">
                    Click the lecture to view here
                  </h1>
                )}
              </>
            )}
          </div>

          <div className="bg-white shadow-md p-4 rounded-lg">
            {user && user.role === "admin" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
                onClick={() => setShow(!show)}
              >
                {show ? "Close" : "Add Lecture +"}
              </button>
            )}

            {show && (
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h2 className="text-xl font-semibold mb-4">Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                  />

                  <label className="block mb-2">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    required
                  />
<span>Choose video file:</span>
                  <input
                    type="file"
                    className="w-full mb-4"
                    onChange={changeVideoHandler}
                    required
                  />

                  {videoPrev && (
                    <video
                      src={videoPrev}
                      className="w-full rounded-md mb-4"
                      controls
                    ></video>
                  )}

                  <button
                    disabled={btnLoading}
                    className={`w-full py-2 rounded text-white ${
                      btnLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    type="submit"
                  >
                    {btnLoading ? "Please Wait..." : "Add"}
                  </button>
                </form>
              </div>
            )}

            <div className="space-y-2">
              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <div
                      className={`cursor-pointer ${lecture._id === e._id ? "font-bold text-blue-500" : ""}`}
                      onClick={() => fetchLecture(e._id)}
                    >
                      {i + 1}. {e.title}
                    </div>
                    {user && user.role === "admin" && (
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteHandler(e._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No Lectures Yet!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>

  );
};

export default Lecture;
