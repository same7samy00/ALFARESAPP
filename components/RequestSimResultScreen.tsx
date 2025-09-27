
import React from 'react';
import { Screen } from '../types';

interface RequestSimResultScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const RequestSimResultScreen: React.FC<RequestSimResultScreenProps> = ({ setScreen, origin }) => {
  const goBack = () => {
    setScreen(origin || Screen.MerchantServices);
  };

  const goToHome = () => {
    setScreen(Screen.Home);
  };
  
  const backButtonText = origin === Screen.Account ? 'العودة للحساب' : 'العودة لخدمات التاجر';

  const renderHeader = (title: string) => (
     <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
        <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 hover:text-primary hover:bg-primary-light transition-colors" aria-label="Back">
            <i className="fas fa-arrow-right text-xl"></i>
        </button>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">{title}</h1>
        </div>
        <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto"/>
    </header>
  );

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderHeader('نتيجة الطلب')}
      <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-6 rounded-[5px] shadow-lg w-full max-w-sm animate-slide-in-up">
            <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-3">
                   <i className="fas fa-exclamation-triangle text-4xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">تنبيه</h3>
                <p className="text-gray-600 mt-2">حسابك غير مربوط بماكينة الفارس للمدفوعات.</p>
            </div>
            <button onClick={goBack} className="w-full mt-6 py-2.5 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
                {backButtonText}
            </button>
            <button onClick={goToHome} className="w-full mt-3 py-2 px-4 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300">
                العودة للرئيسية
            </button>
        </div>
      </main>
    </div>
  );
};

export default RequestSimResultScreen;
