
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface UserData {
    name: string;
    phone: string;
    accountCode: string;
    creationDate: string;
}

interface AccountScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ setScreen }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    // Placeholder data for skeleton loading
    const placeholderData: UserData = {
        name: '******************',
        phone: '***********',
        accountCode: '******',
        creationDate: '*********',
    };

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
        // If no data is found, the component will render with placeholderData
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setScreen(Screen.Welcome);
    };

    const goBack = () => setScreen(Screen.Home);

    const balances = [
        { label: 'رصيد الحساب', value: '0.00' },
        { label: 'رصيد مرتجع', value: '0.00' },
        { label: 'خدمة سلفني', value: '0.00' },
        { label: 'رصيد معلق', value: '0.00' },
        { label: 'عملية معلقة', value: '0' },
        { label: 'عملية مرتجعة', value: '0' },
    ];
    
    const actionButtons: { label: string; icon: string; screen?: Screen; action?: () => void; }[] = [
        { label: 'شحن الكاش', icon: 'fa-plus-circle', screen: Screen.CashIn },
        { label: 'سحب الكاش', icon: 'fa-minus-circle', screen: Screen.CashOut },
        { label: 'خدمة سلفني', icon: 'fa-money-bill-wave', screen: Screen.LendMeService },
        { label: 'إضافة خدمة', icon: 'fa-puzzle-piece', screen: Screen.RequestService },
        { label: 'طلب ماكينة', icon: 'fa-cash-register', screen: Screen.RequestMachine },
        { label: 'طلب شريحة', icon: 'fa-sim-card', screen: Screen.RequestSim },
        { label: 'الدعم الفني', icon: 'fa-headset', action: () => window.open('https://wa.me/201013803653', '_blank') },
    ];
    
    const handleActionClick = (btn: { screen?: Screen; action?: () => void; }) => {
        if (btn.screen) {
            setScreen(btn.screen, { origin: Screen.Account });
        } else if (btn.action) {
            btn.action();
        }
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

    const displayData = userData || placeholderData;

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {renderHeader('الحساب الشخصي')}
            <main className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* User Info Card */}
                <div className="bg-gradient-to-br from-primary to-[#0053c7] text-white p-4 rounded-[5px] shadow-lg">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">{displayData.name}</h2>
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">حساب غير مفعل</span>
                    </div>
                    <div className="mt-3 space-y-1 text-sm opacity-90">
                        <p><i className="fas fa-hashtag fa-fw ml-2"></i>كود الحساب: <span className="font-mono tracking-wider">{displayData.accountCode}</span></p>
                        <p><i className="fas fa-phone fa-fw ml-2"></i>رقم الهاتف: <span className="font-mono tracking-wider">{displayData.phone}</span></p>
                        <p><i className="fas fa-calendar-alt fa-fw ml-2"></i>تاريخ الإنشاء: {displayData.creationDate}</p>
                    </div>
                </div>
                
                {/* Balances Table */}
                <div className="bg-white p-4 rounded-[5px] shadow-sm">
                    <h3 className="font-bold text-gray-700 mb-3 text-right">الأرصدة والعمليات</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {balances.map(item => (
                            <div key={item.label} className="flex justify-between items-center border-b pb-2">
                                <span className="text-sm text-gray-600">{item.label}</span>
                                <span className="font-bold text-gray-800">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Help & Support Section */}
                <div className="bg-white p-4 rounded-[5px] shadow-sm">
                    <h3 className="font-bold text-gray-700 mb-3 text-right">الدعم والمساعدة</h3>
                    <button 
                        onClick={() => setScreen(Screen.FAQ, { origin: Screen.Account })}
                        className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-[5px] hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <i className="fas fa-question-circle text-primary text-xl"></i>
                            <span className="font-semibold text-gray-700">الأسئلة الشائعة</span>
                        </div>
                        <i className="fas fa-chevron-left text-gray-400"></i>
                    </button>
                </div>
                
                {/* Action Buttons */}
                 <div className="bg-white p-4 rounded-[5px] shadow-sm">
                    <h3 className="font-bold text-gray-700 mb-3 text-right">إجراءات سريعة</h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                        {actionButtons.map(btn => (
                            <button 
                                key={btn.label}
                                onClick={() => handleActionClick(btn)}
                                disabled={!btn.screen && !btn.action}
                                className="bg-gray-50 rounded-[5px] p-3 shadow-sm flex flex-col items-center justify-center gap-2 transform transition-transform duration-200 hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <i className={`fas ${btn.icon} text-primary text-2xl`}></i>
                                <p className="text-xs font-semibold text-gray-700">{btn.label}</p>
                            </button>
                        ))}
                         <button 
                            onClick={handleLogout}
                            className="bg-red-50 rounded-[5px] p-3 shadow-sm flex flex-col items-center justify-center gap-2 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                         >
                            <i className="fas fa-sign-out-alt text-red-500 text-2xl"></i>
                            <p className="text-xs font-semibold text-red-700">تسجيل الخروج</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AccountScreen;
