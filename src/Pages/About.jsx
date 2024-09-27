import React from "react";
import { Appbar } from "../components/Navbar";
import { UserData } from "../components/context/user-context";
import { AdminAppbar } from "../components/admin/AdminNav";

const About = () => {
  const {user}=UserData()
  return (
    <>
    {user && user.role!=='admin'?<Appbar/> :<AdminAppbar/>} 
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <header className="bg-myBlue text-white py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-lg mt-4">Learn more about our mission, vision, and the team behind LearnX</p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            At LearnX, our mission is to make high-quality education accessible to everyone, everywhere. 
            We are committed to empowering learners of all ages with the tools and knowledge they need 
            to succeed in today’s fast-paced world.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Our vision is to create a global community of lifelong learners, connected through the power of technology. 
            We believe that education should be flexible, affordable, and tailored to the individual needs of students.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member 1"
              />
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member 2"
              />
              <h3 className="text-xl font-semibold">Jane Smith</h3>
              <p className="text-gray-600">Chief Learning Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src="https://via.placeholder.com/150"
                alt="Team Member 3"
              />
              <h3 className="text-xl font-semibold">Mark Wilson</h3>
              <p className="text-gray-600">Head of Product Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="bg-myBlue text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold">Ready to Join Us?</h2>
          <p className="mt-4">Be a part of our mission to revolutionize learning. Sign up today!</p>
          <button className="mt-6 bg-white text-myBlue py-2 px-6 rounded-full font-medium">
            Get Started
          </button>
        </div>
      </footer>
    </div>
                </>
  );
};

export default About;
