
import React, { useState } from 'react';
import { Screen } from '../types';

interface RequestServiceScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const RequestServiceScreen: React.FC<RequestServiceScreenProps> = ({ setScreen, origin }) => {
  const [serviceName, setServiceName] = useState('');
  const [serviceDetails, setServiceDetails] = useState('');

  const goBack = () => setScreen(origin || Screen.MerchantServices);

  const handleSubmit = () => {
    // This will navigate to the failure screen as requested
    setScreen(Screen.RequestServiceResult);
  };

  const isFormComplete = serviceName.trim() !== '' && serviceDetails.trim() !== '';

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
      {renderHeader('طلب خدمة')}
      <main className="flex-grow overflow-y-auto p-4 space-y-4">
        <p className="text-center text-gray-600">أدخل تفاصيل الخدمة التي ترغب في إضافتها.</p>
        
        <div className="bg-white p-4 rounded-[5px] shadow-sm space-y-4">
            <div>
                <label htmlFor="serviceName" className="text-sm font-medium text-gray-700 text-right block mb-2">اسم الخدمة</label>
                <input 
                  id="serviceName" 
                  type="text" 
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="مثال: شحن كارت لعبة..."
                  className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div>
                <label htmlFor="serviceDetails" className="text-sm font-medium text-gray-700 text-right block mb-2">تفاصيل الخدمة</label>
                <textarea 
                  id="serviceDetails" 
                  value={serviceDetails} 
                  onChange={(e) => setServiceDetails(e.target.value)}
                  placeholder="يرجى توضيح تفاصيل الخدمة وكيفية عملها..."
                  rows={4} 
                  className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
            </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-primary text-primary-dark p-4 rounded-[5px]">
            <div className="flex items-center gap-3">
                <i className="fas fa-info-circle text-primary text-xl"></i>
                <p className="text-sm font-bold text-gray-700">
                    رسوم إضافة الخدمة 3 جنيهات.
                </p>
            </div>
        </div>
      </main>
      <footer className="p-4 bg-white border-t sticky bottom-0 shrink-0">
          <button 
            onClick={handleSubmit} 
            disabled={!isFormComplete}
            className="w-full py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              إرسال الطلب
          </button>
      </footer>
    </div>
  );
};

export default RequestServiceScreen;
