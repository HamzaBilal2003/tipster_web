import React, { useState, useEffect, useRef } from 'react';
import MessageCan from './MessageCan';
import InputCan from './InputCan';
import Cookies from 'js-cookie';
import { fetchMessages } from '../../../../util/queries/support';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  isUser: boolean;
}

interface ChatCanProps {
  chatId: number; // Accepts chatId from props
}

const ChatCan: React.FC<ChatCanProps> = ({ chatId }) => {
  const token = Cookies.get('authToken');
  const admin = JSON.parse(Cookies.get('user') || '{}');
  const queryClient = useQueryClient();

  // Fetch messages using react-query
  const { data: messagesData, isLoading } = useQuery<Message[]>({
    queryKey: ['chatMessages', chatId], // Unique key per chat
    queryFn: () => fetchMessages(token || '', chatId),
    enabled: !!chatId, // Fetch only when chatId exists
  });

  const [messages, setMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Update messages state when data changes
  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  // Scroll to the last message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message to the API
  const sendMessageAPI = async (text: string) => {
    const response = await fetch(`https://tipster.hmstech.org/api/admin/send-messages-for-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
      body: JSON.stringify({
        chat_id: chatId,
        sender_type: "admin", // Admin is sending the message
        content: text,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message.");
    }

    return await response.json();
  };

  // UseMutation to handle sending messages
  const { mutate: handleSendMessage, isPending: isSending } = useMutation({
    mutationKey: ['sendMessage', chatId],
    mutationFn: (text: string) => sendMessageAPI(text),
    onMutate: async (text) => {
      // Optimistic update: Show the message instantly
      const newMessage: Message = {
        id: messages.length + 1,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    onSuccess: () => {
      // Refetch chat messages after sending
      queryClient.invalidateQueries({ queryKey: ['chatMessages', chatId] });
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    }
  });

  return (
    <div className="flex flex-col h-[700px] rounded-md shadow-sm shadow-gray-400">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : (
          messages.map((message) => (
            <MessageCan
              key={message.id}
              text={message.text}
              timestamp={message.timestamp}
              isUser={message.isUser}
            />
          ))
        )}
        {/* Invisible div at the bottom to auto-scroll */}
        <div ref={messagesEndRef} />
      </div>
      <div className="py-4 px-2">
        <InputCan onSendMessage={(text) => handleSendMessage(text)} isLoading={isSending} />
      </div>
    </div>
  );
};

export default ChatCan;
