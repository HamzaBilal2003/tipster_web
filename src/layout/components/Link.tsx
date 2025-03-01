import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SubLink {
  name: string;
  link: string;
  icon?: string;
}

interface LinkCompProps {
  name: string;
  link: string;
  sub?: SubLink[];
  isActiveCheck: boolean;
  icon: string;
  onClick: () => void;
}

const LinkComp: React.FC<LinkCompProps> = ({
  name,
  link,
  sub = [],
  isActiveCheck,
  icon,
  onClick,
}) => {
  console.log("The Icon is", icon);
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(isActiveCheck);

  useEffect(() => {
    if (
      location.pathname === link ||
      sub.some((subItem) => location.pathname === subItem.link)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.pathname, link, sub]);

  return (
    <div>
      <div className="px-4 relative">
        <Link
          to={link}
          onClick={onClick}
          className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer  ${isActive
            ? "bg-[#161616]"
            : "bg-transparent"
            }`}
        >
          <div className="flex items-center gap-3">
            <img src={icon} alt={`${name} icon`} className="w-[30px]" />
            <span className="capitalize font-semibold">{name}</span>
          </div>
          {sub.length > 0 && (
            <i className="bi bi-plus-square 2xl"></i>
          )}
        </Link>
      </div>
      {isActive && sub.length > 0 && (
        <div
          className={`sublinks relative flex flex-col gap-2 mt-4 animate-slide-down`}
        >
          <div className="absolute left-0 top-0 h-[78%] w-[2px] bg-[#257355]"></div>
          {sub.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                className={`flex items-center gap-2 
                  text-lg ${location.pathname === item.link ? "text-[#44efad]" : ""} relative`}
              >
                  <div className="absolute left-0 top-1/2 h-[2px] w-[20px] bg-[#257355]"></div>
                <i className={`${item.icon} 2xl pl-1`}></i>
                  <span className="capitalize font-semibold">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkComp;
