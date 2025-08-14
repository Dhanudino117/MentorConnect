import React, { useState, useEffect, useRef, useMemo } from "react";
import { getCurrentUser } from "../services/authService";
import {
  FaPaperPlane,
  FaSearch,
  FaEllipsisV,
  FaPhone,
  FaVideo,
  FaImage,
  FaSmile,
  FaPaperclip,
  FaMicrophone,
  FaCheck,
  FaCheckDouble,
} from "react-icons/fa";

const ChatRoom = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const currentUser = getCurrentUser() || {
    id: 1,
    name: "Guest User",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  };

  // Mock chat data
  const mockChats = useMemo(
    () => [
      {
        id: 1,
        user: {
          id: 2,
          name: "Sarah Johnson",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
          isOnline: true,
          lastSeen: "2 minutes ago",
        },
        lastMessage:
          "Perfect! Hooks are fundamental to modern React. We can start with useState and useEffect.",
        unreadCount: 1,
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      },
      {
        id: 2,
        user: {
          id: 3,
          name: "Michael Chen",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          isOnline: false,
          lastSeen: "1 hour ago",
        },
        lastMessage: "Great! Let's schedule that session for tomorrow.",
        unreadCount: 0,
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: 3,
        user: {
          id: 4,
          name: "Emily Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
          isOnline: true,
          lastSeen: "5 minutes ago",
        },
        lastMessage: "I'm available for a UX review session this week.",
        unreadCount: 2,
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ],
    []
  );

  const mockMessages = useMemo(
    () => ({
      1: [
        {
          id: 1,
          senderId: 2,
          text: "Hi! I saw your profile and I'm interested in learning React.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isRead: true,
        },
        {
          id: 2,
          senderId: currentUser.id,
          text: "Hello Sarah! I'd be happy to help you with React. What specific areas would you like to focus on?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
          isRead: true,
        },
        {
          id: 3,
          senderId: 2,
          text: "I'm particularly interested in hooks and state management.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
          isRead: true,
        },
        {
          id: 4,
          senderId: currentUser.id,
          text: "Perfect! Hooks are fundamental to modern React. We can start with useState and useEffect.",
          timestamp: new Date(Date.now() - 60 * 60 * 21),
          isRead: true,
        },
        {
          id: 5,
          senderId: 2,
          text: "Great! Let's schedule that session for tomorrow.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: false,
        },
      ],
      2: [
        {
          id: 6,
          senderId: 3,
          text: "Hi there! I'm interested in product management mentorship.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          isRead: true,
        },
        {
          id: 7,
          senderId: currentUser.id,
          text: "Hello Michael! I'd love to help you with product management. What's your background?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
          isRead: true,
        },
      ],
      3: [
        {
          id: 8,
          senderId: 4,
          text: "Hi! I'm looking for UX design feedback on my portfolio.",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          isRead: true,
        },
        {
          id: 9,
          senderId: currentUser.id,
          text: "Hello Emily! I'd be happy to review your portfolio. When would you like to discuss it?",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: false,
        },
      ],
    }),
    [currentUser.id]
  );

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || []);
      scrollToBottom();
    }
  }, [selectedChat, mockMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message = {
      id: Date.now(),
      senderId: currentUser.id,
      text: newMessage.trim(),
      timestamp: new Date(),
      isRead: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredChats = mockChats.filter((chat) =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartCall = (type) => {
    alert(`${type} call initiated with ${selectedChat?.user.name}`);
  };

  const handleAttachment = (type) => {
    alert(`${type} attachment selected`);
    setShowAttachmentMenu(false);
  };

  if (!selectedChat) {
    return (
      <div className="flex h-full">
        {/* Chat List */}
        <div className="w-full md:w-1/3 border-r border-gray-200 bg-white">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Messages
            </h2>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-96">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors"
              >
                <div className="relative">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">
                      {chat.user.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate max-w-xs">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount > 0 && (
                    <div className="mt-1">
                      <span className="inline-flex items-center justify-center w-5 h-5 bg-purple-500 text-white text-xs rounded-full">
                        {chat.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-4xl text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Select a conversation
            </h3>
            <p className="text-gray-600">
              Choose a chat from the list to start messaging
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Chat List (Mobile) */}
      <div className="md:hidden w-full bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedChat(null)}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <h3 className="font-medium text-gray-800">
            {selectedChat.user.name}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleStartCall("Voice")}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <FaPhone />
            </button>
            <button
              onClick={() => handleStartCall("Video")}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
            >
              <FaVideo />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={selectedChat.user.avatar}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-800">
                  {selectedChat.user.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedChat.user.isOnline
                    ? "Online"
                    : `Last seen ${selectedChat.user.lastSeen}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleStartCall("Voice")}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaPhone />
              </button>
              <button
                onClick={() => handleStartCall("Video")}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                <FaVideo />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
                <FaEllipsisV />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.senderId === currentUser.id
                    ? "bg-purple-600 text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div
                  className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.senderId === currentUser.id
                      ? "text-purple-200"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.senderId === currentUser.id && (
                    <span className="text-xs">
                      {message.isRead ? <FaCheckDouble /> : <FaCheck />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
              >
                <FaPaperclip />
              </button>

              {showAttachmentMenu && (
                <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-1">
                  <button
                    onClick={() => handleAttachment("Image")}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded"
                  >
                    <FaImage className="text-blue-500" />
                    <span>Image</span>
                  </button>
                  <button
                    onClick={() => handleAttachment("Document")}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded"
                  >
                    <FaPaperclip className="text-green-500" />
                    <span>Document</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-1 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <FaSmile />
                </button>
                <button className="p-1 text-gray-600 hover:text-purple-600 transition-colors">
                  <FaMicrophone />
                </button>
              </div>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
