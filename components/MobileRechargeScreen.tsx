
import React, { useState, useMemo, useEffect } from 'react';
import { Screen } from '../types';

interface MobileRechargeScreenProps {
  setScreen: (screen: Screen) => void;
}

const networks = [
  { name: 'فودافون', logo: 'https://i.postimg.cc/pLJm5Yk3/11.png', prefixes: ['010'] },
  { name: 'أورانج', logo: 'https://i.postimg.cc/25jVQbKy/12.png', prefixes: ['012'] },
  { name: 'إتصالات', logo: 'https://i.postimg.cc/d1L3XMvK/13.png', prefixes: ['011'] },
  { name: 'وي', logo: 'https://i.postimg.cc/26MyNH8L/14.png', prefixes: ['015'] },
];

type Network = typeof networks[0];

const MobileRechargeScreen: React.FC<MobileRechargeScreenProps> = ({ setScreen }) => {
  const [step, setStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [credit, setCredit] = useState('');
  const [transactionResult, setTransactionResult] = useState<{success: boolean, [key: string]: any} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewOperation = () => {
    setStep(1);
    setSelectedNetwork(null);
    setPhone('');
    setAmount('');
    setCredit('');
    setTransactionResult(null);
  };

  const goBack = () => {
    if (step > 1) {
      if (step === 3 || step === 2) {
        handleNewOperation();
        setStep(1);
      } else {
         setStep(step - 1);
      }
    } else {
      setScreen(Screen.Home);
    }
  };

  const handleNetworkSelect = (network: Network) => {
    setSelectedNetwork(network);
    setStep(2);
  };
  
  const phoneError = useMemo(() => {
    if (!phone || !selectedNetwork) return '';
    if (phone.length !== 11) return 'رقم الهاتف يجب أن يتكون من 11 رقمًا.';
    if (!selectedNetwork.prefixes.some(p => phone.startsWith(p))) {
      return `هذا الرقم لا يتبع شبكة ${selectedNetwork.name}.`;
    }
    return '';
  }, [phone, selectedNetwork]);

  const amountError = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (!amount) return '';
    if (numAmount < 5) return 'أقل مبلغ للشحن هو 5 جنيهات.';
    if (numAmount > 1000) return 'أقصى مبلغ للشحن هو 1000 جنيه.';
    return '';
  }, [amount]);
  
  const handleAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
        setAmount(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
            setCredit((numValue * 0.7).toFixed(2));
        } else {
            setCredit('');
        }
    }
  };

  const handleCreditChange = (value: string) => {
     if (/^\d*\.?\d*$/.test(value)) {
        setCredit(value);
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && numValue > 0) {
            setAmount((numValue / 0.7).toFixed(2));
        } else {
            setAmount('');
        }
    }
  };
  
  const handleRechargeSubmit = () => {
    if (phoneError || amountError || !phone || !amount) return;
    setIsLoading(true);
    setStep(3);
    
    setTimeout(() => {
        const paidAmount = parseFloat(amount);
        const receivedCredit = parseFloat(credit);

        const result = {
            success: false,
            reason: 'لا يوجد رصيد كافي لإتمام العملية.',
            service: 'شحن رصيد',
            provider: selectedNetwork?.name,
            phone: phone,
            amountPaid: paidAmount.toFixed(2),
            creditAdded: receivedCredit.toFixed(2),
            profit: (paidAmount * 0.005).toFixed(2),
            date: new Date().toLocaleString('ar-EG'),
            refNumber: `ALFARES${Date.now()}`
        };

        try {
            const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
            history.unshift(result);
            localStorage.setItem('transactionHistory', JSON.stringify(history.slice(0, 50)));
        } catch (e) {
            console.error('Could not save transaction to history', e);
        }
        
        setTransactionResult(result);
        setIsLoading(false);
    }, 2000); // Simulate API call
  };

  const isSubmitDisabled = !!phoneError || !!amountError || !phone || !amount;

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
  
  const renderActionButtons = () => (
    <>
      <button onClick={handleNewOperation} className="w-full mt-6 py-2.5 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
          عملية جديدة
      </button>
      <button onClick={() => setScreen(Screen.Home)} className="w-full mt-3 py-2 px-4 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300">
          العودة للرئيسية
      </button>
    </>
  );

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {/* Step 1: Select Network */}
      {step === 1 && (
        <>
            {renderHeader('شحن الموبايل')}
            <main className="flex-grow p-4">
                <p className="text-center text-gray-600 mb-6">اختر الشبكة التي تريد شحنها</p>
                <div className="flex flex-col gap-3">
                    {networks.map(network => (
                        <div key={network.name} onClick={() => handleNetworkSelect(network)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-4">
                                <img src={network.logo} alt={network.name} className="h-10 w-10 object-contain" />
                                <p className="font-semibold text-gray-700 text-md">{network.name}</p>
                            </div>
                            <i className="fas fa-chevron-left text-gray-400"></i>
                        </div>
                    ))}
                </div>
            </main>
        </>
      )}

      {/* Step 2: Enter Details */}
      {step === 2 && selectedNetwork && (
        <>
            {renderHeader(`الشحن لـ ${selectedNetwork.name}`)}
            <main className="flex-grow p-4 space-y-4">
                <img src={selectedNetwork.logo} alt={selectedNetwork.name} className="h-16 object-contain mx-auto mb-4" />
                <div>
                    <label className="text-sm font-medium text-gray-700 text-right block mb-2">رقم الهاتف</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="ادخل 11 رقم" maxLength={11} className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${phoneError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`} />
                    {phoneError && <p className="text-red-500 text-xs text-center mt-1">{phoneError}</p>}
                </div>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="text-sm font-medium text-gray-700 text-right block mb-2">المبلغ المدفوع</label>
                        <input type="text" inputMode="decimal" value={amount} onChange={e => handleAmountChange(e.target.value)} placeholder="5 - 1000" className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${amountError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`}/>
                    </div>
                    <div className="w-1/2">
                        <label className="text-sm font-medium text-gray-700 text-right block mb-2">الرصيد</label>
                        <input type="text" inputMode="decimal" value={credit} onChange={e => handleCreditChange(e.target.value)} placeholder="يُحسب تلقائياً" className="w-full px-4 py-2.5 text-right bg-white border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                    </div>
                </div>
                {amountError && <p className="text-red-500 text-xs text-center mt-1">{amountError}</p>}
                
                 <button onClick={handleRechargeSubmit} disabled={isSubmitDisabled} className="w-full mt-6 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    شحن الآن
                </button>
            </main>
        </>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <>
            {renderHeader('نتيجة العملية')}
            <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
            {isLoading ? (
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-semibold">جاري معالجة طلبك...</p>
                </div>
            ) : transactionResult && (
                <div className="bg-white p-6 rounded-[5px] shadow-lg w-full max-w-sm animate-slide-in-up">
                    {transactionResult.success ? (
                        <>
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                                   <i className="fas fa-check-circle text-4xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">تم الشحن بنجاح</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600 text-right">
                                <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">{transactionResult.service} - {transactionResult.provider}</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>رقم الهاتف</span><strong className="text-gray-800 tracking-wider">{transactionResult.phone}</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>المبلغ المدفوع</span><strong className="text-green-600">{transactionResult.amountPaid} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>الرصيد المضاف</span><strong className="text-primary">{transactionResult.creditAdded} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>ربح التاجر (0.5%)</span><strong className="text-green-600">{transactionResult.profit} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>التاريخ والوقت</span><strong className="text-gray-800">{transactionResult.date}</strong></div>
                                <div className="flex justify-between pt-2"><span>رقم مرجعي</span><strong className="text-gray-800">{transactionResult.refNumber}</strong></div>
                            </div>
                        </>
                    ) : (
                         <>
                            <div className="flex flex-col items-center mb-4">
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                                   <i className="fas fa-times-circle text-4xl"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">فشلت العملية</h3>
                                <p className="text-gray-600 mt-2">{transactionResult.reason}</p>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600 text-right">
                                <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">{transactionResult.service} - {transactionResult.provider}</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>رقم الهاتف</span><strong className="text-gray-800 tracking-wider">{transactionResult.phone}</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>المبلغ المدفوع</span><strong className="text-red-600 line-through">{transactionResult.amountPaid} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>الرصيد المضاف</span><strong className="text-red-600 line-through">{transactionResult.creditAdded} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>ربح التاجر (0.5%)</span><strong className="text-red-600 line-through">{transactionResult.profit} جنيه</strong></div>
                                <div className="flex justify-between border-b pb-2"><span>التاريخ والوقت</span><strong className="text-gray-800">{transactionResult.date}</strong></div>
                                <div className="flex justify-between pt-2"><span>رقم مرجعي</span><strong className="text-gray-800">{transactionResult.refNumber}</strong></div>
                            </div>
                        </>
                    )}
                    {renderActionButtons()}
                </div>
            )}
            </main>
        </>
      )}

    </div>
  );
};

export default MobileRechargeScreen;