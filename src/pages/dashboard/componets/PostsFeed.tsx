import React from 'react';
import { Post } from '../../../components/Post';
import { Link } from 'react-router-dom';
import { postData } from '../../social/components/SocialData';

interface PostData {
  id: number;
  user: {
    id: number;
    username: string;
    profile_picture: string | null;
  };
  timestamp: string;
  content: string;
  type: string;
  likes_count: number;
  comments_count: number;
  share_count: number;
  view_count: number;
  recent_comments: any[];
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;
  image_6?: string;
  image_7?: string;
  image_8?: string;
  image_9?: string;
  image_10?: string;
  created_at?:string
};

interface PostsFeedProps {
  PostData: PostData[];
}

export function PostsFeed({ PostData }: PostsFeedProps) {
  console.log(PostData)
  return (
    <div className="bg-white rounded-3xl p-4 space-y-6 h-full shadow-sm shadow-gray-400">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <Link to={"/socials"} className='cursor-pointer'>
          <button className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-800 transition-colors">
            View all posts
          </button>
        </Link>
      </div>
      <div className="space-y-3 divide-y divide-gray-200 h-[410px] overflow-auto specific-scroll">
        {PostData.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
}