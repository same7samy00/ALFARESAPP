
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface HomeScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
}

const services = [
  { name: 'شحن الموبايل', icon: 'fas fa-mobile-alt', screen: Screen.MobileRecharge },
  { name: 'الشحن الذكي', icon: 'fas fa-lightbulb', screen: Screen.SmartRecharge },
  { name: 'الانترنت والارضي', icon: 'fas fa-wifi', screen: Screen.InternetLandline },
  { name: 'خدمات المحافظ', icon: 'fas fa-wallet', screen: Screen.EWallet },
  { name: 'رسوم التعليم', icon: 'fas fa-user-graduate', screen: Screen.EducationFees },
  { name: 'المرافق العامة', icon: 'fas fa-tint', screen: Screen.PublicUtilities },
  { name: 'خدمات التأمين', icon: 'fas fa-shield-alt', screen: Screen.InsuranceServices },
  { name: 'معاملات مالية', icon: 'fas fa-coins', screen: Screen.FinancialTransactions },
  { name: 'نقل وسياحة', icon: 'fas fa-bus', screen: Screen.TransportationTourism },
  { name: 'خدمات الاون لاين', icon: 'fas fa-globe', screen: Screen.OnlineServices },
  { name: 'اشتراكات وتبرعات', icon: 'fas fa-heart', screen: Screen.SubscriptionsDonations },
  { name: 'أقساط وقروض', icon: 'fas fa-hand-holding-usd', screen: Screen.InstallmentsLoans },
  { name: 'خدمات حكومية', icon: 'fas fa-university', screen: Screen.GovernmentServices },
  { name: 'خدمات متنوعة', icon: 'fas fa-shapes', screen: Screen.MiscellaneousServices },
  { name: 'خدمات التاجر', icon: 'fas fa-store', screen: Screen.MerchantServices },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ setScreen }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const updateUnreadCount = () => {
        try {
            const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
            const count = notifications.filter((n: any) => !n.isRead).length;
            setUnreadCount(count);
        } catch (e) {
            setUnreadCount(0);
        }
    };

    useEffect(() => {
        updateUnreadCount();
        
        const handleStorageChange = () => {
            updateUnreadCount();
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1000); // Simulate a 1-second refresh
    };

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(prev => !prev);
    };

    const handleServiceClick = (service: typeof services[0]) => {
        if (service.screen) {
            setScreen(service.screen);
        } else {
            alert(`خدمة "${service.name}" غير متاحة بعد.`);
        }
    };

  return (
    <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20 relative">
            <button onClick={() => setScreen(Screen.Account)} className="w-10 h-10 flex items-center justify-center bg-primary rounded-[5px] text-white hover:bg-[#0053c7] transition-colors" aria-label="Account">
                <i className="fas fa-user text-xl"></i>
            </button>
            
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto" />
            </div>
            
            <button onClick={() => setScreen(Screen.Notifications)} className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-[5px] text-white hover:bg-[#0053c7] transition-colors" aria-label="Notifications">
                <i className="fas fa-bell text-xl"></i>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{unreadCount}</span>
                )}
            </button>
        </header>

        <main className="flex-grow overflow-y-auto p-4">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-primary to-[#0053c7] rounded-[5px] p-6 text-white shadow-lg mb-6">
                <div className="mb-4">
                    <p className="text-sm opacity-80">رصيد الكاش</p>
                    <div className="flex items-center">
                        <p className="text-3xl font-bold tracking-wider">{isBalanceVisible ? '0.00' : '******'}</p>
                        <span className="text-lg font-semibold ml-2 mr-2">جنية</span>
                        <button onClick={toggleBalanceVisibility} className="text-white mx-2" aria-label="Toggle balance visibility">
                            <i className={`fas ${isBalanceVisible ? 'fa-eye' : 'fa-eye-slash'} text-lg`}></i>
                        </button>
                         <button onClick={handleRefresh} className="text-white" aria-label="Refresh balance">
                            <i className={`fas fa-sync-alt text-lg ${isRefreshing ? 'animate-spin' : ''}`}></i>
                        </button>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setScreen(Screen.CashIn)} className="w-1/2 bg-white text-primary font-bold py-2.5 px-4 rounded-[5px] shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <i className="fas fa-plus-circle"></i>
                        <span>شحن الكاش</span>
                    </button>
                    <button onClick={() => setScreen(Screen.CashOut)} className="w-1/2 bg-white text-primary font-bold py-2.5 px-4 rounded-[5px] shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        <i className="fas fa-minus-circle"></i>
                        <span>سحب الكاش</span>
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            <h2 className="text-right text-gray-500 font-bold mb-3 pr-1">الخدمات الأساسية</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
                {services.map((service, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleServiceClick(service)}
                        className="bg-white rounded-[5px] p-2 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[96px] transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                        aria-label={service.name}
                        role="button"
                    >
                        <i className={`${service.icon} text-primary text-2xl`}></i>
                        <p className="text-xs font-semibold text-gray-700 leading-tight w-full truncate">{service.name}</p>
                    </div>
                ))}
            </div>
        </main>
    </div>
  );
};

export default HomeScreen;