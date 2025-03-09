import React from 'react'
import StatsCard from '../../components/StatsCard'
import images from '../../assets/images'
import { ChartGraph } from '../../components/ChartGraph'
import { PostsFeed } from './componets/PostsFeed'
import UserDiv from './componets/UserDiv'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { fetchDashboardData } from '../../../util/queries/Dashboard'
import Cookies from 'js-cookie'
import Loarder from '../../components/Loarder'
import { fetchPostData } from '../../../util/queries/PostQueries'

const Dashboard = () => {
    const token = Cookies.get('authToken');
    const mockData = [
        { month: 'Jan', users: 1800, subscribers: 200 },
        { month: 'Feb', users: 300, subscribers: 700 },
        { month: 'Mar', users: 100, subscribers: 400 },
        { month: 'Apr', users: 3500, subscribers: 200 },
        { month: 'May', users: 500, subscribers: 200 },
        { month: 'Jun', users: 1000, subscribers: 2500 },
        { month: 'Jul', users: 800, subscribers: 200 },
        { month: 'Aug', users: 1800, subscribers: 200 },
        { month: 'Sep', users: 1800, subscribers: 200 },
    ];
    const mockPosts = [
        {
            id: '1',
            author: {
                name: 'Alucard',
                avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&auto=format&fit=crop&q=60',
            },
            timestamp: '10:22 AM - 1/1/25',
            content: 'I think playing these games at these period can be......'
        },
        {
            id: '2',
            author: {
                name: 'Alucard',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60',
            },
            timestamp: '10:22 AM - 1/1/25',
            content: 'I think playing these games at these period can be......'
        },
        {
            id: '3',
            author: {
                name: 'Alucard',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
            },
            timestamp: '10:22 AM - 1/1/25',
            content: 'I think playing these games at these period can be......'
        },
        {
            id: '3',
            author: {
                name: 'alex',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
            },
            timestamp: '10:22 AM - 1/1/25',
            content: 'I think playing these games at these period can be......'
        },
        {
            id: '3',
            author: {
                name: 'Johon',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60',
            },
            timestamp: '10:22 AM - 1/1/25',
            content: 'I think playing these games at these period can be......'
        },
    ];
    const { data: DashboardInfo, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: () => fetchDashboardData(token)
    })
    console.log(DashboardInfo)
    const statsData = DashboardInfo?.stats.map(stat => ({
        ...stat,
        icon:
            stat.title === "Total Users" ? images.sidebarIcons.user :
                stat.title === "Total TipSters" ? images.sidebarIcons.user :
                    stat.title === "Subscription Revenue" ? images.money :
                        stat.icon,
    }));
    console.log('table data : ', DashboardInfo?.users)

    const formData = {
        "name": "Hamza",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/721.jpg",
        "Title": "testing api integration",
        "Description": "this is to see update on the api",
    }
    const { data: Tipdata, isLoading :postLoading } = useQuery({
        queryKey: ['allPostData'],
        queryFn: () => fetchPostData(token || ''),
    });
    const ApprovedPost = Tipdata?.data.stats.approvedPost

    if (isLoading) return <Loarder />
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {!isLoading && statsData.map((data, index) => (
                    <StatsCard
                        key={index}
                        title={data.title}
                        value={data.value}
                        change={data.change}
                        color={data.color}
                        icon={data.icon}
                    />
                ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-8 my-8'>
                <div className='md:col-span-7'>
                    <ChartGraph data={mockData} />
                </div>
                <div className='md:col-span-5'>
                   {!postLoading && <PostsFeed PostData={ApprovedPost} />}
                </div>
            </div>

            <UserDiv Datalist={DashboardInfo?.users} />
        </>

    )
}

export default Dashboard