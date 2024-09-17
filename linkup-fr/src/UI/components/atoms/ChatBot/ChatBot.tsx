import { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css';

interface ChatBotProps {
  botImage: string;
  userImage: string;
  language: boolean;
  isDarkMode: boolean;
}

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ botImage, userImage, language, isDarkMode }) => {
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { text: `${language ? "¡Hola! ¿En qué puedo ayudarte?" : "Hello! How can I help you?"}`, isBot: true }
  ]);
  const [stage, setStage] = useState<'initial' | 'confirm' | 'final'>('initial');

  // useEffect para actualizar mensajes cuando cambie el idioma (language)
  useEffect(() => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.isBot
          ? {
              ...msg,
              text: translateMessage(msg.text, language) // Función para traducir
            }
          : msg
      )
    );
  }, [language]);

  const translateMessage = (text: string, language: boolean): string => {
    // Traduce los mensajes existentes según el idioma
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

    // Busca la traducción según el idioma
    for (const [key, value] of Object.entries(translations)) {
      if (text === value.es || text === value.en) {
        return language ? value.es : value.en;
      }
    }

    return text; // Si no encuentra una traducción, devuelve el texto original
  };

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowMessageForm(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (stage === 'initial') {
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
      setStage('confirm');
    } else if (stage === 'confirm') {
      if (message.toLowerCase() === 'sí' || message.toLowerCase() === 'si' || message.toLowerCase() === 'yes') {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          {
            text: `${language
              ? "Voy a redirigirte a WhatsApp para hablar con alguien de Riwi."
              : 'I’m going to redirect you to WhatsApp to chat with someone from Riwi.'
              }`,
            isBot: true,
          },
        ]);
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?phone=+573007446873&text=${encodedMessage}`);
      } else {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          {
            text: `${language
              ? "Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde."
              : "I'm sorry, I can't assist you right now. Please try again later."
              }`,
            isBot: true,
          },
        ]);
        setStage('final');
      }
      setMessage('');
      setShowMessageForm(false);
    } else if (stage === 'final') {
      setMessages([
        ...messages,
        { text: message, isBot: false },
        {
          text: `${language ? "¿En qué puedo ayudarte?" : "How can I help you?"}`,
          isBot: true,
        },
      ]);
      setStage('initial');
      setMessage('');
      setShowMessageForm(true);
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
            {msg.isBot && <img src={botImage} alt="Bot" className="bot-image" />}
            <div className={msg.isBot ? 'bot-message' : 'user-message'}>
              {msg.text}
            </div>
            {!msg.isBot && <img src={userImage} alt="User" className="user-image" />}
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
            <SendIcon className="send-icon" />
          </button>
        </div>
      )}
      <div className='start-button-container'>
        {!showMessageForm && <button onClick={handleButtonClick} className="start-button">{language ? '¡Hola!' : 'Hello!'}</button>}
      </div>
    </div>
  );
};

export default ChatBot;