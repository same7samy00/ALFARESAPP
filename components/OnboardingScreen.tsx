import React, { useState } from 'react';
import { Screen } from '../types';

interface OnboardingScreenProps {
  setScreen: (screen: Screen) => void;
}

const onboardingData = {
  images: [
    'https://i.ibb.co/SwmW5GNR/23bdd8d5-1e63-4ef5-911c-9b1732be1cb6.png',
    'https://i.ibb.co/N67M7mNr/d7423bcc-53e8-4d93-a6bf-d8f877ad028f.png',
    'https://i.ibb.co/RGghYrcS/Generated-Image-September-19-2025-1-30-AM.png',
  ],
  address: 'شارع الجامعة – مصر الجديدة',
  license: '2457/2023',
  commercialRegister: '103829',
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ setScreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % onboardingData.images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + onboardingData.images.length) % onboardingData.images.length);
  };
  
  const handleContinue = () => {
      localStorage.setItem('hasOnboarded', 'true');
      setScreen(Screen.Welcome);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Image Slider */}
      <div className="relative h-[40%] w-full flex-shrink-0 bg-black">
        <div className="absolute inset-0 overflow-hidden">
          {onboardingData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`مقر الشركة ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
           <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity z-10">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-opacity z-10">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-grow p-6 flex flex-col items-center text-center">
        <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="الفارس للمدفوعات" className="h-20 w-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً في الفارس للمدفوعات</h1>
        <p className="text-gray-600 mb-6">شريكك الموثوق لجميع خدمات الدفع الإلكتروني في مصر.</p>
        
        <div className="w-full max-w-sm bg-gray-50 p-4 rounded-[5px] border border-gray-200 space-y-3">
            <div className="flex items-start gap-3 text-right w-full">
                <i className="fas fa-map-marker-alt text-primary mt-1"></i>
                <div className="flex-grow">
                    <h3 className="font-bold text-gray-700">مقر الشركة</h3>
                    <p className="text-sm text-gray-600">{onboardingData.address}</p>
                </div>
            </div>
            <div className="flex items-start gap-3 text-right w-full">
                <i className="fas fa-certificate text-primary mt-1"></i>
                <div className="flex-grow">
                    <h3 className="font-bold text-gray-700">رقم الترخيص</h3>
                    <p className="text-sm text-gray-600">{onboardingData.license}</p>
                </div>
            </div>
            <div className="flex items-start gap-3 text-right w-full">
                <i className="fas fa-file-alt text-primary mt-1"></i>
                <div className="flex-grow">
                    <h3 className="font-bold text-gray-700">السجل التجاري</h3>
                    <p className="text-sm text-gray-600">{onboardingData.commercialRegister}</p>
                </div>
            </div>
        </div>
        
        <div className="mt-auto w-full max-w-sm pt-4">
            <button
              onClick={handleContinue}
              className="w-full px-4 py-3 font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] rounded-[5px] shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              ابدأ الآن
            </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;