import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';

interface ChatBotProps {
  language: string;
}

const translations = {
  en: {
    title: "AI Veterinary Assistant",
    subtitle: "Ask about animal diseases, symptoms, and first aid",
    placeholder: "Ask about animal health, symptoms, or first aid...",
    send: "Send",
    typing: "AI is typing...",
    examples: [
      "What are the symptoms of rabies in dogs?",
      "How to treat a cat with fever?",
      "First aid for injured poultry",
      "Signs of illness in cattle"
    ]
  },
  ta: {
    title: "AI மருத்துவ உதவியாளர்",
    subtitle: "விலங்கு நோய்கள், அறிகுறிகள் மற்றும் முதலுதவி பற்றி கேளுங்கள்",
    placeholder: "விலங்கு ஆரோக்கியம், அறிகுறிகள் அல்லது முதலுதவி பற்றி கேளுங்கள்...",
    send: "அனுப்பு",
    typing: "AI தட்டச்சு செய்கிறது...",
    examples: [
      "நாய்களில் வெறிநாய்க்கடியின் அறிகுறிகள் என்ன?",
      "காய்ச்சல் உள்ள பூனையை எப்படி சிகிச்சை செய்வது?",
      "காயமடைந்த கோழிக்கு முதலுதவி",
      "மாட்டில் நோயின் அறிகுறிகள்"
    ]
  }
};

