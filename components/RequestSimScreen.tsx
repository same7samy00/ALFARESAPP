
import React from 'react';
import { Screen } from '../types';

interface RequestSimScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const networks = [
  { name: 'فودافون', logo: 'https://i.postimg.cc/pLJm5Yk3/11.png' },
  { name: 'أورانج', logo: 'https://i.postimg.cc/25jVQbKy/12.png' },
  { name: 'إتصالات', logo: 'https://i.postimg.cc/d1L3XMvK/13.png' },
  { name: 'وي', logo: 'https://i.postimg.cc/26MyNH8L/14.png' },
];

const RequestSimScreen: React.FC<RequestSimScreenProps> = ({ setScreen, origin }) => {

  const goBack = () => {
    setScreen(origin || Screen.MerchantServices);
  };

  const handleNetworkSelect = (networkName: string) => {
    // Navigates to the result screen after selection.
    setScreen(Screen.RequestSimResult, { origin });
  };

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
        {renderHeader('طلب شريحة')}
        <main className="flex-grow p-4">
            <p className="text-center text-gray-600 mb-6">اختر شركة الاتصالات</p>
            <div className="flex flex-col gap-3">
                {networks.map(network => (
                    <div key={network.name} onClick={() => handleNetworkSelect(network.name)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <img src={network.logo} alt={network.name} className="h-10 w-10 object-contain" />
                            <p className="font-semibold text-gray-700 text-md">{network.name}</p>
                        </div>
                        <i className="fas fa-chevron-left text-gray-400"></i>
                    </div>
                ))}
            </div>
        </main>
    </div>
  );
};

export default RequestSimScreen;
