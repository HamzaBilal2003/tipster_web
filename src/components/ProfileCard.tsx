import React from 'react'
import ItemGap from './ItemGap';
import FormatDate from './FormatDate';
import { data } from 'react-router-dom';
import { API_DOMAIN_images } from '../../util/apiConfig';

type props = {
    name: string;
    role?: string;
    id: string;
    profileImage?: string
    subscriber?: number;
    follower?: number;
    isSubcriberActive: boolean;
    Nationality?: string | "Nigeria";
    email?: string;
    password?: string;
    phone?: string;
    dob?: string;
    registerDate?: string;
    onEdit: (showModel: any) => void;
}

const ProfileCard = (props: props) => {
    const ProfileData = [
        {
            "key": "name",
            "value": props.name,
        },
        {
            "key": "Nationality",
            "value": props.Nationality,
        },
        {
            "key": "email",
            "value": props.email,
        },
        {
            "key": "Password",
            "value": props.password?.toString(),
        },
        {
            "key": "phone",
            "value": props.phone,
        },
        {
            "key": "Date of Birth",
            "value": props.dob,
        },
        {
            "key": "Date Register",
            "value": FormatDate(props.registerDate),
        },
        {
            "key": "Vip Status",
            "value": props.isSubcriberActive ? "Active" : 'Inactive',
        }
    ]


    const HandleHide = (lenght: number) => {
        let star = "";
        star = "*".repeat(lenght);
        console.log('====================================');
        console.log(star);
        console.log('====================================');
        return star
    }
    return (
        <div className='shadow-sm shadow-gray-500 grid grid-cols-1 lg:grid-cols-12 rounded-xl'>
            <div className='lg:col-span-4 p-8 flex justify-center'>
                <div className='flex items-center justify-start flex-col gap-2'>
                    <img src={API_DOMAIN_images + props.profileImage} alt='Profile Pic' className='rounded-full w-24 h-24' />
                    <h1 className='text-2xl font-bold'>{props.name}</h1>
                    {props.role && props.role == 'admin' && <h1 className='text-lg text-gray-400'>{props.role}</h1>}

                    {
                        props.role && props.role != 'admin' && <>
                            {/* <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                    <h1 className='text-lg'>{props.follower}</h1>
                                    <h1 className='text-lg font-bold text-gray-400'>Followers</h1>
                                </div>
                                <div className='w-2 h-2 rounded-full bg-[#A52A2A]'></div>
                                <div className='flex items-center gap-1'>
                                    <h1 className='text-lg'>{props.subscriber}</h1>
                                    <h1 className='text-lg font-bold text-gray-400'>Subscriber</h1>
                                </div>
                            </div> */}
                            <div className={`${props.isSubcriberActive ? "bg-[#A52A2A] text-white" : "bg-red-500 text-black"} rounded-full p-2 flex items-center gap-2 justify-center`}>
                                {props.isSubcriberActive ? <i className="bi bi-patch-check"></i> : <i className="bi bi-patch-exclamation"></i>}
                                <span>Subscription</span>
                                {props.isSubcriberActive ? "Active" : 'Inactive'}
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className='lg:col-span-8 bg-gray-50 p-8 flex flex-col lg:flex-row'>
                <div className="grid grid-cols-2 gap-y-12 gap-x-8 w-full">
                    {ProfileData.map((data, index) => (
                        <div key={index} className="flex flex-col">
                            <p className="text-lg capitalize font-semibold text-gray-500">{data.key}</p>
                            <p className="text-xl text-black">
                                {data.key === "Password" ? HandleHide(5) : data.value}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-end items-end w-fit gap-4'>

                    <button
                        className={`w-fit text-nowrap rounded-md capitalize px-4 py-2 cursor-pointer border bg-[#A52A2A] border-[#A52A2A] text-white`}
                        onClick={() => props.onEdit(props)}
                    >
                        Edit Profile
                    </button>
                    <button
                        className={`w-fit text-nowrap rounded-md capitalize px-4 py-2 cursor-pointer border bg-white border-black text-black`}
                        onClick={() => props.onEdit(null)}
                    >
                        Notify
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ProfileCard
