import { Tabs } from "flowbite-react";
import { HiClipboardList, } from "react-icons/hi";
import { MdOutlineOndemandVideo  } from "react-icons/md";
import { FaBookOpen,FaBullhorn } from "react-icons/fa";
import { SiScikitlearn } from "react-icons/si";
import CourseEnrolled from "../Courses/CourseEnrolled";

function Tab() {
  return (
    <div className="overflow-x-auto">

      <Tabs aria-label="Full width tabs" variant="fullWidth" className="focus:!ring-myBlue">
        <Tabs.Item active title="Courses Enrolled" icon={FaBookOpen} className="!ps-5 focus:!ring-myBlue">
          <CourseEnrolled/>
        </Tabs.Item>
        <Tabs.Item title="Lessons" icon={SiScikitlearn}>
          This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Video Lectures" icon={MdOutlineOndemandVideo }>
          This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        <Tabs.Item title="Announcements" icon={FaBullhorn}>
          This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
          Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling.
        </Tabs.Item>
        
      </Tabs>
    </div>
  );
}
export default Tab;