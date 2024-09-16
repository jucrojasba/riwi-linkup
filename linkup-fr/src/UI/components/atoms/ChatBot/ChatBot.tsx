import { useState, ChangeEvent, MouseEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css';

interface ChatBotProps {
  botImage: string;
  userImage: string;
  language:boolean;
  isDarkMode:boolean;
}

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ botImage, userImage, language, isDarkMode }) => {
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { text: `${language?"¡Hola! ¿En qué puedo ayudarte?":"Hello! How can I help you?"}`, isBot: true }
  ]);
  const [stage, setStage] = useState<'initial' | 'confirm' | 'final'>('initial');

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
        { text: `${language? "¿Deseas ser redirigido a WhatsApp para hablar con alguien de Riwi?":"Would you like to be redirected to WhatsApp to chat with someone from Riwi?"}`, isBot: true }
      ]);
      setStage('confirm');
    } else if (stage === 'confirm') {
      if (message.toLowerCase() === 'sí' || message.toLowerCase() === 'si' || message.toLowerCase() === 'yes') {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          { text: `${language?"Voy a redirigirte a WhatsApp para hablar con alguien de Riwi.":'I’m going to redirect you to WhatsApp to chat with someone from Riwi.'}`, isBot: true }
        ]);
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?phone=+573007446873&text=${encodedMessage}`);
      } else {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          { text: `${language?"Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde.":"I'm sorry, I can't assist you right now. Please try again later."}`, isBot: true }
        ]);
        setStage('final');
      }
      setMessage('');
      setShowMessageForm(false);
    } else if (stage === 'final') {
      setMessages([
        ...messages,
        { text: message, isBot: false },
        { text: "¿En qué puedo ayudarte?", isBot: true }
      ]);
      setStage('initial');
      setMessage('');
      setShowMessageForm(true);
    }
  };

  return (
    <div className={isDarkMode?'chat-containe-dark-mode':"chat-container"}>
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
            className={isDarkMode?'textarea-dark-mode':"textarea"}
          />
          <button onClick={handleSendMessage} className="send-button">
            <SendIcon className="send-icon" />
          </button>
        </div>
      )}
      {!showMessageForm && <button onClick={handleButtonClick} className="start-button">{language?'¡Hola!':'Hello!'}</button>}
    </div>
  );
};

export default ChatBot;
