import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileCard from '../../components/ProfileCard'
import images from '../../assets/images'
import Main from './portions/Main'
import UserModal from './components/UserModal'
import { fetchSingleUsers } from '../../../util/queries/userManagement'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { SingleUserData } from '../../../util/queries/userManagement'

type userData = SingleUserData['data']['user']
const UserProfile = () => {
  const { username } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const token = Cookies.get('authToken')

  const onEditUser = (userData: userData) => {
    setSelectedUser(userData);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const { data: ResponseData, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchSingleUsers(token, username),
    refetchInterval: 3000
  })
  console.log(ResponseData);
  console.log("user data", ResponseData?.data.user)
  const userData = ResponseData?.data.user;
  // extract user and get all 
  const TableData = ResponseData?.data

  const handleSaveUser = (userData: any) => {
    console.log('Saving user data:', userData);
  };
  return (
    <div className='flex flex-col gap-6'>
      {!isLoading && userData && <>
        <ProfileCard
          name={userData?.username}
          role="user"
          id={userData?.id}
          profileImage={userData?.profile_picture}
          subscriber={userData?.id}
          follower={120}
          isSubcriberActive={userData?.vip_status == "active" ? true : false}
          Nationality={userData?.nationality}
          email={userData?.email}
          password={userData?.username}
          phone={userData?.phone}
          dob={userData?.dob}
          registerDate={userData?.created_at}
          onEdit={onEditUser}
        />
        <Main userId={"1"} DataList={TableData} />
        {!isLoading  && selectedUser &&  <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          userData={selectedUser}
          isEdit={isEditMode}
        />}
      </>
      }
    </div>
  )
}

export default UserProfile