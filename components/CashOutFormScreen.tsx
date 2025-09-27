
import React, { useState } from 'react';
import { Screen } from '../types';

interface CashOutFormScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
  method?: string;
}

const CashOutFormScreen: React.FC<CashOutFormScreenProps> = ({ setScreen, origin, method }) => {
  const [amount, setAmount] = useState('');
  const currentBalance = 0.00;

  const goBack = () => setScreen(Screen.CashOut, { origin });

  const handleSubmit = () => {
    // Navigate to result screen to simulate the process
    setScreen(Screen.CashOutResult, { origin, method, amount });
  };
  
  const amountNumber = parseFloat(amount) || 0;
  const isAmountValid = amountNumber > 0;
  const hasSufficientBalance = currentBalance >= amountNumber;
  const canSubmit = isAmountValid && hasSufficientBalance;

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
      {renderHeader(`السحب عبر ${method}`)}
      <main className="flex-grow p-4 flex flex-col">
        <div className="text-center bg-white p-4 rounded-[5px] shadow-sm mb-4">
          <p className="text-sm text-gray-600">الرصيد المتاح للسحب</p>
          <p className="text-3xl font-bold text-primary">{currentBalance.toFixed(2)} جنيه</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 text-right block mb-2">المبلغ المراد سحبه</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="0.00"
            className={`w-full p-4 text-center text-2xl font-bold bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${!hasSufficientBalance && isAmountValid ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`}
          />
          {!hasSufficientBalance && isAmountValid && 
            <p className="text-red-500 text-sm text-center mt-2">المبلغ المطلوب أكبر من الرصيد المتاح.</p>
          }
        </div>
        
        <div className="mt-auto pt-4">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full mt-6 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
          </button>
        </div>
      </main>
    </div>
  );
};

export default CashOutFormScreen;