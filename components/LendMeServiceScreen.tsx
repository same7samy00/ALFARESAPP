
import React from 'react';
import { Screen } from '../types';

interface LendMeServiceScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const LendMeServiceScreen: React.FC<LendMeServiceScreenProps> = ({ setScreen, origin }) => {

  const goBack = () => setScreen(origin || Screen.MerchantServices);
  const handleRequest = () => setScreen(Screen.LendMeServiceResult, { origin });

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

  const features = [
      { icon: 'fas fa-wallet', text: 'تسلف حتى 5000 جنيه شهرياً.' },
      { icon: 'fas fa-percent', text: 'الخدمة بدون أي فوائد إضافية.' },
      { icon: 'fas fa-user-clock', text: 'متاحة للحسابات التي بلغت حد شحن الحساب 3000 ج فما اكثر.' },
      { icon: 'fas fa-chart-line', text: 'تعتمد على حجم معاملاتك الشهرية.' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderHeader('خدمة سلفني')}
      <main className="flex-grow overflow-y-auto p-4">
        <div className="bg-white p-6 rounded-[5px] shadow-sm text-center">
            <i className="fas fa-money-bill-wave text-primary text-5xl mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800">تفاصيل خدمة سلفني</h2>
            <p className="text-gray-600 mt-2">احصل على سيولة مالية فورية لتسهيل معاملاتك اليومية.</p>
        </div>

        <div className="bg-white p-4 rounded-[5px] shadow-sm mt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-3 text-right">مميزات وشروط الخدمة</h3>
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <i className={`${feature.icon} text-green-500 text-md mt-1 w-5 text-center`}></i>
                        <p className="text-sm text-gray-700">{feature.text}</p>
                    </li>
                ))}
            </ul>
        </div>
      </main>
      <footer className="p-4 bg-white border-t sticky bottom-0 shrink-0">
          <button 
            onClick={handleRequest} 
            className="w-full py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300"
          >
              طلب سلفة
          </button>
      </footer>
    </div>
  );
};

export default LendMeServiceScreen;
