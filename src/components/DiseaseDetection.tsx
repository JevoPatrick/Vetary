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
    noResults: "No analysis results yet",
    selectAnimal: "Select Animal Type",
    pleaseSelectAnimal: "Please select an animal type before uploading"
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
    noResults: "இன்னும் பகுப்பாய்வு முடிவுகள் இல்லை",
    selectAnimal: "விலங்கு வகையை தேர்ந்தெடுக்கவும்",
    pleaseSelectAnimal: "பதிவேற்றுவதற்கு முன் விலங்கு வகையை தேர்ந்தெடுக்கவும்"
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
    if (!selectedAnimal) {
      alert(t.pleaseSelectAnimal);
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    setSelectedFile(file);
    analyzeFile(file, selectedAnimal);
  };

  const analyzeFile = async (file: File, animalType: string) => {
    setAnalyzing(true);
    setResults(null);

    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock disease detection results
    const mockResults = {
      animal: animalType,
      disease: getRandomDisease(animalType, language),
      confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
      severity: getRandomSeverity(language),
      symptoms: getRandomSymptoms(animalType, language),
      recommendations: [
        language === 'en' ? 'Consult veterinarian immediately' : 'உடனடியாக மருத்துவரை அணுகவும்',
        language === 'en' ? 'Monitor symptoms closely' : 'அறிகுறிகளை நெருக்கமாக கண்காணிக்கவும்',
        language === 'en' ? 'Follow prescribed treatment' : 'பரிந்துரைக்கப்பட்ட சிகிச்சையை பின்பற்றவும்',
        language === 'en' ? 'Maintain proper hygiene' : 'சரியான சுகாதாரத்தை பராமரிக்கவும்'
      ],
      urgency: 'Medium',
      prescription: {
        medicine: getRandomMedicine(animalType, language),
        dosage: language === 'en' ? 'As prescribed by veterinarian' : 'மருத்துவர் பரிந்துரைத்தபடி',
        precautions: language === 'en' ? 'Follow veterinary guidance' : 'மருத்துவ வழிகாட்டுதலை பின்பற்றவும்'
      }
    };

    setResults(mockResults);
    setAnalyzing(false);
  };

  const getRandomDisease = (animal: string, lang: string) => {
    const diseases = {
      'Dogs': lang === 'en' ? ['Skin Dermatitis', 'Ear Infection', 'Allergic Reaction', 'Hot Spots'] : ['தோல் அழற்சி', 'காது நோய்த்தொற்று', 'ஒவ்வாமை', 'சூடான புள்ளிகள்'],
      'நாய்கள்': lang === 'en' ? ['Skin Dermatitis', 'Ear Infection', 'Allergic Reaction', 'Hot Spots'] : ['தோல் அழற்சி', 'காது நோய்த்தொற்று', 'ஒவ்வாமை', 'சூடான புள்ளிகள்'],
      'Cats': lang === 'en' ? ['Upper Respiratory Infection', 'Conjunctivitis', 'Skin Condition', 'Dental Issues'] : ['மேல் சுவாச நோய்த்தொற்று', 'கண் அழற்சி', 'தோல் நிலை', 'பல் பிரச்சினைகள்'],
      'பூனைகள்': lang === 'en' ? ['Upper Respiratory Infection', 'Conjunctivitis', 'Skin Condition', 'Dental Issues'] : ['மேல் சுவாச நோய்த்தொற்று', 'கண் அழற்சி', 'தோல் நிலை', 'பல் பிரச்சினைகள்'],
      'Poultry': lang === 'en' ? ['Newcastle Disease', 'Coccidiosis', 'Respiratory Infection', 'Parasites'] : ['நியூகாஸில் நோய்', 'கோக்சிடியோசிஸ்', 'சுவாச நோய்த்தொற்று', 'ஒட்டுண்ணிகள்'],
      'கோழி': lang === 'en' ? ['Newcastle Disease', 'Coccidiosis', 'Respiratory Infection', 'Parasites'] : ['நியூகாஸில் நோய்', 'கோக்சிடியோசிஸ்', 'சுவாச நோய்த்தொற்று', 'ஒட்டுண்ணிகள்'],
      'Cattle': lang === 'en' ? ['Mastitis', 'Foot and Mouth Disease', 'Respiratory Infection', 'Digestive Issues'] : ['பால்மடி அழற்சி', 'கால் மற்றும் வாய் நோய்', 'சுவாச நோய்த்தொற்று', 'செரிமான பிரச்சினைகள்'],
      'மாட்டு': lang === 'en' ? ['Mastitis', 'Foot and Mouth Disease', 'Respiratory Infection', 'Digestive Issues'] : ['பால்மடி அழற்சி', 'கால் மற்றும் வாய் நோய்', 'சுவாச நோய்த்தொற்று', 'செரிமான பிரச்சினைகள்'],
      'Pigs': lang === 'en' ? ['Swine Flu', 'Skin Infection', 'Respiratory Disease', 'Digestive Problems'] : ['பன்றி காய்ச்சல்', 'தோல் நோய்த்தொற்று', 'சுவாச நோய்', 'செரிமான பிரச்சினைகள்'],
      'பன்றி': lang === 'en' ? ['Swine Flu', 'Skin Infection', 'Respiratory Disease', 'Digestive Problems'] : ['பன்றி காய்ச்சல்', 'தோல் நோய்த்தொற்று', 'சுவாச நோய்', 'செரிமான பிரச்சினைகள்']
    };
    const animalDiseases = diseases[animal as keyof typeof diseases] || diseases['Dogs'];
    return animalDiseases[Math.floor(Math.random() * animalDiseases.length)];
  };

  const getRandomSeverity = (lang: string) => {
    const severities = lang === 'en' ? ['Mild', 'Moderate', 'Severe'] : ['லேசான', 'மிதமான', 'கடுமையான'];
    return severities[Math.floor(Math.random() * severities.length)];
  };

  const getRandomSymptoms = (animal: string, lang: string) => {
    const symptoms = {
      'Dogs': lang === 'en' ? ['Redness', 'Itching', 'Hair loss', 'Inflammation', 'Discharge'] : ['சிவப்பு', 'அரிப்பு', 'முடி உதிர்தல்', 'வீக்கம்', 'வெளியேற்றம்'],
      'நாய்கள்': lang === 'en' ? ['Redness', 'Itching', 'Hair loss', 'Inflammation', 'Discharge'] : ['சிவப்பு', 'அரிப்பு', 'முடி உதிர்தல்', 'வீக்கம்', 'வெளியேற்றம்'],
      'Cats': lang === 'en' ? ['Sneezing', 'Eye discharge', 'Lethargy', 'Loss of appetite'] : ['தும்மல்', 'கண் வெளியேற்றம்', 'சோர்வு', 'பசியின்மை'],
      'பூனைகள்': lang === 'en' ? ['Sneezing', 'Eye discharge', 'Lethargy', 'Loss of appetite'] : ['தும்மல்', 'கண் வெளியேற்றம்', 'சோர்வு', 'பசியின்மை'],
      'Poultry': lang === 'en' ? ['Coughing', 'Difficulty breathing', 'Reduced egg production', 'Weakness'] : ['இருமல்', 'மூச்சுத்திணறல்', 'முட்டை உற்பத்தி குறைவு', 'பலவீனம்'],
      'கோழி': lang === 'en' ? ['Coughing', 'Difficulty breathing', 'Reduced egg production', 'Weakness'] : ['இருமல்', 'மூச்சுத்திணறல்', 'முட்டை உற்பத்தி குறைவு', 'பலவீனம்'],
      'Cattle': lang === 'en' ? ['Swollen udder', 'Reduced milk production', 'Fever', 'Loss of appetite'] : ['வீங்கிய பால்மடி', 'பால் உற்பத்தி குறைவு', 'காய்ச்சல்', 'பசியின்மை'],
      'மாட்டு': lang === 'en' ? ['Swollen udder', 'Reduced milk production', 'Fever', 'Loss of appetite'] : ['வீங்கிய பால்மடி', 'பால் உற்பத்தி குறைவு', 'காய்ச்சல்', 'பசியின்மை'],
      'Pigs': lang === 'en' ? ['Coughing', 'Fever', 'Loss of appetite', 'Skin lesions'] : ['இருமல்', 'காய்ச்சல்', 'பசியின்மை', 'தோல் புண்கள்'],
      'பன்றி': lang === 'en' ? ['Coughing', 'Fever', 'Loss of appetite', 'Skin lesions'] : ['இருமல்', 'காய்ச்சல்', 'பசியின்மை', 'தோல் புண்கள்']
    };
    const animalSymptoms = symptoms[animal as keyof typeof symptoms] || symptoms['Dogs'];
    return animalSymptoms.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 symptoms
  };

  const getRandomMedicine = (animal: string, lang: string) => {
    const medicines = {
      'Dogs': lang === 'en' ? ['Antibiotic Cream', 'Anti-inflammatory', 'Antihistamine', 'Medicated Shampoo'] : ['ஆண்டிபயாடிக் க்ரீம்', 'அழற்சி எதிர்ப்பு', 'ஆண்டிஹிஸ்டமைன்', 'மருத்துவ ஷாம்பு'],
      'நாய்கள்': lang === 'en' ? ['Antibiotic Cream', 'Anti-inflammatory', 'Antihistamine', 'Medicated Shampoo'] : ['ஆண்டிபயாடிக் க்ரீம்', 'அழற்சி எதிர்ப்பு', 'ஆண்டிஹிஸ்டமைன்', 'மருத்துவ ஷாம்பு'],
      'Cats': lang === 'en' ? ['Amoxicillin', 'Eye Drops', 'Respiratory Support', 'Immune Booster'] : ['அமோக்ஸிசிலின்', 'கண் சொட்டுகள்', 'சுவாச ஆதரவு', 'நோய் எதிர்ப்பு சக்தி'],
      'பூனைகள்': lang === 'en' ? ['Amoxicillin', 'Eye Drops', 'Respiratory Support', 'Immune Booster'] : ['அமோக்ஸிசிலின்', 'கண் சொட்டுகள்', 'சுவாச ஆதரவு', 'நோய் எதிர்ப்பு சக்தி'],
      'Poultry': lang === 'en' ? ['Antibiotic Powder', 'Respiratory Medicine', 'Vitamin Supplement', 'Anti-parasitic'] : ['ஆண்டிபயாடிக் பவுடர்', 'சுவாச மருந்து', 'வைட்டமின் சப்ளிமெண்ட்', 'ஒட்டுண்ணி எதிர்ப்பு'],
      'கோழி': lang === 'en' ? ['Antibiotic Powder', 'Respiratory Medicine', 'Vitamin Supplement', 'Anti-parasitic'] : ['ஆண்டிபயாடிக் பவுடர்', 'சுவாச மருந்து', 'வைட்டமின் சப்ளிமெண்ட்', 'ஒட்டுண்ணி எதிர்ப்பு'],
      'Cattle': lang === 'en' ? ['Penicillin G', 'Mastitis Treatment', 'Anti-inflammatory', 'Udder Cream'] : ['பென்சிலின் ஜி', 'பால்மடி அழற்சி சிகிச்சை', 'அழற்சி எதிர்ப்பு', 'பால்மடி க்ரீம்'],
      'மாட்டு': lang === 'en' ? ['Penicillin G', 'Mastitis Treatment', 'Anti-inflammatory', 'Udder Cream'] : ['பென்சிலின் ஜி', 'பால்மடி அழற்சி சிகிச்சை', 'அழற்சி எதிர்ப்பு', 'பால்மடி க்ரீம்'],
      'Pigs': lang === 'en' ? ['Broad Spectrum Antibiotic', 'Respiratory Treatment', 'Skin Medication', 'Fever Reducer'] : ['பரந்த ஸ்பெக்ட்ரம் ஆண்டிபயாடிக்', 'சுவாச சிகிச்சை', 'தோல் மருந்து', 'காய்ச்சல் குறைப்பான்'],
      'பன்றி': lang === 'en' ? ['Broad Spectrum Antibiotic', 'Respiratory Treatment', 'Skin Medication', 'Fever Reducer'] : ['பரந்த ஸ்பெக்ட்ரம் ஆண்டிபயாடிக்', 'சுவாச சிகிச்சை', 'தோல் மருந்து', 'காய்ச்சல் குறைப்பான்']
    };
    const animalMedicines = medicines[animal as keyof typeof medicines] || medicines['Dogs'];
    return animalMedicines[Math.floor(Math.random() * animalMedicines.length)];
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

        {/* Animal Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.selectAnimal}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {t.animals.map((animal, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnimal(animal)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedAnimal === animal
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🐾</div>
                  <span className="text-sm font-medium">{animal}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

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
            onClick={() => selectedAnimal ? fileInputRef.current?.click() : alert(t.pleaseSelectAnimal)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Camera className="h-5 w-5" />
            <span>{t.uploadImage}</span>
          </button>
          <button
            onClick={() => selectedAnimal ? videoInputRef.current?.click() : alert(t.pleaseSelectAnimal)}
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