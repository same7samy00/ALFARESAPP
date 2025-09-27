
import React from 'react';
import { Screen } from '../types';
import { merchantServicesData } from './merchantServices';

interface MerchantServicesScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
}

const MerchantServicesScreen: React.FC<MerchantServicesScreenProps> = ({ setScreen }) => {
    const goBack = () => {
        setScreen(Screen.Home);
    };

    const handleServiceClick = (serviceName: string) => {
        const originProps = { origin: Screen.MerchantServices };
        switch (serviceName) {
            case 'طلب شريحة':
                setScreen(Screen.RequestSim, originProps);
                break;
            case 'طلب ماكينة':
                setScreen(Screen.RequestMachine, originProps);
                break;
            case 'الدعم الفني':
                window.open('https://wa.me/201013803653', '_blank');
                break;
            case 'طلب خدمة':
                setScreen(Screen.RequestService, originProps);
                break;
            case 'خدمة سلفني':
                setScreen(Screen.LendMeService, originProps);
                break;
            default:
                // Fallback for any other service if needed
                setScreen(Screen.RequestSimResult, originProps);
                break;
        }
    };

    const renderHeader = (title: string) => (
        <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
           <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 hover:text-primary hover:bg-primary-light transition-colors" aria-label="Back">
               <i className="fas fa-arrow-right text-xl"></i>
           </button>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/6">
               <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap text-center truncate">{title}</h1>
           </div>
           <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto"/>
       </header>
    );

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {renderHeader('خدمات التاجر')}
            <main className="flex-grow p-4 overflow-y-auto">
                <p className="text-center text-gray-600 mb-6">الخدمات المتاحة للتاجر</p>
                 <div className="flex flex-col gap-4">
                    {merchantServicesData.map(item => (
                        <div 
                            key={item.name} 
                            onClick={() => handleServiceClick(item.name)}
                            className="bg-white p-4 rounded-[5px] border flex items-center gap-4 hover:bg-primary-light hover:border-primary transition-all duration-200 cursor-pointer shadow-sm"
                        >
                            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-primary-light rounded-[5px] text-primary">
                                <i className={`${item.icon} text-2xl`}></i>
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <i className="fas fa-chevron-left text-gray-400"></i>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default MerchantServicesScreen;
