import React, { useState, useRef } from 'react';
import { Camera, Upload, Video, AlertCircle, CheckCircle, Clock, FileX } from 'lucide-react';

interface DiseaseDetectionProps {
  language: string;
}

const translations = {
  en: {
    title: "Animal Disease Detection",
    subtitle: "Upload image or video for AI analysis",
    uploadImage: "Upload Image",
    uploadVideo: "Upload Video",
    takePhoto: "Take Photo",
    analyzing: "Analyzing...",
    supportedAnimals: "Supported Animals",
    animals: ["Dogs", "Cats", "Poultry", "Cattle", "Pigs"],
    selectFile: "Select image or video file",
    dragDrop: "Drag & drop files here",
    maxSize: "Max file size: 10MB",
    results: "Analysis Results",
    confidence: "Confidence",
    recommendations: "Recommendations",
    noResults: "No analysis results yet"
  },
  ta: {
    title: "விலங்கு நோய் கண்டறிதல்",
    subtitle: "AI பகுப்பாய்வுக்கு படம் அல்லது வீடியோ பதிவேற்றவும்",
    uploadImage: "படம் பதிவேற்று",
    uploadVideo: "வீடியோ பதிவேற்று",
    takePhoto: "புகைப்படம் எடு",
    analyzing: "பகுப்பாய்வு...",
    supportedAnimals: "ஆதரிக்கப்படும் விலங்குகள்",
    animals: ["நாய்கள்", "பூனைகள்", "கோழி", "மாட்டு", "பன்றி"],
    selectFile: "படம் அல்லது வீடியோ கோப்பு தேர்ந்தெடுக்கவும்",
    dragDrop: "கோப்புகளை இங்கே இழுத்து விடவும்",
    maxSize: "அதிகபட்ச கோப்பு அளவு: 10MB",
    results: "பகுப்பாய்வு முடிவுகள்",
    confidence: "நம்பகத்தன்மை",
    recommendations: "பரிந்துரைகள்",
    noResults: "இன்னும் பகுப்பாய்வு முடிவுகள் இல்லை"
  }
};

