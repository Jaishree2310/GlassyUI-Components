import React, { useEffect } from 'react';

const AiChatbot: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.async = true;
    script.setAttribute('chatbotId', 'NwunJFmeijfG8mzeXqdPw');
    script.setAttribute('domain', 'www.chatbase.co');

    const chatbotConfig = document.createElement('script');
    chatbotConfig.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "NwunJFmeijfG8mzeXqdPw",
        domain: "www.chatbase.co"
      };
    `;

    document.body.appendChild(chatbotConfig);
    document.body.appendChild(script);

    // Clean up the scripts on component unmount
    return () => {
      document.body.removeChild(chatbotConfig);
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visual elements needed in this component
};

export default AiChatbot;
