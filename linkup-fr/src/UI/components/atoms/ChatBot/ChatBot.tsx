import { useState, ChangeEvent, MouseEvent } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './ChatBot.css';

interface ChatBotProps {
  botImage: string;
  userImage: string;
}

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ botImage, userImage }) => {
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! ¿En qué puedo ayudarte?", isBot: true }
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
        { text: "¿Deseas ser redirigido a WhatsApp para hablar con alguien de Riwi?", isBot: true }
      ]);
      setStage('confirm');
    } else if (stage === 'confirm') {
      if (message.toLowerCase() === 'sí' || message.toLowerCase() === 'si') {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          { text: "Voy a redirigirte a WhatsApp para hablar con alguien de Riwi.", isBot: true }
        ]);
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://api.whatsapp.com/send?phone=+573007446873&text=${encodedMessage}`);
      } else {
        setMessages([
          ...messages,
          { text: message, isBot: false },
          { text: "Lo siento, no puedo ayudarte en este momento. Por favor, intenta más tarde.", isBot: true }
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
    <div className="chat-container">
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
            className="textarea"
          />
          <button onClick={handleSendMessage} className="send-button">
            <SendIcon className="send-icon" />
          </button>
        </div>
      )}
      {!showMessageForm && <button onClick={handleButtonClick} className="start-button">¡Hola!</button>}
    </div>
  );
};

export default ChatBot;
