import React, { useEffect, useState } from 'react';
import Content from '../../components/Dashboard/Content';
import '../../components/Dashboard/Dashboard.css';
import Tab from '../../components/Dashboard/Tabs';

import Sidebar from './Admin-Dash';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/user-context';
import axios from 'axios';
import { server } from '../..';
import { AdminAppbar } from './AdminNav';
import AdminCourses from './AdminCourse';
import Users from './UserDisplay';
import { ProfileDropdown } from '../Dashboard/ProfileDropdown';
import AnnouncementForm from './Announcement';


const AdminDashboard = () => {
 
  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  const{user}=UserData()
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Redirect if user is not admin
  // useEffect(() => {
  //   if (user) {
  //     if (user.role !== 'admin') {
  //       navigate('/');
  //     }
  // }}, [user, navigate]);

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('Check Status'); // State to track selected content

  const handleLinkClick = (content) => {
    setSelectedContent(content); 
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Check Status':
        return   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:mt-40">
        <div className="box bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold">Total Courses</p>
          <p className="text-4xl font-bold mt-2">{stats.totalCourse}</p>
        </div>
        <div className="box bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold">Total Lectures</p>
          <p className="text-4xl font-bold mt-2">{stats.totalLectures}</p>
        </div>
        <div className="box bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold">Total Users</p>
          <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
        </div>
      </div>
      case 'Manage Courses':
        return <AdminCourses/>;
      case 'Users':
        return <Users/>;
      // case 'tools':
      //   return <div>Tools Content</div>;
      case 'make announcement':
        return <AnnouncementForm/>;
      // case 'settings':
      //   return <div>Settings Content</div>;
      // case 'signout':
      //   return <div>Signing out...</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };
//
  return (
    <div className="App">
      {/* Pass the state and setter to the Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLinkClick={handleLinkClick} activeLink={selectedContent}/>

      {/* Conditionally apply margin based on isSidebarOpen */}
      <div className={`${isSidebarOpen ? 'md:ms-[288px]' : ''} transition-all duration-300 `} >
        <div className='flex flex-row-reverse'>
      <ProfileDropdown/>
        <AdminAppbar />
        </div>
        {/* <Content /> */}
        <div id="content">
          {/* Render the content based on the selected link */}
          {renderContent()}
          {/* <Tab /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
