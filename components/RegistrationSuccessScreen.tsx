
import React, { useEffect } from 'react';
import { Screen } from '../types';

interface RegistrationSuccessScreenProps {
  setScreen: (screen: Screen) => void;
}

const AnimatedCheckIcon = () => (
    <div className="w-24 h-24">
        <svg className="w-full h-full" viewBox="0 0 52 52">
            <circle 
                className="checkmark__circle" 
                cx="26" 
                cy="26" 
                r="25" 
                fill="none" 
            />
            <path 
                className="checkmark__check" 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8" 
            />
        </svg>
        <style>{`
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 3;
                stroke-miterlimit: 10;
                stroke: #4CAF50;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }

            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                stroke-width: 4;
                stroke: #4CAF50;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }

            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
        `}</style>
    </div>
);

const RegistrationSuccessScreen: React.FC<RegistrationSuccessScreenProps> = ({ setScreen }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen(Screen.Login);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow p-6 text-center h-full bg-white">
      <AnimatedCheckIcon />
      <p className="text-xl text-gray-600 mt-6 mb-2">تم إنشاء حسابك بنجاح.</p>
      <p className="text-sm text-gray-400">جاري توجيهك لتسجيل الدخول...</p>
    </div>
  );
};

export default RegistrationSuccessScreen;
