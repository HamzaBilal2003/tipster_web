import React from 'react'
import images from '../../../assets/images';

type props ={
    username: string;
    ProfileImg?:string;
}

const SupportHeader = ({username ,ProfileImg = images.dummyImage}: props) => {
    return (
        <div className='flex p-4 items-center gap-2 shadow-sm shadow-gray-400 rounded-lg mb-4'>
            <img src={ProfileImg} alt={username} className='w-14 h-14 rounded-full' />
            <h1 className='text-2xl'>{username}</h1>
        </div>
    )
}

export default SupportHeader