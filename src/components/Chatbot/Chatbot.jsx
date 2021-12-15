import React, { useState } from "react";
import "boxicons";

import ChatbotOpen from "./ChatbotOpen";
import ChatbotClose from "./ChatbotClose";

import chatbotIcon from "../../image/avatar_chatbot.png";

import "./Chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(false);

  const handleToggleZoom = () => {
    setZoom((zoom) => !zoom);
  };

  const handleZoomOut = () => {
    setZoom(false);
  };

  const content = isOpen ? (
    <ChatbotOpen
      setIsOpen={setIsOpen}
      zoom={zoom}
      handleToggleZoom={handleToggleZoom}
      handleZoomOut={handleZoomOut}
    />
  ) : (
    <ChatbotClose chatbotIcon={chatbotIcon} setIsOpen={setIsOpen} />
  );

  return (
    <>
      <div
        className={`${zoom ? "chatbox zoom" : "chatbox"} ${
          isOpen ? "open" : ""
        }`}
      >
        {content}
      </div>
      <div className={`${zoom ? "overlay active" : " overlay"}`}></div>
    </>
  );
};

export default Chatbot;
