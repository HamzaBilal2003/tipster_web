import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-12 h-12 rounded-full object-cover"
    />
  );
}