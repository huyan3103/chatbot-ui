const ChatbotClose = (props) => {
  const { chatbotIcon, setIsOpen } = props;

  const handleOpenChatbox = () => {
    setIsOpen(true);
  };

  return (
    <div className="chatbox-icon chatbox-btn" onClick={handleOpenChatbox}>
      <img src={chatbotIcon} alt="" />
    </div>
  );
};

export default ChatbotClose;
