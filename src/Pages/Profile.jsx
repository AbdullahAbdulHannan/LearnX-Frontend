import React, { useState } from 'react';

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    name: 'Adam Luxor',
    title: 'VP of User Experience',
    department: 'Product',
    location: 'Atlanta',
    company: 'BetterCloud',
    manager: 'Emily Morgan',
    workPhone: '404-555-1212',
    mobilePhone: '404-555-6789',
    alias: 'adam.luxor@companyname.com',
    otherEmail: 'adaml@someothercompany.com',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{editMode ? 'Edit Profile' : 'User Profile'}</h2>
          <button
            className="text-blue-500 font-medium"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex mt-8 gap-6">
          <div className="w-1/3">
            <img
              src="https://lh3.googleusercontent.com/-W2XryVdi-lA/U6tSAh3SsbI/AAAAAAAAFGY/ZHJiUEcR_Zs/w480-h480/avatar%2Bmaterial%2Bdesign.png"
              alt="User Avatar"
              className="w-full rounded-full"
            />
          </div>

          <div className="w-2/3 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              {editMode ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              ) : (
                <p className="mt-1">{user.name}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium">Title</label>
              {editMode ? (
                <input
                type="text"
                  name="title"
                  value={user.title}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
              ) : (
                <p className="mt-1">{user.title}</p>
              )}
            </div>

            {/* Department and Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Department</label>
                {editMode ? (
                  <input
                    type="text"
                    name="department"
                    value={user.department}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="mt-1">{user.department}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Location</label>
                {editMode ? (
                  <input
                    type="text"
                    name="location"
                    value={user.location}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="mt-1">{user.location}</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Work Phone</label>
                {editMode ? (
                  <input
                  type="tel"
                  name="workPhone"
                  value={user.workPhone}
                  onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                    />
                ) : (
                  <p className="mt-1">{user.workPhone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile Phone</label>
                {editMode ? (
                  <input
                  type="tel"
                  name="mobilePhone"
                    value={user.mobilePhone}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="mt-1">{user.mobilePhone}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Alias</label>
                {editMode ? (
                  <input
                    type="email"
                    name="alias"
                    value={user.alias}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                    />
                ) : (
                  <p className="mt-1">{user.alias}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Other Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="otherEmail"
                    value={user.otherEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md"
                    />
                  ) : (
                    <p className="mt-1">{user.otherEmail}</p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
                  </>
  );
};

export default ProfilePage;
