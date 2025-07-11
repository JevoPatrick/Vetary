import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Star, Navigation } from 'lucide-react';

interface VetFinderProps {
  language: string;
  location: {lat: number, lng: number} | null;
}

const translations = {
  en: {
    title: "Find Nearby Veterinarians",
    subtitle: "Sri Lanka Northern Province",
    noLocation: "Location access needed to find nearby veterinarians",
    enableLocation: "Enable Location",
    searching: "Searching for veterinarians...",
    callNow: "Call Now",
    getDirections: "Get Directions",
    openNow: "Open Now",
    closed: "Closed",
    distance: "km away",
    rating: "Rating",
    emergency: "24/7 Emergency",
    specialties: "Specialties"
  },
  ta: {
    title: "அருகிலுள்ள மருத்துவர்களைக் கண்டறியவும்",
    subtitle: "இலங்கை வடக்கு மாகாணம்",
    noLocation: "அருகிலுள்ள மருத்துவர்களைக் கண்டறிய இடம் அணுகல் தேவை",
    enableLocation: "இடத்தை இயக்கு",
    searching: "மருத்துவர்களைத் தேடுகிறது...",
    callNow: "இப்போது அழைக்கவும்",
    getDirections: "திசைகள் பெறவும்",
    openNow: "இப்போது திறந்துள்ளது",
    closed: "மூடப்பட்டுள்ளது",
    distance: "கிமீ தூரம்",
    rating: "மதிப்பீடு",
    emergency: "24/7 அவசர",
    specialties: "சிறப்புகள்"
  }
};

const VetFinder: React.FC<VetFinderProps> = ({ language, location }) => {
  const [veterinarians, setVeterinarians] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    if (location) {
      findVeterinarians();
    }
  }, [location]);

  const findVeterinarians = async () => {
    setLoading(true);
    
    // Mock veterinarian data for Sri Lanka Northern Province
    const mockVets = [
      {
        id: 1,
        name: "Dr. Kumaran Veterinary Clinic",
        nameTA: "டாக்டர் குமரன் மருத்துவமனை",
        address: "Jaffna Road, Kilinochchi",
        addressTA: "யாழ்ப்பாண சாலை, கிளிநொச்சி",
        phone: "+94 21 228 5678",
        distance: 2.3,
        rating: 4.8,
        isOpen: true,
        isEmergency: true,
        specialties: ["Farm Animals", "Small Animals", "Emergency Care"],
        specialtiesTA: ["பண்ணை விலங்குகள்", "சிறிய விலங்குகள்", "அவசர பராமரிப்பு"]
      },
      {
        id: 2,
        name: "Northern Province Animal Hospital",
        nameTA: "வட மாகாண விலங்கு மருத்துவமனை",
        address: "Hospital Road, Jaffna",
        addressTA: "மருத்துவமனை சாலை, யாழ்ப்பாணம்",
        phone: "+94 21 222 3456",
        distance: 5.7,
        rating: 4.6,
        isOpen: false,
        isEmergency: false,
        specialties: ["Cattle", "Poultry", "Surgery"],
        specialtiesTA: ["மாடு", "கோழி", "அறுவை சிகிச்சை"]
      },
      {
        id: 3,
        name: "Dr. Priya Animal Care Center",
        nameTA: "டாக்டர் பிரியா விலங்கு பராமரிப்பு மையம்",
        address: "Main Street, Vavuniya",
        addressTA: "மெயின் ஸ்ட்ரீட், வவுனியா",
        phone: "+94 24 222 7890",
        distance: 8.2,
        rating: 4.7,
        isOpen: true,
        isEmergency: true,
        specialties: ["Dogs", "Cats", "Vaccination"],
        specialtiesTA: ["நாய்கள்", "பூனைகள்", "தடுப்பூசி"]
      },
      {
        id: 4,
        name: "Mannar Veterinary Services",
        nameTA: "மன்னார் மருத்துவ சேவைகள்",
        address: "Coastal Road, Mannar",
        addressTA: "கடலோர சாலை, மன்னார்",
        phone: "+94 23 225 4567",
        distance: 12.1,
        rating: 4.4,
        isOpen: true,
        isEmergency: false,
        specialties: ["Large Animals", "Reproduction", "Nutrition"],
        specialtiesTA: ["பெரிய விலங்குகள்", "இனப்பெருக்கம்", "ஊட்டச்சத்து"]
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setVeterinarians(mockVets);
    setLoading(false);
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank');
  };

  if (!location) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{t.noLocation}</h2>
          <p className="text-gray-600 mb-4">{t.subtitle}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            {t.enableLocation}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
        <p className="text-gray-600 mb-4">{t.subtitle}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Navigation className="h-4 w-4" />
            <span>Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t.searching}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {veterinarians.map((vet) => (
            <div key={vet.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {language === 'en' ? vet.name : vet.nameTA}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en' ? vet.address : vet.addressTA}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{vet.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{vet.distance} {t.distance}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  vet.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <Clock className="h-3 w-3" />
                  <span>{vet.isOpen ? t.openNow : t.closed}</span>
                </div>
                {vet.isEmergency && (
                  <div className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    <span>{t.emergency}</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">{t.specialties}:</p>
                <div className="flex flex-wrap gap-2">
                  {(language === 'en' ? vet.specialties : vet.specialtiesTA).map((specialty: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleCall(vet.phone)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>{t.callNow}</span>
                </button>
                <button
                  onClick={() => handleDirections(language === 'en' ? vet.address : vet.addressTA)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>{t.getDirections}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VetFinder;