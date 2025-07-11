import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, User, Pill } from 'lucide-react';

interface PrescriptionsProps {
  language: string;
}

const translations = {
  en: {
    title: "Prescription Management",
    subtitle: "AI-generated prescriptions and treatment plans",
    searchPlaceholder: "Search prescriptions...",
    filterBy: "Filter by",
    allAnimals: "All Animals",
    recentPrescriptions: "Recent Prescriptions",
    generateNew: "Generate New Prescription",
    medicine: "Medicine",
    dosage: "Dosage",
    duration: "Duration",
    instructions: "Instructions",
    precautions: "Precautions",
    followUp: "Follow-up",
    severity: "Severity",
    dateIssued: "Date Issued",
    animalType: "Animal Type",
    condition: "Condition"
  },
  ta: {
    title: "மருந்து பரிந்துரை நிர்வாகம்",
    subtitle: "AI-உருவாக்கப்பட்ட மருந்து பரிந்துரைகள் மற்றும் சிகிச்சை திட்டங்கள்",
    searchPlaceholder: "மருந்து பரிந்துரைகளைத் தேடவும்...",
    filterBy: "வடிப்பான்",
    allAnimals: "அனைத்து விலங்குகள்",
    recentPrescriptions: "சமீபத்திய மருந்து பரிந்துரைகள்",
    generateNew: "புதிய மருந்து பரிந்துரை உருவாக்கவும்",
    medicine: "மருந்து",
    dosage: "அளவு",
    duration: "காலம்",
    instructions: "அறிவுறுத்தல்கள்",
    precautions: "முன்னெச்சரிக்கைகள்",
    followUp: "பின்தொடர்தல்",
    severity: "தீவிரம்",
    dateIssued: "வழங்கப்பட்ட தேதி",
    animalType: "விலங்கு வகை",
    condition: "நிலை"
  }
};

const Prescriptions: React.FC<PrescriptionsProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnimal, setFilterAnimal] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);

  const t = translations[language as keyof typeof translations];

  const mockPrescriptions = [
    {
      id: 1,
      animalType: language === 'en' ? 'Dog' : 'நாய்',
      condition: language === 'en' ? 'Skin Dermatitis' : 'தோல் அழற்சி',
      severity: language === 'en' ? 'Moderate' : 'மிதமான',
      dateIssued: '2024-01-15',
      medicines: [
        {
          name: 'Betamethasone Cream',
          dosage: '0.1% topical',
          duration: '7 days',
          instructions: language === 'en' ? 'Apply twice daily to affected area' : 'பாதிக்கப்பட்ட பகுதியில் தினமும் இரண்டு முறை தடவவும்',
          precautions: language === 'en' ? 'Avoid contact with eyes' : 'கண்களுடன் தொடர்பு தவிர்க்கவும்'
        },
        {
          name: 'Antihistamine',
          dosage: '25mg',
          duration: '5 days',
          instructions: language === 'en' ? 'Once daily with food' : 'உணவுடன் தினமும் ஒரு முறை',
          precautions: language === 'en' ? 'May cause drowsiness' : 'தூக்கம் வரலாம்'
        }
      ],
      followUp: language === 'en' ? 'Review in 7 days' : '7 நாட்களில் மறுபரிசீலனை'
    },
    {
      id: 2,
      animalType: language === 'en' ? 'Cat' : 'பூனை',
      condition: language === 'en' ? 'Upper Respiratory Infection' : 'மேல் சுவாச நோய்த்தொற்று',
      severity: language === 'en' ? 'Mild' : 'லேசான',
      dateIssued: '2024-01-14',
      medicines: [
        {
          name: 'Amoxicillin',
          dosage: '50mg',
          duration: '10 days',
          instructions: language === 'en' ? 'Twice daily with food' : 'உணவுடன் தினமும் இரண்டு முறை',
          precautions: language === 'en' ? 'Complete full course' : 'முழு கோர்ஸ் முடிக்கவும்'
        }
      ],
      followUp: language === 'en' ? 'Review in 5 days' : '5 நாட்களில் மறுபரிசீலனை'
    },
    {
      id: 3,
      animalType: language === 'en' ? 'Cattle' : 'மாடு',
      condition: language === 'en' ? 'Mastitis' : 'பால்மடி அழற்சி',
      severity: language === 'en' ? 'Severe' : 'கடுமையான',
      dateIssued: '2024-01-13',
      medicines: [
        {
          name: 'Penicillin G',
          dosage: '20,000 IU/kg',
          duration: '7 days',
          instructions: language === 'en' ? 'Intramuscular injection twice daily' : 'தசையில் ஊசி தினமும் இரண்டு முறை',
          precautions: language === 'en' ? 'Milk withdrawal period: 4 days' : 'பால் திரும்பப் பெறும் காலம்: 4 நாட்கள்'
        }
      ],
      followUp: language === 'en' ? 'Review in 3 days' : '3 நாட்களில் மறுபரிசீலனை'
    }
  ];

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = prescription.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.animalType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAnimal === 'all' || prescription.animalType.toLowerCase().includes(filterAnimal.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
      case 'லேசான':
        return 'bg-green-100 text-green-800';
      case 'moderate':
      case 'மிதமான':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
      case 'கடுமையான':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 mb-6">{t.subtitle}</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t.allAnimals}</option>
              <option value="dog">{language === 'en' ? 'Dogs' : 'நாய்கள்'}</option>
              <option value="cat">{language === 'en' ? 'Cats' : 'பூனைகள்'}</option>
              <option value="cattle">{language === 'en' ? 'Cattle' : 'மாடுகள்'}</option>
              <option value="poultry">{language === 'en' ? 'Poultry' : 'கோழிகள்'}</option>
            </select>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>{t.generateNew}</span>
          </div>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.recentPrescriptions}</h3>
            <div className="space-y-3">
              {filteredPrescriptions.map((prescription) => (
                <div
                  key={prescription.id}
                  onClick={() => setSelectedPrescription(prescription)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedPrescription?.id === prescription.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-800">{prescription.animalType}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(prescription.severity)}`}>
                      {prescription.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{prescription.condition}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{prescription.dateIssued}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedPrescription ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedPrescription.condition}</h3>
                  <p className="text-gray-600">{selectedPrescription.animalType}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(selectedPrescription.severity)}`}>
                    {selectedPrescription.severity}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{selectedPrescription.dateIssued}</p>
                </div>
              </div>

              <div className="space-y-6">
                {selectedPrescription.medicines.map((medicine: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{t.dosage}</p>
                        <p className="font-medium">{medicine.dosage}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{t.duration}</p>
                        <p className="font-medium">{medicine.duration}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-1">{t.instructions}</p>
                      <p className="text-sm text-gray-800">{medicine.instructions}</p>
                    </div>

                    <div className="mt-3 bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>{t.precautions}:</strong> {medicine.precautions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>{t.followUp}:</strong> {selectedPrescription.followUp}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'en' 
                  ? 'Select a prescription to view details' 
                  : 'விவரங்களை காண ஒரு மருந்து பரிந்துரையை தேர்ந்தெடுக்கவும்'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prescriptions;