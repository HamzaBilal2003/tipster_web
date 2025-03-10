import React, { useEffect, useState } from 'react'
import StatsCard from '../../components/StatsCard'
import images from '../../assets/images'
import PostTable from './components/PostTable'
import { postData } from './components/SocialData'
import TableFiltersCan from '../../components/TableFiltersCan'
import { Button } from '../../components/PostComponents/Button'
import FilterTab from '../../components/FilterTab'
import ItemGap from '../../components/ItemGap'
import Post from './components/Post'
import CreatePostModal from './components/CreatePostModal'
import { useQuery } from '@tanstack/react-query'
import { fetchPostData } from '../../../util/queries/PostQueries'
import Loarder from '../../components/Loarder'
import Cookies from 'js-cookie'

const Social = () => {
    const userPostData = [
        {
            "id": "1",
            "username": "Alucard",
            "profileImage": "https://randomuser.me/api/portraits/men/10.jpg",
            "timestamp": "10:22 AM - 1/1/25",
            "content": "I think playing these games at these periods can be very profitable, I prefer to use sporty coz of their good odds.",
            "likes": 200,
            "shares": 200,
            "views": "2.5k",
            "images": [
                images.dummyImage,
                images.dummyImage,
                images.dummyImage,
                images.dummyImage,
            ],
            "comments": [
                { "id": "1", "username": "Shawn", "profileImage": "https://randomuser.me/api/portraits/men/20.jpg", "content": "That is a nice observation", "likes": 200 },
                { "id": "2", "username": "Alex", "profileImage": "https://randomuser.me/api/portraits/men/30.jpg", "content": "Cool", "likes": 10 }
            ]
        },
        {
            "id": "2",
            "username": "Sarah",
            "profileImage": "https://randomuser.me/api/portraits/women/12.jpg",
            "timestamp": "2:15 PM - 2/1/25",
            "content": "This weekend was amazing! Enjoyed some beautiful sunsets at the beach.",
            "likes": 350,
            "shares": 120,
            "views": "3.1k",
            "images": [],
            "comments": [
                { "id": "3", "username": "Michael", "profileImage": "https://randomuser.me/api/portraits/men/40.jpg", "content": "That sounds great! Love the beach.", "likes": 80 }
            ]
        },
        {
            "id": "3",
            "username": "David",
            "profileImage": "https://randomuser.me/api/portraits/men/15.jpg",
            "timestamp": "6:45 AM - 3/1/25",
            "content": "Morning workout done! Feeling pumped for the day ahead.",
            "likes": 420,
            "shares": 300,
            "views": "4.8k",
            "images": [
                images.dummyImage,
                images.dummyImage,
            ],
            "comments": [
                { "id": "4", "username": "Bella", "profileImage": "https://randomuser.me/api/portraits/women/30.jpg", "content": "Great motivation!", "likes": 50 },
                { "id": "5", "username": "Tom", "profileImage": "https://randomuser.me/api/portraits/men/50.jpg", "content": "Need to get back to my workouts!", "likes": 30 }
            ]
        },
        {
            "id": "4",
            "username": "Jessica",
            "profileImage": "https://randomuser.me/api/portraits/women/25.jpg",
            "timestamp": "8:30 PM - 4/1/25",
            "content": "Tried a new pasta recipe today, turned out delicious! 🍝",
            "likes": 500,
            "shares": 210,
            "views": "5.2k",
            "images": [],
            "comments": [
                { "id": "6", "username": "Olivia", "profileImage": "https://randomuser.me/api/portraits/women/40.jpg", "content": "I need the recipe!", "likes": 90 }
            ]
        },
        {
            "id": "5",
            "username": "Mark",
            "profileImage": "https://randomuser.me/api/portraits/men/35.jpg",
            "timestamp": "11:05 AM - 5/1/25",
            "content": "Exploring the city today, found some great hidden gems!",
            "likes": 220,
            "shares": 150,
            "views": "2.9k",
            "images": [
                images.dummyImage,
                images.dummyImage,
                images.dummyImage,
            ],
            "comments": []
        }
    ]
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userPosts, setUserPosts] = useState(userPostData);
    const [pendingPosts, setpendingPosts] = useState<any[]>();
    const [PostType, setPostType] = useState('user_post')
    const statsData = [
        {
            "title": "Admin Posts",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        },
        {
            "title": "Total Posts",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        },
        {
            "title": "Total Likes",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        },
        {
            "title": "Total Shares",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        },
        {
            "title": "Total Comments",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        },
        {
            "title": "Total Views",
            "value": "250",
            "change": 1,
            "icon": images.sidebarIcons.user,
            "color": "#D51C1C"
        }
    ]

    const token = Cookies.get('authToken');
    const Admin = JSON.parse(Cookies.get('user'));



    const tabs = [
        { name: "User Posts", value: "user_post" },
        { name: "Admin Posts", value: "admin_post" },
    ]

    const { data: Tipdata, isLoading } = useQuery({
        queryKey: ['allPostData'],
        queryFn: () => fetchPostData(token || ''),
    });
    // const statsData = Tipdata?.data.stats; 
    // i want to extract the approvedPost , pendingPosts because dont need it.
    useEffect(() => {
        const data = Tipdata?.data.stats.pendingPosts;
        if (PostType == "user_post") {
            const filterdata = data?.filter(item => item.user.id != Admin?.id);
            setpendingPosts(filterdata)
        } else {
            const filterdata = data?.filter(item => item.user.id == Admin?.id);
            setpendingPosts(filterdata)
        }
    }, [Tipdata, setPostType, Admin?.id, PostType,isLoading])


    if (isLoading) return <Loarder />
    const handleFilter = (value: string) => {
        setPostType(value);
        console.log(value);
    }
    const slicedStats = Object.entries(Tipdata?.data.stats)  // Convert object to array of key-value pairs
        .slice(0, 6)  // Slice required range (index 1 to 5)
        .reduce((obj, [key, value]) => {   // Convert back to an object
            obj[key] = value;
            return obj;
        }, {});
    // stats data
    const statsArray = Object.values(slicedStats);
    const ApprovedPost = Tipdata?.data.stats.approvedPost
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                    {statsArray.map((data, index) => (
                        <StatsCard
                            key={index}
                            title={data.label}
                            value={data.value}
                            change={data.change}
                            color={data.color}
                            icon={data.icon}
                        />
                    ))}
                </div>
                <PostTable
                    PostData={ApprovedPost}
                />
            </div>
            <div className='shadow-md shadow-gray-400 flex flex-col gap-6 p-4 rounded-md'>
                <TableFiltersCan>
                    <h1 className="text-xl font-bold">Feed</h1>
                    <Button Text="Create Post" handleFuncion={() => setIsModalOpen(true)} />
                </TableFiltersCan>
                <div className='border-b border-gray-200'></div>
                <div className='flex justify-end'>
                    <FilterTab
                        tabs={tabs}
                        handleValue={handleFilter}
                        activeTab={tabs[0].name}
                    />
                </div>
                <div className='border-b border-gray-200'></div>
                <div className='space-y-6 my-4 max-h-[800px] overflow-auto specific-scroll'>
                    {pendingPosts?.map((post, index) => (
                        <Post key={index} post={post} />
                    ))}
                </div>
            </div>
            <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
        </div>
    )
}

export default Social