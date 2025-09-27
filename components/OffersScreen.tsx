import React from 'react';
import { Screen } from '../types';

interface OffersScreenProps {
  setScreen: (screen: Screen) => void;
}

const OffersScreen: React.FC<OffersScreenProps> = ({ setScreen }) => {

  const goBack = () => {
    setScreen(Screen.Home);
  };

  const handleOfferClick = () => {
    setScreen(Screen.CashIn);
  };

  const renderHeader = (title: string) => (
    <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
      <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 hover:text-primary hover:bg-primary-light transition-colors" aria-label="Back">
        <i className="fas fa-arrow-right text-xl"></i>
      </button>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">{title}</h1>
      </div>
      <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto" />
    </header>
  );

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderHeader('العروض')}
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-3">
          <div 
            onClick={handleOfferClick}
            className="bg-white p-4 rounded-[5px] shadow-sm border-l-4 border-yellow-400 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
            role="button"
            aria-label="عرض 10% كاش باك عند الشحن بفودافون كاش"
          >
            <div className="text-primary text-center w-12 flex-shrink-0">
                <i className="fas fa-gift text-3xl"></i>
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">عرض خاص! 10% كاش باك</h3>
              <p className="text-sm text-gray-600">
                عند شحن حسابك باستخدام فودافون كاش.
              </p>
            </div>
            <div className="flex-shrink-0">
                <i className="fas fa-chevron-left text-gray-400"></i>
            </div>
          </div>
          {/* Future offers can be added here */}
        </div>
      </main>
    </div>
  );
};

export default OffersScreen;
