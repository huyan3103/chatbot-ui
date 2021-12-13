import React from "react";
import PropTypes from "prop-types";
import chatbotIcon from "../../image/avatar_chatbot.png";
import "./ChatbotMessage.css";

const ChatbotMessage = ({ sender, children: message }) => {
  let content = "";

  // split long message into sentences by ". "
  if (typeof message === "string") {
    if (sender === "bot") {
      content = message.split(/(\.\s)/).map(
        (item, index) =>
          item !== ". " && (
            <span className="chatbot-message-content" key={index}>
              {item}
            </span>
          )
      );
    } else {
      content = <span className="chatbot-message-content">{message}</span>;
    }
  } else {
    content = message;
  }

  return (
    <div className={`chatbot-message ${sender}`}>
      <div className="chatbot-message-line">
        <span></span>
        <div className="chatbot-message-line-main">
          {sender === "bot" && <img src={chatbotIcon} alt="" />}
          <div style={{ alignSelf: "center" }}>{content}</div>
        </div>
      </div>
    </div>
  );
};

ChatbotMessage.propTypes = {
  sender: PropTypes.string.isRequired,
};

export default ChatbotMessage;
