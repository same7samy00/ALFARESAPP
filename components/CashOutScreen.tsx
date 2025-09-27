
import React from 'react';
import { Screen } from '../types';

interface CashOutScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const methods = [
  { name: 'ماكينات الصراف الآلي (بنك مصر)', icon: 'fas fa-university' },
  { name: 'فودافون كاش', icon: 'fas fa-wallet' }
];

const CashOutScreen: React.FC<CashOutScreenProps> = ({ setScreen, origin }) => {
  const goBack = () => setScreen(origin || Screen.Home);

  const handleMethodSelect = (methodName: string) => {
    setScreen(Screen.CashOutForm, { origin, method: methodName });
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
      {renderHeader('سحب الكاش')}
      <main className="flex-grow p-4 overflow-y-auto space-y-4">
        <p className="text-center text-gray-600">اختر طريقة السحب</p>
        
        <div className="flex flex-col gap-3">
          {methods.map(method => (
            <div key={method.name} onClick={() => handleMethodSelect(method.name)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-[5px] text-primary">
                    <i className={`${method.icon} text-xl`}></i>
                </div>
                <p className="font-semibold text-gray-700 text-md">{method.name}</p>
              </div>
              <i className="fas fa-chevron-left text-gray-400"></i>
            </div>
          ))}
        </div>
        
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-[5px] mt-6">
          <div className="flex items-center gap-3">
            <i className="fas fa-check-circle"></i>
            <p className="font-semibold text-sm">السحب بدون أي رسوم.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CashOutScreen;