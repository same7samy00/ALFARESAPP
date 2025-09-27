
import React, { useState, useMemo } from 'react';
import { Screen } from '../types';
import { smartServicesData, ServiceProvider, ServiceCategory, ServiceItem, ServiceSubCategory } from './smartRechargeServices';

interface SmartRechargeScreenProps {
  setScreen: (screen: Screen) => void;
}

const SmartRechargeScreen: React.FC<SmartRechargeScreenProps> = ({ setScreen }) => {
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ServiceSubCategory | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [cardCount, setCardCount] = useState(1);
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{ success: boolean; [key: string]: any } | null>(null);

  const resetState = () => {
    setStep(1);
    setSelectedProvider(null);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSelectedService(null);
    setPhone('');
    setCardCount(1);
    setTransactionResult(null);
    setIsLoading(false);
  };

  const goBack = () => {
    if (transactionResult || step === 6) {
      resetState();
      return;
    }

    if (step === 5) { // From Inquiry page
      if (selectedProvider && selectedProvider.categories.length === 1 && (selectedProvider.categories[0].flowType === 'INQUIRY_ONLY' || selectedProvider.categories[0].flowType === 'INQUIRY_WITH_SUBTYPE')) {
        setSelectedProvider(null);
        setSelectedCategory(null);
        setStep(1);
      } else {
        setSelectedCategory(null);
        setStep(2);
      }
    } else if (step === 4) { // From Item selection
      setSelectedService(null);
      // Check if the category we came from had sub-categories
      if (selectedCategory?.subCategories) {
        setSelectedSubCategory(null);
        setStep(3);
      } else {
        setSelectedCategory(null);
        setStep(2);
      }
    } else if (step === 3) { // From Sub-category selection
      setSelectedCategory(null);
      setStep(2);
    } else if (step === 2) { // From Category selection
      setSelectedProvider(null);
      setStep(1);
    } else if (step === 1) { // From Provider selection
      setScreen(Screen.Home);
    }
  };

  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    if (provider.categories.length === 1 && (provider.categories[0].flowType === 'INQUIRY_ONLY' || provider.categories[0].flowType === 'INQUIRY_WITH_SUBTYPE')) {
        setSelectedCategory(provider.categories[0]);
        setStep(5);
    } else {
        setStep(2);
    }
  };

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category);
    if(category.flowType === 'INQUIRY_ONLY' || category.flowType === 'INQUIRY_WITH_SUBTYPE') {
        setStep(5); // Inquiry Step
    } else if (category.subCategories) {
        setStep(3); // SubCategory selection
    } else {
        setSelectedService(null); // Reset service
        setStep(4); // Final step (phone/print)
    }
  };

  const handleSubCategorySelect = (subCategory: ServiceSubCategory) => {
      setSelectedSubCategory(subCategory);
      setStep(4);
  }

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
  };
  
  const phoneError = useMemo(() => {
    if (!phone || !selectedProvider?.prefixes) return '';
    if (phone.length !== 11) return 'رقم الهاتف يجب أن يتكون من 11 رقمًا.';
    if (!selectedProvider.prefixes.some(p => phone.startsWith(p))) {
      return `هذا الرقم لا يتبع شبكة ${selectedProvider.name}.`;
    }
    return '';
  }, [phone, selectedProvider]);

  const handleSubmit = () => {
    const isPhoneFlow = selectedCategory?.flowType === 'PHONE_AND_SELECTION';
    if (isPhoneFlow && (phoneError || !selectedService || !phone)) return;
    
    const isPrintFlow = selectedCategory?.flowType === 'PRINT_CARDS';
    if(isPrintFlow && !selectedService) return;

    setIsLoading(true);
    setTransactionResult(null); // Clear previous result
    setStep(6); // Move to a unified loading/result step
    
    setTimeout(() => {
      let details: any = {
        success: false,
        reason: 'لا يوجد رصيد كافي لإتمام العملية.',
        service: selectedService?.name,
        provider: selectedProvider?.name,
        category: selectedCategory?.name,
        date: new Date().toLocaleString('ar-EG'),
        refNumber: `ALFARES-SMRT${Date.now()}`
      };

      if (isPhoneFlow) {
        details = { ...details, phone, amountPaid: selectedService?.price, profit: selectedService?.commission };
      } else if (isPrintFlow) {
        const totalAmount = (selectedService?.price || 0) * cardCount;
        const totalProfit = (selectedService?.commission || 0) * cardCount;
        details = { ...details, quantity: cardCount, amountPaid: totalAmount, profit: totalProfit };
      }

      try {
          const history = JSON.parse(localStorage.getItem('transactionHistory') || '[]');
          history.unshift(details);
          localStorage.setItem('transactionHistory', JSON.stringify(history.slice(0, 50)));
      } catch (e) {
          console.error('Could not save transaction to history', e);
      }

      setTransactionResult(details);
      setIsLoading(false);
    }, 2000);
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

  const renderCurrentStep = () => {
    // Result Screen (universal)
    if (step === 6) {
      return (
        <>
        {renderHeader('نتيجة العملية')}
        <main className="flex-grow p-4 flex flex-col items-center justify-center text-center">
            {isLoading ? (
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-primary-light border-t-primary rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600 font-semibold">جاري معالجة طلبك...</p>
                </div>
            ) : (
                transactionResult && (
                    <div className="bg-white p-6 rounded-[5px] shadow-lg w-full max-w-sm animate-slide-in-up">
                        <div className="flex flex-col items-center mb-4">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                               <i className="fas fa-times-circle text-4xl"></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">فشلت العملية</h3>
                            <p className="text-gray-600 mt-2">{transactionResult.reason}</p>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600 text-right">
                            <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">{transactionResult.service} ({transactionResult.provider})</strong></div>
                            {transactionResult.phone && <div className="flex justify-between border-b pb-2"><span>رقم الهاتف</span><strong className="text-gray-800 tracking-wider">{transactionResult.phone}</strong></div>}
                            {transactionResult.quantity && <div className="flex justify-between border-b pb-2"><span>الكمية</span><strong className="text-gray-800 tracking-wider">{transactionResult.quantity}</strong></div>}
                            <div className="flex justify-between border-b pb-2"><span>المبلغ</span><strong className="text-red-600 line-through">{Number(transactionResult.amountPaid || 0).toFixed(2)} جنيه</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>الربح</span><strong className="text-red-600 line-through">{Number(transactionResult.profit || 0).toFixed(2)} جنيه</strong></div>
                            <div className="flex justify-between border-b pb-2"><span>التاريخ والوقت</span><strong className="text-gray-800">{transactionResult.date}</strong></div>
                            <div className="flex justify-between pt-2"><span>رقم مرجعي</span><strong className="text-gray-800">{transactionResult.refNumber}</strong></div>
                        </div>
                        <button onClick={resetState} className="w-full mt-6 py-2.5 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
                            عملية جديدة
                        </button>
                        <button onClick={() => setScreen(Screen.Home)} className="w-full mt-3 py-2 px-4 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300">
                            العودة للرئيسية
                        </button>
                    </div>
                )
            )}
        </main>
        </>
      );
    }
    
    switch (step) {
      case 1: // Select Provider
        return (
          <>
            {renderHeader('الشحن الذكي')}
            <main className="flex-grow p-4 overflow-y-auto">
              <p className="text-center text-gray-600 mb-6">اختر مقدم الخدمة</p>
              <div className="flex flex-col gap-3">
                {smartServicesData.map(p => (
                  <div key={p.name} onClick={() => handleProviderSelect(p)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <img src={p.logo} alt={p.name} className="h-10 w-10 object-contain" />
                        <p className="font-semibold text-gray-700 text-md">{p.name}</p>
                    </div>
                    <i className="fas fa-chevron-left text-gray-400"></i>
                  </div>
                ))}
              </div>
            </main>
          </>
        );
      case 2: // Select Category
        return (
          <>
            {renderHeader(selectedProvider!.name)}
            <main className="flex-grow p-4 space-y-3 overflow-y-auto">
              <p className="text-center text-gray-600 mb-4">اختر نوع الخدمة</p>
              {selectedProvider!.categories.map(c => (
                <div key={c.name} onClick={() => handleCategorySelect(c)} className="bg-white p-4 rounded-[5px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">{c.name}</h3>
                    <i className="fas fa-chevron-left text-gray-400"></i>
                </div>
              ))}
            </main>
          </>
        );
      case 3: // Select SubCategory
        return (
             <>
                {renderHeader(selectedCategory!.name)}
                 <main className="flex-grow p-4 space-y-3 overflow-y-auto">
                    <p className="text-center text-gray-600 mb-4">اختر الفئة</p>
                    {selectedCategory!.subCategories!.map(sc => (
                        <div key={sc.name} onClick={() => handleSubCategorySelect(sc)} className="bg-white p-4 rounded-[5px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">{sc.name}</h3>
                            <i className="fas fa-chevron-left text-gray-400"></i>
                        </div>
                    ))}
                 </main>
            </>
        )
      case 4: // Main Action Step
          const items = selectedSubCategory ? selectedSubCategory.items : selectedCategory?.items || [];
          // Phone and Selection Flow
          if(selectedCategory?.flowType === 'PHONE_AND_SELECTION') {
              return (
                  <>
                  {renderHeader(selectedSubCategory?.name || selectedCategory.name)}
                  <main className="flex-grow p-4 flex flex-col">
                      <div>
                          <label className="text-sm font-medium text-gray-700 text-right block mb-2">رقم الهاتف</label>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="ادخل 11 رقم" maxLength={11} className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${phoneError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`} />
                          {phoneError && <p className="text-red-500 text-xs text-center mt-1">{phoneError}</p>}
                      </div>
                      <p className="text-center text-gray-600 my-4">اختر الباقة</p>
                      <div className="flex-grow overflow-y-auto grid grid-cols-2 gap-3">
                        {items.map(item => (
                            <div 
                                key={item.name} 
                                onClick={() => handleServiceSelect(item)} 
                                className={`flex flex-col items-center justify-center text-center px-2 py-4 rounded-[5px] border-2 transition-all cursor-pointer ${selectedService?.name === item.name ? 'bg-primary-light border-primary shadow-lg' : 'bg-white border-gray-200'}`}
                            >
                                <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                                {item.price !== undefined && <p className="text-xs text-gray-600 mt-1">{Number(item.price).toFixed(2)} جنيه</p>}
                                {(item.commission ?? 0) > 0 &&
                                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-2">
                                        ربح: {Number(item.commission).toFixed(2)} ج
                                    </span>
                                }
                            </div>
                        ))}
                      </div>
                      <button onClick={handleSubmit} disabled={!selectedService || !phone || !!phoneError} className="w-full mt-4 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                          تأكيد
                      </button>
                  </main>
                  </>
              )
          }
          // Print Cards Flow
          if(selectedCategory?.flowType === 'PRINT_CARDS') {
            const totalCost = (selectedService?.price || 0) * cardCount;
            const totalProfit = (selectedService?.commission || 0) * cardCount;
              return (
                 <>
                  {renderHeader(selectedCategory.name)}
                  <main className="flex-grow p-4 flex flex-col">
                      <p className="text-center text-gray-600 mb-4">اختر نوع الكارت</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {items.map(item => (
                           <div 
                                key={item.name} 
                                onClick={() => handleServiceSelect(item)} 
                                className={`flex flex-col items-center justify-center text-center px-2 py-4 rounded-[5px] border-2 transition-all cursor-pointer ${selectedService?.name === item.name ? 'bg-primary-light border-primary shadow-lg' : 'bg-white border-gray-200'}`}
                            >
                                <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                                {item.price !== undefined && <p className="text-xs text-gray-600 mt-1">{Number(item.price).toFixed(2)} جنيه</p>}
                                {(item.commission ?? 0) > 0 &&
                                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full mt-2">
                                        ربح: {Number(item.commission).toFixed(2)} ج
                                    </span>
                                }
                            </div>
                        ))}
                      </div>
                      {selectedService && (
                          <div className="bg-white p-4 rounded-[5px] shadow-md border animate-slide-in-up mt-4">
                            <h3 className="text-lg font-bold text-center text-gray-800 mb-4">تحديد الكمية لـ ({selectedService.name})</h3>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <button onClick={() => setCardCount(c => Math.max(1, c - 1))} className="w-12 h-12 bg-gray-200 rounded-full text-2xl font-bold text-gray-700">-</button>
                                <span className="text-4xl font-bold w-20 text-center">{cardCount}</span>
                                <button onClick={() => setCardCount(c => Math.min(10, c + 1))} className="w-12 h-12 bg-gray-200 rounded-full text-2xl font-bold text-gray-700">+</button>
                            </div>
                            <div className="border-t pt-3 mt-4 space-y-2 text-md">
                                <div className="flex justify-between"><span>الإجمالي:</span><strong className="text-gray-900">{totalCost.toFixed(2)} جنيه</strong></div>
                                <div className="flex justify-between"><span>إجمالي الربح:</span><strong className="text-primary">{totalProfit.toFixed(2)} جنيه</strong></div>
                                <div className="flex justify-between font-bold text-lg"><span>المخصوم من الكاش:</span><strong className="text-primary">{(totalCost - totalProfit).toFixed(2)} جنيه</strong></div>
                            </div>
                          </div>
                      )}
                      <button onClick={handleSubmit} disabled={!selectedService} className="w-full mt-auto py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                          طباعة
                      </button>
                  </main>
                 </>
              )
          }
          return <p>نوع خدمة غير معروف.</p>;
      case 5: // Inquiry Flow
        const ActivationNotice = () => (
          <div className="bg-yellow-100 border-b-2 border-yellow-200 text-yellow-800 text-sm font-semibold p-3 w-full shrink-0 flex items-center justify-center gap-4">
              <i className="fas fa-exclamation-triangle"></i>
              <span>الحساب غير مفعل لهذه الخدمة</span>
              <a href="https://wa.me/201013803653" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors" aria-label="Contact support on WhatsApp">
                  <i className="fab fa-whatsapp text-2xl"></i>
              </a>
          </div>
        );
        return (
          <>
            {renderHeader(selectedCategory!.name)}
            <ActivationNotice />
            <main className="flex-grow p-6 flex flex-col">
              <div className="w-full space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 text-right block mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    disabled
                    className="w-full px-4 py-2.5 text-right bg-gray-200 border-2 border-gray-200 rounded-[5px] cursor-not-allowed"
                  />
                </div>
                
                {selectedCategory?.flowType === 'INQUIRY_WITH_SUBTYPE' && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 text-right block mb-2">نوع الفاتورة</label>
                    <select
                      disabled
                      className="w-full px-4 py-2.5 text-right bg-gray-200 border-2 border-gray-200 rounded-[5px] cursor-not-allowed appearance-none"
                    >
                      <option value="" disabled selected>{selectedCategory.subTypes?.[0] || 'اختر النوع'}</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-4">
                  <button
                    disabled
                    className="w-full flex justify-center py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    استعلام
                  </button>
              </div>
            </main>
          </>
        );
      default:
        return <p>خطأ: خطوة غير معروفة.</p>;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderCurrentStep()}
    </div>
  );
};

export default SmartRechargeScreen;