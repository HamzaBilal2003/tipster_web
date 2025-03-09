import React from 'react';
import { Avatar } from './PostComponents/Avatar';
import { Timestamp } from './PostComponents/Timestamp';
import { API_DOMAIN_images } from '../../util/apiConfig';
import { postData } from '../pages/social/components/SocialData';
import FormatDate from './FormatDate';

interface PostProps {
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
}

export function Post( PostProps : PostProps) {
  return (
    <div className="py-2">
      <div className="flex gap-4">
        <Avatar src={API_DOMAIN_images + PostProps.user.profile_picture} alt={PostProps.user.username} />
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">{PostProps.user.username}</h3>
            <Timestamp timestamp={PostProps.timestamp} />
          </div>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{PostProps.content}</p>
    </div>
  );
}