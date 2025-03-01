import React from 'react';

interface MessageProps {
  text: string;
  timestamp: string;
  isUser: boolean;
}

const MessageCan: React.FC<MessageProps> = ({ text, timestamp, isUser }) => {
  return (
    <div className="flex mb-4">
      {isUser ? (
        <>
          <div className="flex-1"></div>
          <div className="flex flex-col items-end">
            <div
              className="bg-red-700 text-white p-3 rounded-lg max-w-xs"
              style={{ wordWrap: 'break-word' }}
            >
              {text}
            </div>
            <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="User avatar"
              loading='lazy'
              className="w-full h-full object-cover"
            />
          </div>
        </>
      ) : (
        <>
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/2.jpg"
              loading='lazy'
              alt="Other user avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="bg-gray-200 p-3 rounded-lg max-w-xs">
              {text}
            </div>
            <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
          </div>
          <div className="flex-1"></div>
        </>
      )}
    </div>
  );
};

export default MessageCan;