
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface CashOutResultScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
  method?: string;
  amount?: string;
}

const CashOutResultScreen: React.FC<CashOutResultScreenProps> = ({ setScreen, origin, method, amount }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Create failed transaction record
      const result = {
        success: false,
        reason: 'لا يوجد رصيد كافي لإتمام العملية.',
        service: 'سحب كاش',
        provider: method,
        amountPaid: amount || "0.00",
        date: new Date().toLocaleString('ar-EG'),
        refNumber: `ALFARES-COUT${Date.now()}`
      };

      // Save to history
      try {
        const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
        history.unshift(result);
        localStorage.setItem('transactionHistory', JSON.stringify(history.slice(0, 50)));
      } catch (e) {
        console.error('Could not save transaction to history', e);
      }
      
      setIsLoading(false);
    }, 2000); // Simulate API call

    return () => clearTimeout(timer);
  }, [method, amount]);

  const handleNewOperation = () => {
    setScreen(Screen.CashOut, { origin });
  };
  
  const goToHome = () => {
    setScreen(Screen.Home);
  };

  const renderHeader = (title: string) => (
    <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
      <button disabled className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 opacity-50 cursor-not-allowed" aria-label="Back">
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
      {renderHeader('نتيجة العملية')}
      <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-semibold">جاري معالجة طلبك...</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-[5px] shadow-lg w-full max-w-sm animate-slide-in-up">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                <i className="fas fa-times-circle text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800">فشلت العملية</h3>
              <p className="text-gray-600 mt-2">لا يوجد رصيد كافي لإتمام العملية.</p>
            </div>
            <div className="space-y-2 text-sm text-gray-600 text-right">
              <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">سحب كاش - {method}</strong></div>
              <div className="flex justify-between border-b pb-2"><span>المبلغ</span><strong className="text-red-600 line-through">{parseFloat(amount || '0').toFixed(2)} جنيه</strong></div>
            </div>
            <button onClick={handleNewOperation} className="w-full mt-6 py-2.5 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
              عملية جديدة
            </button>
            <button onClick={goToHome} className="w-full mt-3 py-2 px-4 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300">
              العودة للرئيسية
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CashOutResultScreen;