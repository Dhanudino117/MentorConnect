import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FaPhone,
  FaPhoneSlash,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaDesktop,
  FaUsers,
  FaComments,
  FaCog,
  FaExpand,
  FaCompress,
  FaVolumeUp,
  FaVolumeMute,
  FaHandPaper,
  FaEllipsisV,
} from "react-icons/fa";

const VideoCall = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [callQuality] = useState("good");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const intervalRef = useRef(null);
  // Duration of the call
  const currentUser = {
    id: 1,
    name: "You",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  };

  // Mock participants data (for testing)
  const mockParticipants = useMemo(
    () => [
      {
        id: 2,
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
        isHost: true,
        isSpeaking: false,
        isMuted: false,
        isVideoOn: true,
        connectionQuality: "excellent",
      },
      {
        id: 3,
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        isHost: false,
        isSpeaking: true,
        isMuted: false,
        isVideoOn: true,
        connectionQuality: "good",
      },
      {
        id: 4,
        name: "Emily Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
        isHost: false,
        isSpeaking: false,
        isMuted: true,
        isVideoOn: false,
        connectionQuality: "poor",
      },
    ],
    []
  );

  // Mock chat messages (for testing)           
  const mockChatMessages = useMemo(
    () => [
      {
        id: 1,
        sender: "Sarah Johnson",
        message: "Welcome everyone!",
        timestamp: "2:30 PM",
      },
      {
        id: 2,
        sender: "Michael Chen",
        message: "Thanks for having us!",
        timestamp: "2:31 PM",
      },
      {
        id: 3,
        sender: "You",
        message: "Great to be here!",
        timestamp: "2:32 PM",
      },
    ],
    []
  );

  useEffect(() => {
    if (isInCall) {
      intervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInCall]);

  useEffect(() => {
    setParticipants(mockParticipants);
    setChatMessages(mockChatMessages);
  }, [mockParticipants, mockChatMessages]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartCall = () => {
    setIsInCall(true);
    setCallDuration(0);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOn(true);
    setIsScreenSharing(false);
    setIsHandRaised(false);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleToggleHand = () => {
    setIsHandRaised(!isHandRaised);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "You",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const getConnectionQualityColor = (quality) => {
    switch (quality) {
      case "excellent":
        return "text-green-500";
      case "good":
        return "text-yellow-500";
      case "poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getConnectionQualityIcon = (quality) => {
    switch (quality) {
      case "excellent":
        return "🟢";
      case "good":
        return "🟡";
      case "poor":
        return "🔴";
      default:
        return "⚪";
    }
  };

  if (!isInCall) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaVideo className="text-3xl text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Start Video Call
          </h2>
          <p className="text-gray-600 mb-6">
            Connect with your mentors or students through high-quality video
            calls
          </p>

          <div className="space-y-4">
            <button
              onClick={handleStartCall}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <FaPhone />
              <span>Start Call</span>
            </button>

            <div className="text-sm text-gray-500">
              <p>• HD video quality</p>
              <p>• Screen sharing capability</p>
              <p>• Chat during calls</p>
              <p>• Recording options</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isFullscreen ? "fixed inset-0 z-50" : "h-full"
      } bg-black flex flex-col`}
    >
      {/* Call Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE</span>
          </div>
          <span className="text-sm">{formatTime(callDuration)}</span>
          <span className="text-sm text-gray-400">
            • {participants.length + 1} participants
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`text-sm px-2 py-1 rounded ${
              callQuality === "excellent"
                ? "bg-green-600"
                : callQuality === "good"
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            {callQuality} quality
          </span>
          <button
            onClick={handleToggleFullscreen}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            {/* Main participant (current user) */}
            <div className="col-span-2 lg:col-span-2 bg-gray-800 rounded-lg relative overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-6xl">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <FaVideo className="text-6xl text-gray-400" />
                  </div>
                )}
              </div>

              {/* User info overlay */}
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                <span className="text-sm">{currentUser.name}</span>
                {isMuted && (
                  <FaMicrophoneSlash className="inline ml-2 text-red-400" />
                )}
                {!isVideoOn && (
                  <FaVideoSlash className="inline ml-2 text-red-400" />
                )}
              </div>
            </div>

            {/* Other participants */}
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="bg-gray-800 rounded-lg relative overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-2xl">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <FaVideo className="text-3xl text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Participant info overlay */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  <div className="flex items-center space-x-1">
                    <span>{participant.name}</span>
                    {participant.isHost && (
                      <span className="text-yellow-400">👑</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {participant.isMuted && (
                      <FaMicrophoneSlash className="text-red-400" />
                    )}
                    {!participant.isVideoOn && (
                      <FaVideoSlash className="text-red-400" />
                    )}
                    <span
                      className={getConnectionQualityColor(
                        participant.connectionQuality
                      )}
                    >
                      {getConnectionQualityIcon(participant.connectionQuality)}
                    </span>
                  </div>
                </div>

                {/* Speaking indicator */}
                {participant.isSpeaking && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          {/* Participants Tab */}
          <div className="border-b border-gray-700">
            <button
              onClick={() => setShowParticipants(true)}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${
                showParticipants
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaUsers className="inline mr-2" />
              Participants
            </button>
            <button
              onClick={() => setShowParticipants(false)}
              className={`w-1/2 py-3 text-sm font-medium transition-colors ${
                !showParticipants
                  ? "text-white border-b-2 border-purple-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FaComments className="inline mr-2" />
              Chat
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {showParticipants ? (
              <div className="p-4">
                <h3 className="text-white font-medium mb-4">
                  Participants ({participants.length + 1})
                </h3>
                <div className="space-y-3">
                  {/* Current user */}
                  <div className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {currentUser.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {currentUser.name} (You)
                      </p>
                      <p className="text-gray-400 text-xs">Host</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {isMuted && (
                        <FaMicrophoneSlash className="text-red-400 text-sm" />
                      )}
                      {!isVideoOn && (
                        <FaVideoSlash className="text-red-400 text-sm" />
                      )}
                    </div>
                  </div>

                  {/* Other participants */}
                  {participants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center space-x-3 p-2 bg-gray-800 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {participant.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">
                          {participant.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {participant.isHost ? "Host" : "Participant"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {participant.isMuted && (
                          <FaMicrophoneSlash className="text-red-400 text-sm" />
                        )}
                        {!participant.isVideoOn && (
                          <FaVideoSlash className="text-red-400 text-sm" />
                        )}
                        <span
                          className={getConnectionQualityColor(
                            participant.connectionQuality
                          )}
                        >
                          {getConnectionQualityIcon(
                            participant.connectionQuality
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col h-full">
                <h3 className="text-white font-medium mb-4">Chat</h3>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-purple-600 ml-8"
                          : "bg-gray-800 mr-8"
                      }`}
                    >
                      <p className="text-white text-sm font-medium">
                        {msg.sender}
                      </p>
                      <p className="text-white text-sm">{msg.message}</p>
                      <p className="text-gray-300 text-xs mt-1">
                        {msg.timestamp}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chat input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-gray-900 p-6 flex items-center justify-center space-x-4">
        <button
          onClick={handleToggleMute}
          className={`p-4 rounded-full transition-colors ${
            isMuted
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {isMuted ? (
            <FaMicrophoneSlash size={20} />
          ) : (
            <FaMicrophone size={20} />
          )}
        </button>

        <button
          onClick={handleToggleVideo}
          className={`p-4 rounded-full transition-colors ${
            !isVideoOn
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          {!isVideoOn ? <FaVideoSlash size={20} /> : <FaVideo size={20} />}
        </button>

        <button
          onClick={handleToggleScreenShare}
          className={`p-4 rounded-full transition-colors ${
            isScreenSharing
              ? "bg-purple-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <FaDesktop size={20} />
        </button>

        <button
          onClick={handleToggleHand}
          className={`p-4 rounded-full transition-colors ${
            isHandRaised
              ? "bg-yellow-600 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          <FaHandPaper size={20} />
        </button>

        <button
          onClick={handleEndCall}
          className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          <FaPhoneSlash size={20} />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
