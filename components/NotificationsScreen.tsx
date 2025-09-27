import React, { useState, useEffect } from 'react';
import { Screen } from '../types';

interface NotificationsScreenProps {
  setScreen: (screen: Screen) => void;
}

interface Notification {
    id: string;
    type: 'cash_in' | 'static';
    title: string;
    message: string;
    status: 'processing' | 'failed' | 'success' | 'info';
    timestamp: number;
    isRead: boolean;
}

const staticNotifications: Notification[] = [
    { 
        id: 'static-2', 
        type: 'static', 
        title: '📢 تنويه رسمي', 
        message: 'رقم التواصل الوحيد والرسمي لتطبيق الفارس هو: 01013803653. ولن أكون مسئولًا عن أي تعامل يتم من خلال أي رقم آخر خلاف ذلك.\n\n⚠️ برجاء العلم أن الرقم يعمل عبر واتساب فقط في الوقت الحالي، وذلك لحين الانتهاء من إنشاء الخط الساخن الرسمي.\n\nمع خالص التحية،\nالمهندس فارس عبدالرحمن', 
        status: 'info', 
        timestamp: Date.now() - 100000, // older timestamp to appear after the newer one
        isRead: true 
    },
    { 
        id: 'static-1', 
        type: 'static', 
        title: '📢 تنويه رسمي', 
        message: 'خدمة الفارس مرخصة وتعمل تحت إشراف ورقابة البنك المركزي المصري، وفقًا للتشريعات المنظمة لعمليات الدفع الإلكتروني في مصر.\n\n🔹 رقم الترخيص: 2457/2023\n🔹 رقم السجل التجاري: 103829\n\nنلتزم بتقديم خدمات دفع إلكتروني آمنة وموثوقة للتجار والعملاء الكرام.\n\nمع خالص التحية،\nالمهندس فارس عبدالرحمن', 
        status: 'info', 
        timestamp: Date.now() - 200000, // oldest timestamp
        isRead: true 
    },
     { 
        id: 'static-3', 
        type: 'static', 
        title: 'الحساب غير مفعل', 
        message: 'لتفعيل حسابك، يرجى التواصل مع خدمة العملاء بصورة من بطاقة الرقم القومي (وجه وظهر).\n\n**لماذا يُشترط وجود رصيد 200 جنيه للتفعيل؟**\nيُطلب هذا الرصيد المبدئي لإثبات جديتك في استخدام التطبيق، تغطية التكاليف الإدارية، وضمان أن حسابك جاهز للاستخدام الفوري.\n\n**نؤكد أن هذا الرصيد يظل ملكًا لك بالكامل** ويمكنك استخدامه في أي عملية داخل التطبيق بعد التفعيل.', 
        status: 'failed', 
        timestamp: Date.now(), // newest static timestamp
        isRead: true 
    },
];

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ setScreen }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const goBack = () => {
    setScreen(Screen.Home);
  };

  const handleToggle = (id: string) => {
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  useEffect(() => {
    const FIVE_MINUTES = 5 * 60 * 1000;

    const updateNotifications = () => {
        try {
            const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
            let needsUpdate = false;
            
            const updatedFromStorage = stored.map((n: Notification) => {
                if (n.type === 'cash_in' && n.status === 'processing' && (Date.now() - n.timestamp > FIVE_MINUTES)) {
                    needsUpdate = true;
                    return {
                        ...n,
                        status: 'failed',
                        message: `فشل طلب شحن الرصيد. برجاء مراجعة خدمة العملاء.`
                    };
                }
                return n;
            });

            if (needsUpdate) {
                localStorage.setItem('notifications', JSON.stringify(updatedFromStorage));
            }

            const allNotifications = [...updatedFromStorage, ...staticNotifications].sort((a,b) => b.timestamp - a.timestamp);
            setNotifications(allNotifications);
        } catch (e) {
            console.error("Failed to process notifications:", e);
            setNotifications(staticNotifications);
        }
    };
    
    // Mark as read on mount
    try {
        const stored = JSON.parse(localStorage.getItem('notifications') || '[]');
        if (stored.some((n: Notification) => !n.isRead)) {
            const markedAsRead = stored.map((n: Notification) => ({...n, isRead: true }));
            localStorage.setItem('notifications', JSON.stringify(markedAsRead));
            window.dispatchEvent(new Event('storage')); // Notify home screen
        }
    } catch(e) {
        console.error("Failed to mark notifications as read:", e);
    }
    
    updateNotifications();
    const interval = setInterval(updateNotifications, 5000); // Check every 5 seconds for updates

    return () => clearInterval(interval);
  }, []);

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
  
  const getStatusInfo = (status: Notification['status']) => {
      switch(status) {
          case 'processing': return { icon: 'fa-hourglass-half', color: 'blue-500' };
          case 'failed': return { icon: 'fa-times-circle', color: 'red-500' };
          case 'success': return { icon: 'fa-check-circle', color: 'green-500' };
          case 'info': return { icon: 'fa-info-circle', color: 'blue-500' };
          default: return { icon: 'fa-bell', color: 'gray-500' };
      }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderHeader('الإشعارات')}
      <main className="flex-grow p-4 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <i className="fas fa-bell-slash text-5xl mb-4"></i>
            <h3 className="text-lg font-bold">لا يوجد إشعارات</h3>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(item => {
              const { icon, color } = getStatusInfo(item.status);
              const borderColor = color.replace('-500', '');
              const isExpanded = expandedId === item.id;

              return (
                <div key={item.id} className={`bg-white rounded-[5px] shadow-sm border-l-4 border-${borderColor}-500 overflow-hidden`}>
                  <button onClick={() => handleToggle(item.id)} className="w-full text-right p-4 flex items-start gap-3">
                    <i className={`fas ${icon} text-${color} text-xl mt-1`}></i>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-md">{item.title}</h3>
                        <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{new Date(item.timestamp).toLocaleString('ar-EG')}</p>
                    </div>
                  </button>
                  <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-4 pb-4">
                      <div className="border-t pt-3 ml-8">
                        <p className="text-sm text-gray-600 whitespace-pre-line">{item.message}</p>
                        {item.title === 'الحساب غير مفعل' && (
                           <a href="https://wa.me/201013803653" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-green-600 hover:text-green-700">
                                <i className="fab fa-whatsapp"></i>
                                <span>تواصل مع خدمة العملاء</span>
                            </a>
                       )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default NotificationsScreen;