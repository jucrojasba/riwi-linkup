import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css';

// Interface for the props that the ChatBot component will receive
interface ChatBotProps {
  botImage: string; // Image URL for the bot
  userImage: string; // Image URL for the user
  language: boolean; // Language flag for translation (true for Spanish, false for English)
  isDarkMode: boolean; // Dark mode flag
}

// Interface for message structure
interface Message {
  text: string; // Message text
  isBot: boolean; // Boolean to check if the message is from the bot
}

// ChatBot component definition
const ChatBot: React.FC<ChatBotProps> = ({ botImage, userImage, language, isDarkMode }) => {
  // State to manage the visibility of the message form
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  // State to manage the current message input
  const [message, setMessage] = useState<string>('');
  // State to hold the list of messages exchanged
  const [messages, setMessages] = useState<Message[]>([
    { text: `${language ? "¡Hola! ¿En qué puedo ayudarte?" : "Hello! How can I help you?"}`, isBot: true }
  ]);
  // State to manage the conversation stage
  const [stage, setStage] = useState<'initial' | 'confirm' | 'final'>('initial');

  // Effect to update messages when the language changes
  useEffect(() => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.isBot
          ? {
              ...msg,
              text: translateMessage(msg.text, language) // Translate the bot's messages
            }
          : msg
      )
    );
  }, [language]); // Dependency array: re-run effect when language changes

  // Function to translate messages based on the selected language
  const translateMessage = (text: string, language: boolean): string => {
    // Define translations for certain messages
    const translations: { [key: string]: { es: string; en: string } } = {
      "¡Hola! ¿En qué puedo ayudarte?": {
        es: "¡Hola! ¿En qué puedo ayudarte?",
        en: "Hello! How can I help you?",
      },
      "¿Deseas ser redirigido a WhatsApp para hablar con alguien de Riwi?": {
        es: "¿Deseas ser redirigido a WhatsApp para hablar con alguien de Riwi?",
        en: "Would you like to be redirected to WhatsApp to chat with someone from Riwi?",
      },
      "Voy a redirigirte a WhatsApp para hablar con alguien de Riwi.": {
        es: "Voy a redirigirte a WhatsApp para hablar con alguien de Riwi.",
        en: "I’m going to redirect you to WhatsApp to chat with someone from Riwi.",
      },
      "Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde.": {
        es: "Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde.",
        en: "I'm sorry, I can't assist you right now. Please try again later.",
      },
      "¿En qué puedo ayudarte?": {
        es: "¿En qué puedo ayudarte?",
        en: "How can I help you?",
      },
    };

    // Search for the translation of the given text
    for (const [key, value] of Object.entries(translations)) {
      if (text === value.es || text === value.en) {
        return language ? value.es : value.en; // Return the translated message
      }
    }

    return text; // If no translation is found, return the original text
  };

  // Handle button click to show the message form
  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowMessageForm(true);
  };

  // Handle changes in the input field
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value); // Update message state with the input value
  };

  // Handle sending the message
  const handleSendMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Prevent default button behavior

    // Handling based on the current stage of conversation
    if (stage === 'initial') {
      // Add user's message and bot's response to the message list
      setMessages([
        ...messages,
        { text: message, isBot: false },
        {
          text: `${language
            ? "¿Deseas ser redirigido a WhatsApp para hablar con alguien de Riwi?"
            : "Would you like to be redirected to WhatsApp to chat with someone from Riwi?"
            }`,
          isBot: true,
        },
      ]);
      setStage('confirm'); // Move to the confirm stage
    } else if (stage === 'confirm') {
      // Check user confirmation
      if (message.toLowerCase() === 'sí' || message.toLowerCase() === 'si' || message.toLowerCase() === 'yes') {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          {
            text: `${language
              ? "Voy a redirigirte a WhatsApp para hablar con alguien de Riwi."
              : 'I’m going to redirect you to WhatsApp to chat with someone from Riwi.'}`,
            isBot: true,
          },
        ]);
        const encodedMessage = encodeURIComponent(message); // Encode message for URL
        window.open(`https://api.whatsapp.com/send?phone=+573007446873&text=${encodedMessage}`); // Redirect to WhatsApp
      } else {
        // Handle case when user does not want to continue
        setMessages([
          ...messages,
          { text: message, isBot: false },
          {
            text: `${language
              ? "Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde."
              : "I'm sorry, I can't assist you right now. Please try again later."}`,
            isBot: true,
          },
        ]);
        setStage('final'); // Move to the final stage
      }
      setMessage(''); // Reset the message input
      setShowMessageForm(false); // Hide the message form
    } else if (stage === 'final') {
      // Handle the final stage of the conversation
      setMessages([
        ...messages,
        { text: message, isBot: false },
        {
          text: `${language ? "¿En qué puedo ayudarte?" : "How can I help you?"}`,
          isBot: true,
        },
      ]);
      setStage('initial'); // Reset to the initial stage
      setMessage(''); // Clear the message input
      setShowMessageForm(true); // Show the message form again
    }
  };

  return (
    <div className={isDarkMode ? 'chat-container-dark-mode' : "chat-container"}>
      <div className="title-chat-bot">
        <h3>Chat</h3>
      </div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.isBot ? 'bot-message-container' : 'user-message-container'}
          >
            {msg.isBot && <img src={botImage} alt="Bot" className="bot-image" />} {/* Display bot image */}
            <div className={msg.isBot ? 'bot-message' : 'user-message'}>
              {msg.text} {/* Display the message text */}
            </div>
            {!msg.isBot && <img src={userImage} alt="User" className="user-image" />} {/* Display user image */}
          </div>
        ))}
      </div>
      {showMessageForm && (
        <div className="message-form">
          <textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Escribe tu mensaje..."
            className={isDarkMode ? 'textarea-dark-mode' : "textarea"}
          />
          <button onClick={handleSendMessage} className="send-button">
            <SendIcon className="send-icon" /> {/* Send icon */}
          </button>
        </div>
      )}
      <div className='start-button-container'>
        {!showMessageForm && <button onClick={handleButtonClick} className="start-button">{language ? '¡Hola!' : 'Hello!'}</button>}
      </div>
    </div>
  );
};

export default ChatBot; // Export the ChatBot component for use in other parts of the application
