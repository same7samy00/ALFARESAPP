
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface HistoryScreenProps {
  setScreen: (screen: Screen) => void;
}

interface Transaction {
  success: boolean;
  service: string;
  provider?: string;
  amountPaid: string | number;
  date: string;
  refNumber: string;
  reason?: string;
  phone?: string;
  package?: string;
  quantity?: number;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ setScreen }) => {
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('transactionHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const goBack = () => {
    setScreen(Screen.Home);
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
      {renderHeader('سجل العمليات')}
      <main className="flex-grow p-4 overflow-y-auto">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <i className="fas fa-history text-5xl mb-4"></i>
            <h3 className="text-lg font-bold">لا يوجد عمليات بعد</h3>
            <p>سيتم عرض العمليات الناجحة والفاشلة هنا.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, index) => (
              <div key={item.refNumber + index} className="bg-white p-4 rounded-[5px] shadow-sm border-l-4" style={{ borderColor: item.success ? '#10B981' : '#EF4444' }}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-800">{item.service} {item.provider ? `- ${item.provider}` : ''}</h3>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${item.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.success ? 'ناجحة' : 'فاشلة'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>المبلغ:</span>
                    <strong className="tracking-wider">{Number(item.amountPaid).toFixed(2)} جنيه</strong>
                  </div>
                  {(item.phone || item.package || item.quantity) && (
                    <div className="flex justify-between">
                       <span>التفاصيل:</span>
                       <strong>{item.phone || item.package || `كمية: ${item.quantity}`}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>التاريخ:</span>
                    <strong>{item.date}</strong>
                  </div>
                   {!item.success && item.reason && (
                    <div className="flex justify-between text-red-600">
                        <span>السبب:</span>
                        <strong>{item.reason}</strong>
                    </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HistoryScreen;