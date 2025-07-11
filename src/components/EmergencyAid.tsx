import React, { useState } from 'react';
import { Heart, AlertTriangle, Clock, Phone, ChevronRight } from 'lucide-react';

interface EmergencyAidProps {
  language: string;
}

const translations = {
  en: {
    title: "Emergency First Aid",
    subtitle: "Quick response for animal emergencies",
    selectAnimal: "Select Animal Type",
    selectEmergency: "Select Emergency Type",
    animals: ["Dog", "Cat", "Poultry", "Cattle", "Pig"],
    emergencies: [
      "Severe Bleeding",
      "Difficulty Breathing",
      "Poisoning",
      "Choking",
      "Broken Bones",
      "High Fever",
      "Seizures",
      "Unconscious"
    ],
    emergencyHotline: "Emergency Hotline: +94 11 123 4567",
    immediateSteps: "Immediate Steps",
    warning: "Warning: This is emergency guidance only. Contact a veterinarian immediately.",
    step: "Step"
  },
  ta: {
    title: "அவசர முதலுதவி",
    subtitle: "விலங்கு அவசரநிலைகளுக்கு விரைவான மறுமொழி",
    selectAnimal: "விலங்கு வகையை தேர்ந்தெடுக்கவும்",
    selectEmergency: "அவசரநிலை வகையை தேர்ந்தெடுக்கவும்",
    animals: ["நாய்", "பூனை", "கோழி", "மாடு", "பன்றி"],
    emergencies: [
      "கடுமையான இரத்தப்போக்கு",
      "மூச்சுத்திணறல்",
      "விஷம்",
      "மூச்சுத்திணறல்",
      "எலும்பு முறிவு",
      "அதிக காய்ச்சல்",
      "வலிப்பு",
      "சுயநினைவில்லாத நிலை"
    ],
    emergencyHotline: "அவசர தொலைபேசி: +94 11 123 4567",
    immediateSteps: "உடனடி நடவடிக்கைகள்",
    warning: "எச்சரிக்கை: இது அவசர வழிகாட்டுதல் மட்டுமே. உடனடியாக மருத்துவரை தொடர்பு கொள்ளவும்.",
    step: "படி"
  }
};

const EmergencyAid: React.FC<EmergencyAidProps> = ({ language }) => {
  const [selectedAnimal, setSelectedAnimal] = useState('');
  const [selectedEmergency, setSelectedEmergency] = useState('');

  const t = translations[language as keyof typeof translations];

  const getEmergencySteps = (animal: string, emergency: string, lang: string) => {
    const key = `${animal}-${emergency}`;
    
    const steps = {
      'Dog-Severe Bleeding': {
        en: [
          "Keep calm and approach the dog carefully",
          "Apply direct pressure to the wound with clean cloth",
          "If bleeding doesn't stop, apply pressure to pressure points",
          "Elevate the wounded area if possible",
          "Apply bandage and seek immediate veterinary care"
        ],
        ta: [
          "அமைதியாக இருங்கள் மற்றும் நாயை கவனமாக அணுகவும்",
          "சுத்தமான துணியால் காயத்தின் மீது நேரடி அழுத்தம் கொடுங்கள்",
          "இரத்தப்போக்கு நிற்கவில்லை என்றால், அழுத்த புள்ளிகளில் அழுத்தம் கொடுங்கள்",
          "முடிந்தால் காயமடைந்த பகுதியை உயர்த்தவும்",
          "கட்டு போட்டு உடனடி மருத்துவ உதவி பெறவும்"
        ]
      },
      'Cat-Difficulty Breathing': {
        en: [
          "Keep the cat calm and quiet",
          "Ensure airway is clear - remove any visible obstructions",
          "Position cat upright or on side",
          "Provide fresh air and cool environment",
          "Transport to veterinarian immediately"
        ],
        ta: [
          "பூனையை அமைதியாகவும் அமைதியாகவும் வைத்திருங்கள்",
          "காற்றுப்பாதை தெளிவாக உள்ளதை உறுதி செய்யவும் - தெரியும் தடைகளை அகற்றவும்",
          "பூனையை நேராக அல்லது பக்கவாட்டில் வைக்கவும்",
          "புதிய காற்று மற்றும் குளிர்ந்த சூழலை வழங்கவும்",
          "உடனடியாக மருத்துவரிடம் கொண்டு செல்லவும்"
        ]
      },
      'Poultry-Poisoning': {
        en: [
          "Remove bird from source of poison immediately",
          "Do NOT induce vomiting unless instructed by veterinarian",
          "Provide fresh water if bird is conscious",
          "Keep bird warm and quiet",
          "Contact poultry veterinarian immediately"
        ],
        ta: [
          "பறவையை உடனடியாக விஷ மூலத்திலிருந்து அகற்றவும்",
          "மருத்துவர் அறிவுறுத்தாத வரை வாந்தியை தூண்ட வேண்டாம்",
          "பறவை சுயநினைவில் இருந்தால் புதிய தண்ணீர் வழங்கவும்",
          "பறவையை சூடாகவும் அமைதியாகவும் வைக்கவும்",
          "உடனடியாக கோழி மருத்துவரை தொடர்பு கொள்ளவும்"
        ]
      }
    };

    return steps[key as keyof typeof steps]?.[lang as keyof typeof steps[keyof typeof steps]] || [];
  };

  const steps = selectedAnimal && selectedEmergency 
    ? getEmergencySteps(selectedAnimal, selectedEmergency, language)
    : [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Emergency Header */}
      <div className="bg-red-600 text-white rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <Heart className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">{t.title}</h2>
            <p className="text-red-100">{t.subtitle}</p>
          </div>
        </div>
        <div className="bg-red-700 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5" />
            <span className="font-semibold">{t.emergencyHotline}</span>
          </div>
        </div>
      </div>

      {/* Animal Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
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

      {/* Emergency Type Selection */}
      {selectedAnimal && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.selectEmergency}</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {t.emergencies.map((emergency, index) => (
              <button
                key={index}
                onClick={() => setSelectedEmergency(emergency)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  selectedEmergency === emergency
                    ? 'border-red-600 bg-red-50 text-red-800'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{emergency}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Steps */}
      {steps.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h3 className="text-lg font-semibold text-gray-800">{t.immediateSteps}</h3>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-sm text-yellow-800">{t.warning}</p>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{step}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-800 font-medium">
                {language === 'en' 
                  ? "Time is critical - contact veterinarian immediately after providing first aid"
                  : "நேரம் முக்கியம் - முதலுதவி வழங்கிய பிறகு உடனடியாக மருத்துவரை தொடர்பு கொள்ளவும்"
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAid;