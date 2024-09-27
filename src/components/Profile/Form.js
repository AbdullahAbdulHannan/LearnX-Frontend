import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RiPencilFill } from "react-icons/ri";
import CountrySelector from "./CountrySelect";
export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <>
    <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
      <div className="absolute right-10 ">
     <RiPencilFill size={24} fill="darkblue"/>
      </div>
      <h5 className="text-xl font-semibold mb-6 !text-[#131365]">General Information</h5>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="Enter your first name" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="Also your last name" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">Birthday</label>
            <Datetime
              timeFormat={false}
              onChange={setBirthday}
              renderInput={(props, openCalendar) => (
                <div className="relative">
                  <input
                    {...props}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                    placeholder="mm/dd/yyyy"
                    value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                    onFocus={openCalendar}
                    onChange={() => { }}
                  />
                  <FontAwesomeIcon icon={faCalendarAlt} className="absolute right-3 top-3 text-gray-500" />
                </div>
              )}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select id="gender" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2">
              <option value="0">Gender</option>
              <option value="1">Female</option>
              <option value="2">Male</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="name@company.com" />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="number" id="phone" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="+12-345 678 910" />
          </div>
        </div>

        <h5 className="text-xl font-semibold my-4 !text-[#131365]">Address</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="address" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="Enter your home address" />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="City" />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <CountrySelector/>
            {/* <select id="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2">
              {/* Add state options here */}
            {/* </select> */} 
          </div>
          <div>
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP</label>
            <input type="tel" id="zip" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2" placeholder="ZIP" />
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="w-full !bg-myBlue text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#393998] focus:ring-2 focus:ring-[darkblue] focus:ring-offset-2 transition ease-in-out duration-150">Save Profile</button>
        </div>
      </form>
    </div>
    </>
  );
};
