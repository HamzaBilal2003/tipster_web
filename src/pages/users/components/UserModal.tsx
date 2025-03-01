import React, { useState } from "react";
import images from "../../../assets/images";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  userData?: any;
  isEdit?: boolean;
}

const nationalities = [
  "American",
  "British",
  "Canadian",
  "Chinese",
  "French",
  "German",
  "Indian",
  "Pakistani",
  "Japanese",
  "Mexican"
];

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userData = null,
  isEdit = false,
}) => {
  console.log(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: userData?.name || "",
    email: userData?.email || "",
    dateOfBirth: userData?.dob || "",
    nationality: userData?.nationality || "",
    password: "",
    phone: userData?.phone || "",
    profileImage: images.dummyImage,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000005e] max-h-screen z-[500] py-[50px] overflow-auto">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{isEdit ? "Edit user" : "Add new user"}</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
            <i className="bi bi-x-circle text-2xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Profile Image Upload */}
            <div className="flex justify-center relative">
              <label className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full rounded-lg object-cover" />
                ) : (
                  <i className="bi bi-person-circle text-6xl"></i>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full p-4 bg-gray-100 rounded-lg"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full p-4 bg-gray-100 rounded-lg"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-lg"
              />
            </div>

            {/* Nationality Dropdown */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-4 bg-gray-100 rounded-lg appearance-none"
              >
                <option value="">Select nationality</option>
                {nationalities.map((nation) => (
                  <option key={nation} value={nation}>
                    {nation}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-4 bg-gray-100 rounded-lg"
                  required={!isEdit}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <i className="bi bi-eye-slash text-xl"></i> : <i className="bi bi-eye text-xl"></i>}
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <button type="submit" className="cursor-pointer w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-medium">
              {isEdit ? "Save Changes" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
