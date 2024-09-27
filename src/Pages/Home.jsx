import React from "react";
import { Appbar } from "../components/Navbar";
import { UserData } from "../components/context/user-context";
import { Link } from "react-router-dom";
import { AdminAppbar } from "../components/admin/AdminNav";

const Home = () => {
    const {isAuth,user}=UserData()
  return (
    <>
   {user && user.role!=='admin'?<Appbar/> :<AdminAppbar/>} 
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="bg-myBlue text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to LearnX</h1>
          <p className="text-lg mt-4">Your gateway to mastering new skills from the comfort of your home</p>
         {user && user.role!=='admin' && isAuth? <Link to={'/courses'}><button className="mt-6 bg-white text-myBlue py-2 px-6 rounded-full font-medium">
            Start Learning
          </button></Link>:<Link to={'/register'}><button className="mt-6 bg-white text-myBlue py-2 px-6 rounded-full font-medium">
            Start Learning
          </button></Link>}
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose LearnX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry experts with real-world experience.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Flexible Learning</h3>
              <p className="text-gray-600">Learn at your own pace with our self-paced courses.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Career Focused</h3>
              <p className="text-gray-600">Get the skills you need to boost your career opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Web Development</h3>
              <p className="text-gray-600">Become a full-stack web developer with our hands-on tutorials.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Data Science</h3>
              <p className="text-gray-600">Learn data analysis and machine learning with real-world projects.</p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Digital Marketing</h3>
              <p className="text-gray-600">Master SEO, SEM, and social media marketing for career growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-600">"LearnX helped me change my career and land my dream job!"</p>
              <h4 className="font-semibold mt-4">- John Doe</h4>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-600">"The courses are well-structured and easy to follow."</p>
              <h4 className="font-semibold mt-4">- Jane Smith</h4>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <p className="text-gray-600">"I love the flexibility to learn at my own pace."</p>
              <h4 className="font-semibold mt-4">- Sarah Lee</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="bg-myBlue text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold">Join the Community of Learners</h2>
          <p className="mt-4">Sign up today and start your learning journey.</p>
          <center>
          {user && user.role!=='admin' && isAuth? <Link to={'/courses'}>
          <button className={`mt-6 bg-white text-myBlue py-2 px-6 rounded-full font-medium ${isAuth?"hidden" : "!flex" }`}>
            Get Started
          </button></Link>:<Link to={'/register'}>
          <button className={`mt-6 bg-white text-myBlue py-2 px-6 rounded-full font-medium ${isAuth? "hidden" : "!flex" }`}>
            Get Started
          </button></Link>}
          </center>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Home;
