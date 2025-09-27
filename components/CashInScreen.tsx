
import React from 'react';
import { Screen } from '../types';

interface CashInScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const CashInScreen: React.FC<CashInScreenProps> = ({ setScreen, origin }) => {
  const goBack = () => setScreen(origin || Screen.Home);

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
      {renderHeader('شحن الكاش')}
      <main className="flex-grow p-4 overflow-y-auto space-y-4">
        <div className="bg-blue-50 border-l-4 border-primary text-primary-dark p-4 rounded-[5px]">
          <h3 className="font-bold text-gray-800 mb-2">تنبيه هام</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            حرصاً على جعل تطبيق الفارس صاحب أكبر عمولة في مصر وأعلى ربح للسادة التجار، فإن طرق شحن الحساب المتاحة حالياً هي عبر السحب من محفظة فودافون كاش وذلك دون أي رسوم.
            <br /><br />
            ويأتي ذلك استناداً إلى العقد القانوني رقم: 457392 إلى حين استكمال المناقشات مع باقي المحافظ الإلكترونية وشركات الدفع الإلكتروني لتوفير خدمات الإيداع دون رسوم).
            <br /><br />
            نتوجه بالشكر إلى شركة فودافون مصر على تعاونها،
            <br />
            مع خالص التحية،
            <br />
            المهندس فارس عبدالرحمن.
          </p>
        </div>

        <div onClick={() => setScreen(Screen.CashInForm)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3">
                <img src="https://i.postimg.cc/pLJm5Yk3/11.png" alt="فودافون كاش" className="h-10 w-10 object-contain" />
                <p className="font-semibold text-gray-700 text-md">فودافون كاش</p>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">بدون رسوم</span>
            </div>
            <i className="fas fa-chevron-left text-gray-400"></i>
        </div>
      </main>
    </div>
  );
};

export default CashInScreen;