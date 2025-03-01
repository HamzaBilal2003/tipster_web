import React from "react";

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = "Admin", img = "https://randomuser.me/api/portraits/men/1.jpg" }) => {
  return (
    <div className="flex items-center gap-2">
      <img src={img} alt="profile" className="w-14 h-14 rounded-full" />
      <div>
        <h4 className="text-lg font-bold">Hey, {name}</h4>
      </div>
    </div>
  );
};

export default Profile;
