
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface RequestMachineFormScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const MACHINE_PRICE = 4599;
const DEPOSIT_AMOUNT = 500;

const RequestMachineFormScreen: React.FC<RequestMachineFormScreenProps> = ({ setScreen, origin }) => {
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [address, setAddress] = useState('');
  // Mock balance for demonstration. In a real app, this would come from a global state/API.
  const [userBalance] = useState(0); 
  
  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.name) {
        setName(userData.name);
      }
      if (userData.nationalId) {
        setNationalId(userData.nationalId);
      }
    }
  }, []);

  const goBack = () => setScreen(Screen.RequestMachine, { origin });
  const handleSubmit = () => {
      // Logic to deduct from balance would go here
      setScreen(Screen.RequestSimResult, { origin }); 
  };
  
  const isFormComplete = name.trim() !== '' && nationalId.trim().length === 14 && address.trim() !== '';
  const hasSufficientBalance = userBalance >= DEPOSIT_AMOUNT;
  const canSubmit = isFormComplete && hasSufficientBalance;

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
      {renderHeader('نموذج طلب الماكينة')}
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        <p className="text-center text-gray-600">أكمل بياناتك لتأكيد الطلب.</p>
        
        {/* Form Fields */}
        <div className="bg-white p-4 rounded-[5px] shadow-sm space-y-4">
            <div>
                <label htmlFor="name" className="text-sm font-medium text-gray-700 text-right block mb-2">الاسم بالكامل</label>
                <input id="name" type="text" value={name} readOnly className="w-full px-4 py-2.5 text-right bg-gray-200 border-2 border-transparent rounded-[5px] cursor-not-allowed text-gray-500"/>
            </div>
            <div>
                <label htmlFor="nationalId" className="text-sm font-medium text-gray-700 text-right block mb-2">الرقم القومي (14 رقم)</label>
                <input id="nationalId" type="text" inputMode="numeric" maxLength={14} value={nationalId} readOnly className="w-full px-4 py-2.5 text-right bg-gray-200 border-2 border-transparent rounded-[5px] cursor-not-allowed text-gray-500 tracking-widest"/>
            </div>
            <div>
                <label htmlFor="address" className="text-sm font-medium text-gray-700 text-right block mb-2">العنوان + علامة مميزة</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
            </div>
        </div>
        
         <div className="bg-blue-50 border-l-4 border-primary text-primary-dark p-4 rounded-[5px]">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <i className="fas fa-info-circle text-primary"></i>
                </div>
                <div className="mr-3">
                    <p className="text-sm font-bold text-gray-700">
                        سيتم التواصل معك لتأكيد الطلب وتحديد موعد الاستلام.
                    </p>
                </div>
            </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-4 rounded-[5px] shadow-sm space-y-2">
            <div className="flex justify-between text-md">
                <span className="text-gray-600">رصيدك الحالي:</span>
                <span className={`font-bold ${hasSufficientBalance ? 'text-green-600' : 'text-red-600'}`}>{userBalance.toFixed(2)} جنيه</span>
            </div>
            <div className="flex justify-between text-md border-t pt-2 mt-2">
                <span className="text-gray-600">سعر الماكينة:</span>
                <span className="font-bold text-gray-800">{MACHINE_PRICE.toFixed(2)} جنيه</span>
            </div>
            <div className="flex justify-between text-md">
                <span className="text-gray-600">المقدم (يُخصم من الرصيد):</span>
                <span className="font-bold text-gray-800">- {DEPOSIT_AMOUNT.toFixed(2)} جنيه</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span className="text-primary">المبلغ المتبقي عند الاستلام:</span>
                <span className="text-primary">{(MACHINE_PRICE - DEPOSIT_AMOUNT).toFixed(2)} جنيه</span>
            </div>
        </div>

        <p className="text-center text-xs text-gray-500">
            يمكنك استلام الماكينة من مقرنا الرئيسي: شارع الجامعة – مصر الجديدة.
        </p>

      </main>
      <footer className="p-4 bg-white border-t sticky bottom-0 shrink-0 space-y-2">
          {!hasSufficientBalance && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-[5px] text-center text-sm" role="alert">
                  <strong className="font-bold">رصيدك غير كافي!</strong>
                  <span className="block sm:inline"> يلزم وجود {DEPOSIT_AMOUNT} جنيه على الأقل لطلب الماكينة.</span>
              </div>
          )}
          <button 
            onClick={handleSubmit} 
            disabled={!canSubmit}
            className="w-full py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              تأكيد الطلب
          </button>
      </footer>
    </div>
  );
};

export default RequestMachineFormScreen;
