import React from 'react';

interface TimestampProps {
  timestamp: any;
}

export function Timestamp({ timestamp }: TimestampProps) {
  return (
    <span className="text-gray-500 text-sm">
      {timestamp}
    </span>
  );
}