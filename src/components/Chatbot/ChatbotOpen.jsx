import { useState, useEffect, useRef } from "react";
import useGetAnswer from "../../hooks/use-getAnswer";

import ChatbotMessage from "./ChatbotMessage";
import WaveMessage from "./WaveMessage";

import "./ChatbotOpen.css";

const ChatbotOpen = ({ setIsOpen, zoom, handleToggleZoom, handleZoomOut }) => {
  const [conversation, setConversation] = useState(() => {
    // get conversation from sessionStorage
    const saved = sessionStorage.getItem("conversation");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [enteredTextInput, setEnteredTextInput] = useState("");

  const addMessageToConversation = (message) => {
    setConversation((prevState) => [
      ...prevState,
      {
        sender: "bot",
        content: message,
      },
    ]);
  };

  const { isLoading, error, sendRequest } = useGetAnswer(
    addMessageToConversation
  );

  const chatboxInnerRef = useRef();

  // auto scroll bottom message
  useEffect(() => {
    if (chatboxInnerRef.current) {
      chatboxInnerRef.current.scrollTop = chatboxInnerRef.current.scrollHeight;
    }

    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  useEffect(() => {
    sendRequest("hello");
  }, []);

  const handleCloseChatbox = () => {
    handleZoomOut();
    setIsOpen(false);
  };

  const handleChangeInput = (event) => {
    setEnteredTextInput(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (enteredTextInput) {
      setConversation((prevState) => {
        return [
          ...prevState,
          {
            sender: "user",
            content: enteredTextInput,
          },
        ];
      });
      sendRequest(enteredTextInput);
    }
    setEnteredTextInput("");
  };

  const iconZoomHeader = zoom ? (
    <box-icon name="minus" color="white"></box-icon>
  ) : (
    <box-icon name="square" color="white"></box-icon>
  );

  return (
    <div className="chatbox-wapper">
      <div className="chatbox-header">
        <p>Ultimate Chatbot For Education</p>
        <div
          className="chatbox-btn chatbox-btn__zoom"
          onClick={handleToggleZoom}
        >
          {iconZoomHeader}
        </div>
        <div className="chatbox-btn" onClick={handleCloseChatbox}>
          <box-icon name="x" color="white"></box-icon>
        </div>
      </div>
      <div className="chatbox-inner" ref={chatboxInnerRef}>
        {/* render message */}
        {conversation.map((message, index) => (
          <ChatbotMessage sender={message.sender} key={index}>
            {message.content}
          </ChatbotMessage>
        ))}

        {/* render animation when loading */}
        {isLoading && (
          <ChatbotMessage sender="bot">
            <WaveMessage />
          </ChatbotMessage>
        )}
      </div>
      <div className="chatbox-footer">
        <form onSubmit={handleSubmitForm}>
          <input
            type="text"
            placeholder="Send something ..."
            onChange={handleChangeInput}
            value={enteredTextInput}
          />
          <button
            className={`chatbox-btn ${enteredTextInput && "active"}`}
            type="submit"
            onClick={handleSubmitForm}
          >
            <box-icon
              type="solid"
              name="send"
              color={`${enteredTextInput && "#d82c2c"}`}
            ></box-icon>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotOpen;
