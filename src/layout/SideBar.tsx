import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Removed useNavigate as it's not used
import LinkComp from "./components/Link";
import images from "../assets/images";
import { Sidebar_links } from "../assets/Data";

interface SidebarProps {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SidebarLink {
    name: string;
    link: string;
    icon: string;
    sublinks?: SidebarLink[];
  }

const Sidebar: React.FC<SidebarProps> = ({ setMobileOpen }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState<string>("/dashboard");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`bg-theme-dark text-white overflow-auto h-screen w-[300px] relative`}
    >
      {/* Close button for mobile */}
      <div className="lg:hidden absolute right-2 top-2 z-[1]">
        <button
          className="text-xl cursor-pointer mx-4 mt-2"
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>
      </div>
      {/* Sidebar content */}
      <div className="pl-4 flex items-center justify-center bg-[#151515] min-h-[74px] relative rounded-b-4xl shadow shadow-[#383838]">
        <Link to="/dashboard">
          <h1 className="text-xl md:text-2xl font-extrabold flex items-center justify-center gap-2 w-full text-theme-bright-light">
            <img src={images.logo} alt="Logo" className="w-1/2 h-auto" />
          </h1>
        </Link>
      </div>
      {/* Menu */}
      <div className="pt-4">
        <nav className="flex flex-col gap-4">
          {Sidebar_links.map((x, index) => (
            <LinkComp
              key={index}
              name={x.name}
              link={x.link}
              icon={x.icon}
              sub={x.sublinks}
              isActiveCheck={activeLink === x.link}
              onClick={() => setActiveLink(x.link)} // Set active link on click
            />
          ))}
        </nav>
      </div>
      <div className="p-4 mt-4 flex items-center justify-center">
        <button className="flex items-center p-2 gap-2 text-[#FF0000] font-bold rounded-lg w-full">
          <img src={images.sidebarIcons.logout} alt="logout" className={"w-[30px]"} />
          <span className="text-xl">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
