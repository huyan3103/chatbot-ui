import { useState } from "react";

const useGetAnswer = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = async (input) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://ultimate-chatbot.tk/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();
      applyData(data.mess);
    } catch (err) {
      setError(err.message || Math.random());
    }

    setIsLoading(false);
  };

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useGetAnswer;
