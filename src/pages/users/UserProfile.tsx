import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../../components/ProfileCard'
import images from '../../assets/images'
import Main from './portions/Main'
import UserModal from './components/UserModal'

const UserProfile = () => {
  const { username } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const onEditUser = (userData: any) => {
    setSelectedUser(userData);
    setIsEditMode(true);
    setIsModalOpen(true);
};

const handleSaveUser = (userData: any) => {
    console.log('Saving user data:', userData);
};
  return (
    <div className='flex flex-col gap-6'>
      <ProfileCard
        name="alucard"
        role="user"
        id="1"
        profileImage={images.dummyImage}
        subscriber={120}
        follower={120}
        isSubcriberActive={true}
        Nationality="Nigeria"
        email='example@gmail.com'
        password="shawn123"
        phone="0212312 1232"
        dob="12-2-2025"
        registerDate="12-5-2025"
        onEdit={onEditUser}
      />
      <Main userId={"1"} />
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        userData={selectedUser}
        isEdit={isEditMode}
      />
    </div>
  )
}

export default UserProfile