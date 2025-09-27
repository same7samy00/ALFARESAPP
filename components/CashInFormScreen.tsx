
import React, { useState, useMemo } from 'react';
import { Screen } from '../types';

interface CashInFormScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
}

const CashInFormScreen: React.FC<CashInFormScreenProps> = ({ setScreen }) => {
  const [walletNumber, setWalletNumber] = useState('');
  const [amount, setAmount] = useState('');

  const goBack = () => setScreen(Screen.CashIn);

  const walletNumberError = useMemo(() => {
    if (!walletNumber) return '';
    if (!walletNumber.startsWith('010')) return 'رقم المحفظة يجب أن يبدأ بـ 010.';
    if (walletNumber.length !== 11) return 'رقم المحفظة يجب أن يتكون من 11 رقمًا.';
    return '';
  }, [walletNumber]);

  const amountError = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (!amount) return '';
    if (isNaN(numAmount)) return 'المبلغ غير صالح.';
    if (numAmount < 200) return 'أقل مبلغ للإيداع هو 200 جنيه.';
    if (numAmount > 60000) return 'أقصى مبلغ للإيداع هو 60,000 جنيه.';
    return '';
  }, [amount]);

  const handleSubmit = () => {
    if (walletNumberError || amountError || !walletNumber || !amount) return;

    // 1. Create Notification
    const newNotification = {
        id: `cashin-${Date.now()}`,
        type: 'cash_in',
        title: 'طلب شحن كاش',
        message: `جاري معالجة طلب شحن بمبلغ ${amount} جنيه.`,
        status: 'processing', // 'processing', 'failed', 'success'
        timestamp: Date.now(),
        isRead: false,
    };
    
    // 2. Save to localStorage
    try {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notifications.unshift(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
         // Dispatch a storage event to notify other components (like HomeScreen)
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error("Failed to save notification:", e);
    }

    // 3. Open WhatsApp
    const message = `طلب إيداع فودافون كاش:\n- رقم المحفظة: ${walletNumber}\n- المبلغ: ${amount} جنيه`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201013803653?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // 4. Navigate to Pending Screen
    setScreen(Screen.CashInPending);
  };

  const isSubmitDisabled = !!walletNumberError || !!amountError || !walletNumber || !amount;

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
      {renderHeader('إيداع فودافون كاش')}
      <main className="flex-grow p-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 text-right block mb-2">رقم المحفظة</label>
          <input
            type="tel"
            value={walletNumber}
            onChange={e => setWalletNumber(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="010xxxxxxxx"
            maxLength={11}
            className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${walletNumberError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`}
          />
          {walletNumberError && <p className="text-red-500 text-xs text-center mt-1">{walletNumberError}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 text-right block mb-2">مبلغ الإيداع</label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
            placeholder="200 - 60000"
            className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${amountError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`}
          />
          {amountError && <p className="text-red-500 text-xs text-center mt-1">{amountError}</p>}
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="w-full mt-6 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي
        </button>
      </main>
    </div>
  );
};

export default CashInFormScreen;