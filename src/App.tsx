import React, { useState, useEffect } from 'react';
import { Camera, MessageCircle, MapPin, Languages, Stethoscope, AlertCircle, Phone, Heart, FileText } from 'lucide-react';
import DiseaseDetection from './components/DiseaseDetection';
import ChatBot from './components/ChatBot';
import VetFinder from './components/VetFinder';
import EmergencyAid from './components/EmergencyAid';
import Prescriptions from './components/Prescriptions';

const translations = {
  en: {
    title: "VetCare AI",
    subtitle: "Professional Animal Disease Detection",
    diseaseDetection: "Disease Detection",
    chatbot: "AI Assistant",
    vetFinder: "Find Veterinarian",
    emergency: "Emergency Aid",
    prescriptions: "Prescriptions",
    language: "Language"
  },
  ta: {
    title: "வெட்கேர் AI",
    subtitle: "தொழில்முறை விலங்கு நோய் கண்டறிதல்",
    diseaseDetection: "நோய் கண்டறிதல்",
    chatbot: "AI உதவியாளர்",
    vetFinder: "மருத்துவர் கண்டறி",
    emergency: "அவசர உதவி",
    prescriptions: "மருந்து பரிந்துரைகள்",
    language: "மொழி"
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('detection');
  const [language, setLanguage] = useState('en');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLocationError('');
        },
        (error) => {
          setLocationError('Location access denied. Please enable location services.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'detection':
        return <DiseaseDetection language={language} />;
      case 'chatbot':
        return <ChatBot language={language} />;
      case 'vetfinder':
        return <VetFinder language={language} location={location} />;
      case 'emergency':
        return <EmergencyAid language={language} />;
      case 'prescriptions':
        return <Prescriptions language={language} />;
      default:
        return <DiseaseDetection language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {location && (
                <div className="flex items-center text-green-600 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Located</span>
                </div>
              )}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              >
                <Languages className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'TA'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Location Error */}
      {locationError && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mx-4 mt-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-700">{locationError}</p>
            <button
              onClick={requestLocation}
              className="ml-auto bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'detection', label: t.diseaseDetection, icon: Camera },
              { id: 'chatbot', label: t.chatbot, icon: MessageCircle },
              { id: 'vetfinder', label: t.vetFinder, icon: MapPin },
              { id: 'emergency', label: t.emergency, icon: AlertCircle },
              { id: 'prescriptions', label: t.prescriptions, icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderActiveComponent()}
      </main>

      {/* Emergency FAB */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setActiveTab('emergency')}
          className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <Heart className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default App;