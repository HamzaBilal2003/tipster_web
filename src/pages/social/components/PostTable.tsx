import React from 'react'

type Post = {
    id?: string;
    ProfileImage?: string;
    postDescription: string;
    username?: string
}

type Props = {
    PostData: Post[];
}

const PostTable = ({ PostData }: Props) => {
    return (
        <div className='h-[500px] overflow-auto my-4 specific-scroll rounded-md shadow-md shadow-gray-400'>
            <table className="w-full rounded-md shadow-md shadow-gray-400 overflow-hidden">
                <thead className='bg-[#FFDADA]'>
                    <tr className='sticky top-0'>
                        <th className='text-left p-4'>Post</th>
                        <th className='text-left p-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        PostData.map((post, index) => (
                            <tr className='' key={index}>
                                <td className='p-4'>
                                    <div className='flex items-center gap-4 text-justify'>
                                        <img src={post.ProfileImage} alt={post.username} className='w-10 h-10 rounded-full' />
                                        <span>
                                            {post.postDescription}
                                        </span>
                                    </div>
                                </td>
                                <td className='p-4'>
                                    <div className='flex items-center justify-center'>
                                        <button className='py-2 px-4 rounded-md bg-[#008000] text-nowrap text-white'>
                                            View Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PostTable