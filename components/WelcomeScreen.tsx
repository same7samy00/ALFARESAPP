
import React from 'react';
import { Screen } from '../types';

interface WelcomeScreenProps {
  setScreen: (screen: Screen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setScreen }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-white">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">مرحباً بك!</h1>
      <div className="w-full max-w-xs mt-6 space-y-4">
        <button
          onClick={() => setScreen(Screen.Register)}
          className="w-full px-4 py-2.5 font-bold text-white bg-primary rounded-[5px] shadow-lg hover:scale-105 transform transition-transform duration-300"
        >
          إنشاء حساب
        </button>
        <button
          onClick={() => setScreen(Screen.Login)}
          className="w-full px-4 py-2.5 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;