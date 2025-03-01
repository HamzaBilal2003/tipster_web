import React from 'react';
import { Avatar } from './PostComponents/Avatar';
import { Timestamp } from './PostComponents/Timestamp';

interface PostProps {
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content: string;
}

export function Post({ author, timestamp, content }: PostProps) {
  return (
    <div className="py-2">
      <div className="flex gap-4">
        <Avatar src={author.avatar} alt={author.name} />
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{author.name}</h3>
            <Timestamp timestamp={timestamp} />
          </div>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{content}</p>
    </div>
  );
}