const ChatBot: React.FC<ChatBotProps> = ({ language }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage = language === 'en' 
        ? "Hello! I'm your AI veterinary assistant. I can help you with animal health questions, disease symptoms, and first aid guidance. How can I help you today?"
        : "வணக்கம்! நான் உங்களின் AI மருத்துவ உதவியாளர். விலங்கு ஆரோக்கிய கேள்விகள், நோய் அறிகுறிகள் மற்றும் முதலுதவி வழிகாட்டுதலுடன் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?";
      
      setMessages([{
        id: 1,
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [language]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));

    const botResponse = generateResponse(input, language);
    const botMessage = {
      id: Date.now() + 1,
      text: botResponse,
      sender: 'bot' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const generateResponse = (query: string, lang: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Disease-specific responses
    if (lowerQuery.includes('rabies') || lowerQuery.includes('வெறிநாய்')) {
      return lang === 'en' 
        ? "Rabies symptoms in dogs include: excessive drooling, difficulty swallowing, behavioral changes, aggression, and paralysis. This is a medical emergency - seek immediate veterinary care. Keep the animal isolated and contact authorities."
        : "நாய்களில் வெறிநாய்க்கடியின் அறிகுறிகள்: அதிக உமிழ்நீர், விழுங்குவதில் சிரமம், நடத்தை மாற்றம், ஆக்ரோஷம் மற்றும் பக்கவாதம். இது ஒரு மருத்துவ அவசரநிலை - உடனடி மருத்துவ பராமரிப்பு தேவை.";
    }

    if (lowerQuery.includes('fever') || lowerQuery.includes('காய்ச்சல்')) {
      return lang === 'en'
        ? "For fever in cats: Keep them hydrated, provide a cool environment, monitor temperature, and consult a vet if fever persists over 24 hours. Normal cat temperature is 100.5-102.5°F. Give plenty of water and rest."
        : "பூனைகளில் காய்ச்சலுக்கு: அவற்றை நீர்ச்சத்து பராமரிக்க, குளிர்ந்த சூழலை வழங்க, வெப்பநிலையை கண்காணிக்க, 24 மணிநேரத்திற்கு மேல் காய்ச்சல் நீடித்தால் மருத்துவரை அணுக வேண்டும்.";
    }

    if (lowerQuery.includes('injury') || lowerQuery.includes('wound') || lowerQuery.includes('காயம்')) {
      return lang === 'en'
        ? "For animal injuries: 1) Stay calm and approach carefully 2) Clean the wound with saline solution 3) Apply pressure to stop bleeding 4) Cover with sterile bandage 5) Seek veterinary care immediately for deep wounds."
        : "விலங்கு காயங்களுக்கு: 1) அமைதியாக இருங்கள் 2) காயத்தை உப்பு நீரால் சுத்தப்படுத்துங்கள் 3) இரத்தப்போக்கை நிறுத்த அழுத்தம் கொடுங்கள் 4) மலட்டு கட்டுடன் மூடுங்கள் 5) ஆழமான காயங்களுக்கு உடனடி மருத்துவ பராமரிப்பு தேவை.";
    }

    if (lowerQuery.includes('poultry') || lowerQuery.includes('chicken') || lowerQuery.includes('கோழி')) {
      return lang === 'en'
        ? "Common poultry health issues: respiratory infections, parasites, and digestive problems. Watch for lethargy, decreased appetite, abnormal droppings, or breathing difficulties. Isolate sick birds and consult a poultry veterinarian."
        : "பொதுவான கோழி ஆரோக்கிய பிரச்சினைகள்: சுவாச நோய்த்தொற்றுகள், ஒட்டுண்ணிகள் மற்றும் செரிமான பிரச்சினைகள். சோர்வு, பசியின்மை, அசாதாரண மலம் அல்லது மூச்சுத்திணறல் ஆகியவற்றைக் கவனிக்கவும்.";
    }

    if (lowerQuery.includes('cattle') || lowerQuery.includes('cow') || lowerQuery.includes('மாடு')) {
      return lang === 'en'
        ? "Cattle health monitoring: Check for normal eating, rumination, and social behavior. Watch for signs like loss of appetite, isolation, abnormal discharge, or changes in milk production. Regular health checks are essential."
        : "மாட்டு ஆரோக்கிய கண்காணிப்பு: சாதாரண உணவு, அசைபோடுதல் மற்றும் சமூக நடத்தையை சரிபார்க்கவும். பசியின்மை, தனிமை, அசாதாரண வெளியேற்றம் அல்லது பால் உற்பத்தியில் மாற்றங்கள் போன்ற அறிகுறிகளைக் கவனிக்கவும்.";
    }

    if (lowerQuery.includes('pig') || lowerQuery.includes('swine') || lowerQuery.includes('பன்றி')) {
      return lang === 'en'
        ? "Pig health essentials: Monitor for normal appetite, activity, and breathing. Common issues include respiratory problems, digestive disorders, and skin conditions. Maintain proper hygiene and ventilation."
        : "பன்றி ஆரோக்கிய அடிப்படைகள்: சாதாரண பசி, செயல்பாடு மற்றும் சுவாசத்தை கண்காணிக்கவும். பொதுவான பிரச்சினைகள் சுவாச பிரச்சினைகள், செரிமான கோளாறுகள் மற்றும் தோல் நிலைமைகள்.";
    }

    // General response
    return lang === 'en'
      ? "I can help you with animal health questions, disease symptoms, and first aid guidance. Please provide more specific details about the animal and symptoms you're observing, and I'll give you detailed advice."
      : "விலங்கு ஆரோக்கிய கேள்விகள், நோய் அறிகுறிகள் மற்றும் முதலுதவி வழிகாட்டுதலுடன் உங்களுக்கு உதவ முடியும். நீங்கள் அவதானிக்கும் விலங்கு மற்றும் அறிகுறிகள் பற்றி மேலும் குறிப்பிட்ட விவரங்களை வழங்கவும்.";
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg h-96 flex flex-col">
        <div className="p-4 border-b bg-blue-50 rounded-t-lg">
          <h2 className="text-xl font-bold text-gray-800">{t.title}</h2>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Bot className="h-4 w-4 mt-0.5 text-blue-600" />
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5 text-white" />
                  )}
                  <div>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">{t.typing}</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Example Questions */}
      <div className="mt-6 bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Example Questions:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {t.examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;