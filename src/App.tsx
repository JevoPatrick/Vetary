import React, { useState } from 'react';
import { Menu, Stethoscope, MapPin, AlertTriangle, Pill, Camera } from 'lucide-react';
import ChatBot from './components/ChatBot';
import VetFinder from './components/VetFinder';
import EmergencyAid from './components/EmergencyAid';
import Prescriptions from './components/Prescriptions';
import DiseaseDetection from './components/DiseaseDetection';

type ActiveComponent = 'home' | 'chat' | 'vet' | 'emergency' | 'prescriptions' | 'detection';

export default function App() {
  const [activeComponent, setActiveComponent] = useState<ActiveComponent>('home');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'chat':
        return <ChatBot />;
      case 'vet':
        return <VetFinder />;
      case 'emergency':
        return <EmergencyAid />;
      case 'prescriptions':
        return <Prescriptions />;
      case 'detection':
        return <DiseaseDetection />;
      default:
        return (
          <div className="text-center py-12">
            <Stethoscope className="w-24 h-24 mx-auto text-blue-600 mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Veterinary Care Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your comprehensive platform for animal health management, emergency care, and veterinary services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => setActiveComponent('chat')}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <Menu className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Chat Assistant</h3>
                <p className="text-sm text-gray-600 mt-2">Get instant veterinary advice</p>
              </button>
              <button
                onClick={() => setActiveComponent('vet')}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Find Veterinarians</h3>
                <p className="text-sm text-gray-600 mt-2">Locate nearby veterinary clinics</p>
              </button>
              <button
                onClick={() => setActiveComponent('emergency')}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Emergency Aid</h3>
                <p className="text-sm text-gray-600 mt-2">First aid for animals</p>
              </button>
              <button
                onClick={() => setActiveComponent('prescriptions')}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <Pill className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">Prescriptions</h3>
                <p className="text-sm text-gray-600 mt-2">Manage medications</p>
              </button>
            </div>
            <div className="mt-8">
              <button
                onClick={() => setActiveComponent('detection')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-5 h-5 mr-2" />
                Disease Detection
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setActiveComponent('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
            >
              <Stethoscope className="w-6 h-6" />
              <span>VetCare</span>
            </button>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveComponent('chat')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeComponent === 'chat'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveComponent('vet')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeComponent === 'vet'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Find Vets
              </button>
              <button
                onClick={() => setActiveComponent('emergency')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeComponent === 'emergency'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Emergency
              </button>
              <button
                onClick={() => setActiveComponent('prescriptions')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeComponent === 'prescriptions'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Prescriptions
              </button>
              <button
                onClick={() => setActiveComponent('detection')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeComponent === 'detection'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Detection
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveComponent()}
      </main>
    </div>
  );
}