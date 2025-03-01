import React from 'react';
import { Post } from '../../../components/Post';
import { Link } from 'react-router-dom';

interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
}

interface PostsFeedProps {
  PostData: PostData[];
}

export function PostsFeed({ PostData }: PostsFeedProps) {
  return (
    <div className="bg-white rounded-3xl p-4 space-y-6 h-full shadow-sm shadow-gray-400">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Posts</h2>
        <Link to={"#"} className='cursor-pointer'>
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