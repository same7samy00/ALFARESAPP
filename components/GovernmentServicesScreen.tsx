
import React from 'react';
import { Screen } from '../types';
import { governmentServicesData } from './governmentServices';

interface GovernmentServicesScreenProps {
  setScreen: (screen: Screen) => void;
}

const GovernmentServicesScreen: React.FC<GovernmentServicesScreenProps> = ({ setScreen }) => {
    const goBack = () => {
        setScreen(Screen.Home);
    };

    const renderHeader = (title: string) => (
        <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
           <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 hover:text-primary hover:bg-primary-light transition-colors" aria-label="Back">
               <i className="fas fa-arrow-right text-xl"></i>
           </button>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/6">
               <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap text-center truncate">{title}</h1>
           </div>
           <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto"/>
       </header>
    );
    
    const ActivationNotice = () => (
      <div className="bg-yellow-100 border-b-2 border-yellow-200 text-yellow-800 text-sm font-semibold p-3 w-full shrink-0 flex items-center justify-center gap-4">
          <i className="fas fa-exclamation-triangle"></i>
          <span>الحساب غير مفعل لهذه الخدمة</span>
          <a href="https://wa.me/201013803653" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors" aria-label="Contact support on WhatsApp">
              <i className="fab fa-whatsapp text-2xl"></i>
          </a>
      </div>
    );

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {renderHeader('خدمات حكومية')}
            <ActivationNotice />
            <main className="flex-grow p-4 overflow-y-auto">
                <p className="text-center text-gray-600 mb-6">الخدمات المتاحة</p>
                 <div className="flex flex-col gap-3">
                    {governmentServicesData.map(item => (
                        <div key={item.name} className="bg-gray-50 p-4 rounded-[5px] border flex justify-between items-center opacity-70 cursor-not-allowed">
                            <p className="font-semibold text-gray-500 text-md">{item.name}</p>
                            <i className="fas fa-lock text-gray-400"></i>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default GovernmentServicesScreen;