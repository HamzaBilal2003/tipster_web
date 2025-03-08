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
import Loarder from '../../components/Loarder'

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
    queryKey: ['usersProfile'],
    queryFn: () => fetchSingleUsers(token, username),
    refetchInterval: 1000 * 60 * 5,
  })
  console.log(ResponseData);
  console.log("user data", ResponseData?.data.user)
  const userData = ResponseData?.data.user;
  // extract user and get all 
  const TableData = ResponseData?.data

  const handleSaveUser = (userData: any) => {
    console.log('Saving user data:', userData);
  };
  if (isLoading) return <Loarder/>
  return (
    <div className='flex flex-col gap-6'>
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
        {selectedUser &&  <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          userData={selectedUser}
          isEdit={isEditMode}
          dataFetchName={'usersProfile'}
        />}
    </div>
  )
}

export default UserProfile