const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ language }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language as keyof typeof translations];

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    setSelectedFile(file);
    analyzeFile(file);
  };

  const analyzeFile = async (file: File) => {
    setAnalyzing(true);
    setResults(null);

    if (!selectedAnimal) {
      alert(language === 'en' ? 'Please select an animal type first' : 'முதலில் விலங்கு வகையை தேர்ந்தெடுக்கவும்');
      setAnalyzing(false);
      return;
    }

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock disease detection results
    const mockResults = {
      animal: selectedAnimal,
      disease: getRandomDisease(selectedAnimal),
      confidence: 85,
      severity: 'Moderate',
      symptoms: ['Redness', 'Itching', 'Hair loss', 'Inflammation'],
      recommendations: [
        'Apply antiseptic cream',
        'Keep area clean and dry',
        'Consult veterinarian for prescription',
        'Monitor for worsening symptoms'
      ],
      urgency: 'Medium',
      prescription: {
        medicine: 'Betamethasone Cream',
        dosage: 'Apply twice daily for 7 days',
        precautions: 'Avoid contact with eyes'
      }
    };

    setResults(mockResults);
    setAnalyzing(false);
  };

  const getRandomDisease = (animal: string) => {
    const diseases = {
      'Dogs': ['Skin Dermatitis', 'Hip Dysplasia', 'Kennel Cough', 'Parvovirus'],
      'Cats': ['Upper Respiratory Infection', 'Feline Leukemia', 'Urinary Tract Infection'],
      'Poultry': ['Avian Influenza', 'Newcastle Disease', 'Coccidiosis'],
      'Cattle': ['Mastitis', 'Foot and Mouth Disease', 'Bovine Respiratory Disease'],
      'Pigs': ['Swine Flu', 'African Swine Fever', 'Porcine Reproductive Syndrome'],
      'நாய்கள்': ['தோல் அழற்சி', 'இடுப்பு சிதைவு', 'கென்னல் இருமல்', 'பார்வோவைரஸ்'],
      'பூனைகள்': ['மேல் சுவாச நோய்த்தொற்று', 'பூனை லுகேமியா', 'சிறுநீர் பாதை நோய்த்தொற்று'],
      'கோழி': ['பறவை காய்ச்சல்', 'நியூகாஸில் நோய்', 'கோக்சிடியோசிஸ்'],
      'மாட்டு': ['பால்மடி அழற்சி', 'கால் மற்றும் வாய் நோய்', 'மாட்டு சுவாச நோய்'],
      'பன்றி': ['பன்றி காய்ச்சல்', 'ஆப்பிரிக்க பன்றி காய்ச்சல்', 'பன்றி இனப்பெருக்க நோய்க்குறி']
    };
    const animalDiseases = diseases[animal as keyof typeof diseases] || diseases['Dogs'];
    return animalDiseases[Math.floor(Math.random() * animalDiseases.length)];
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 mb-6">{t.subtitle}</p>

        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{selectedFile.name}</h3>
                <p className="text-sm text-gray-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
          ) : (
            <div>
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">{t.selectFile}</p>
              <p className="text-sm text-gray-500 mb-4">{t.dragDrop}</p>
              <p className="text-xs text-gray-400">{t.maxSize}</p>
            </div>
          )}
        </div>

        {/* Upload Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span>{t.uploadImage}</span>
          </button>
          <button
            onClick={() => videoInputRef.current?.click()}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Video className="h-5 w-5" />
            <span>{t.uploadVideo}</span>
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>

      {/* Supported Animals */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.supportedAnimals}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {language === 'en' 
            ? 'Select the animal type you want to analyze:' 
            : 'நீங்கள் பகுப்பாய்வு செய்ய விரும்பும் விலங்கு வகையை தேர்ந்தெடுக்கவும்:'
          }
        </p>
        <div className="grid grid-cols-5 gap-4">
          {t.animals.map((animal, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnimal(animal)}
              className={`text-center p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                selectedAnimal === animal
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-full mb-2 mx-auto w-16 h-16 flex items-center justify-center transition-colors ${
                selectedAnimal === animal ? 'bg-blue-200' : 'bg-blue-100'
              }`}>
                <span className="text-2xl">🐾</span>
              </div>
              <p className={`text-sm font-medium ${
                selectedAnimal === animal ? 'text-blue-800' : 'text-gray-700'
              }`}>
                {animal}
              </p>
              {selectedAnimal === animal && (
                <div className="mt-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        {selectedAnimal && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              {language === 'en' 
                ? `Selected: ${selectedAnimal}. You can now upload an image or video for analysis.`
                : `தேர்ந்தெடுக்கப்பட்டது: ${selectedAnimal}. இப்போது நீங்கள் பகுப்பாய்வுக்காக ஒரு படம் அல்லது வீடியோவை பதிவேற்றலாம்.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Analysis Status */}
      {analyzing && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-lg font-medium text-gray-700">{t.analyzing}</p>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t.results}</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">Detection Results</h4>
                <p><strong>Animal:</strong> {results.animal}</p>
                <p><strong>Disease:</strong> {results.disease}</p>
                <p><strong>Severity:</strong> {results.severity}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{t.confidence}</p>
                  <div className="bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${results.confidence}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{results.confidence}%</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Symptoms</h4>
                <ul className="space-y-1">
                  {results.symptoms.map((symptom: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-2">{t.recommendations}</h4>
                <ul className="space-y-2">
                  {results.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Prescription</h4>
                <p><strong>Medicine:</strong> {results.prescription.medicine}</p>
                <p><strong>Dosage:</strong> {results.prescription.dosage}</p>
                <p><strong>Precautions:</strong> {results.prescription.precautions}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;