import React from "react";
import Cookies from "js-cookie";
import { API_DOMAIN_images } from "../../../util/apiConfig";

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = () => {
  const userData = JSON.parse(Cookies.get('user') as string);
  return (
    <div className="flex items-center gap-2">
      <img src={`${API_DOMAIN_images+ (userData?.profile_picture).replace('https://tipster.hmstech.org/storage/','')}`} alt="profile" className="w-14 h-14 rounded-full" />
      <div>
        <h4 className="text-lg font-bold">Hey, {userData?.username}</h4>
      </div>
    </div>
  );
};

export default Profile;
