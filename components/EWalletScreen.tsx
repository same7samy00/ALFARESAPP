
import React, { useState, useMemo } from 'react';
import { Screen } from '../types';
import { ewalletCategories, EWalletCategory, EWalletService, TransactionType } from './ewalletServices';

interface EWalletScreenProps {
  setScreen: (screen: Screen) => void;
}

const EWalletScreen: React.FC<EWalletScreenProps> = ({ setScreen }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<EWalletCategory | null>(null);
    const [selectedService, setSelectedService] = useState<EWalletService | null>(null);
    const [transactionType, setTransactionType] = useState<TransactionType>('شحن');
    const [identifier, setIdentifier] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionResult, setTransactionResult] = useState<{ success: boolean; [key: string]: any } | null>(null);

    const bankList = [
        'البنك الأهلي المصري', 'بنك مصر', 'البنك التجاري الدولي', 'بنك الإسكندرية', 'بنك القاهرة',
        'البنك العربي الأفريقي', 'بنك كريدي أجريكول', 'بنك عودة', 'بنك أبوظبي الأول', 'البنك المصري الخليجي',
        'بنك الشركة المصرفية العربية الدولية', 'بنك فيصل الإسلامي المصري', 'بنك البركة مصر', 'بنك الإمارات دبي الوطني',
        'بنك قطر الوطني الأهلي', 'بنك المؤسسة العربية المصرفية', 'بنك التعمير والإسكان', 'بنك مصر إيران للتنمية',
        'بنك الاستثمار العربي', 'بنك أتش إس بي سي مصر', 'بنك سيتي بنك مصر', 'بنك الأهلي سوسيتيه جنرال', 'بنك بلوم مصر'
    ];

    const resetState = () => {
        setStep(1);
        setSelectedCategory(null);
        setSelectedService(null);
        setIdentifier('');
        setAmount('');
        setTransactionResult(null);
        setIsLoading(false);
    };

    const goBack = () => {
        if (step > 1) {
            if (step === 4) { // from result screen
                resetState();
            } else if (step === 3) { // from transaction form
                if(selectedCategory && selectedCategory.services.length === 1) {
                    setStep(1);
                    setSelectedCategory(null);
                } else {
                    setStep(2);
                }
                setSelectedService(null);
                setIdentifier('');
                setAmount('');
            } else if (step === 2) { // from service list
                setStep(1);
                setSelectedCategory(null);
            }
        } else {
            setScreen(Screen.Home);
        }
    };
    
    const handleCategorySelect = (category: EWalletCategory) => {
        setSelectedCategory(category);
        if (category.services.length === 1) {
            setSelectedService(category.services[0]);
            setStep(3);
        } else {
            setStep(2);
        }
    };

    const handleServiceSelect = (service: EWalletService) => {
        setSelectedService(service);
        setStep(3);
    };

    const identifierError = useMemo(() => {
        if (!identifier || !selectedService) return '';
        const { identifierType, prefixes } = selectedService;
        
        if (identifierType === 'phone') {
            if (!/^\d{11}$/.test(identifier)) return 'رقم الهاتف يجب أن يتكون من 11 رقمًا.';
            if (prefixes && !prefixes.some(p => identifier.startsWith(p))) {
                return `هذا الرقم لا يتبع شبكة ${selectedService.provider}.`;
            }
        } else if (identifierType === 'instapay') {
            const phoneRegex = /^01[0125]\d{8}$/;
            const userRegex = /^[a-zA-Z0-9_]+@instapay$/;
            if (!phoneRegex.test(identifier) && !userRegex.test(identifier)) {
                return 'تنسيق انستا باي غير صحيح.';
            }
        }
        return '';
    }, [identifier, selectedService]);

    const amountError = useMemo(() => {
        const numAmount = parseFloat(amount);
        if (!amount) return '';
        if (isNaN(numAmount) || numAmount < 10) return 'أقل مبلغ هو 10 جنيهات.';
        if (numAmount > 50000) return 'أقصى مبلغ هو 50,000 جنيه.';
        return '';
    }, [amount]);
    

    const handleSubmit = () => {
        // This function will not be called as the button is disabled.
        // Kept for future activation.
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

    const renderStepContent = () => {
        switch (step) {
            case 1: // Category Selection
                return (
                    <>
                        {renderHeader('خدمات المحافظ')}
                        <main className="flex-grow p-4 overflow-y-auto">
                            <p className="text-center text-gray-600 mb-6">اختر نوع الخدمة</p>
                            <div className="flex flex-col gap-3">
                                {ewalletCategories.map(category => (
                                    <div key={category.name} onClick={() => handleCategorySelect(category)} className="bg-white p-4 rounded-[5px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-[5px] text-primary">
                                                <i className={`${category.icon} text-xl`}></i>
                                            </div>
                                            <p className="font-semibold text-gray-700 text-md">{category.name}</p>
                                        </div>
                                        <i className="fas fa-chevron-left text-gray-400"></i>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </>
                );
            
            case 2: // Service Selection
                return (
                    <>
                        {renderHeader(selectedCategory!.name)}
                        <main className="flex-grow p-4 overflow-y-auto">
                             <p className="text-center text-gray-600 mb-6">اختر المحفظة</p>
                            <div className="flex flex-col gap-3">
                                {selectedCategory!.services.map(service => (
                                    <div key={service.name} onClick={() => handleServiceSelect(service)} className="flex items-center justify-between bg-white p-4 rounded-[5px] shadow-sm hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-[5px] text-primary">
                                                <i className={`${service.icon} text-xl`}></i>
                                            </div>
                                            <p className="font-semibold text-gray-700 text-md">{service.name}</p>
                                        </div>
                                        <i className="fas fa-chevron-left text-gray-400"></i>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </>
                );

            case 3: // Transaction Form
                if (!selectedService) return null;

                const isBankWallet = selectedCategory?.name === 'المحافظ البنكية';

                const ActivationNotice = () => (
                    <div className="space-y-2">
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-[5px] flex items-center gap-3">
                            <i className="fas fa-exclamation-triangle"></i>
                            <p className="font-semibold text-sm">الحساب غير مفعل لهذه الخدمة</p>
                        </div>
                        <div className="bg-blue-100 border-l-4 border-primary text-primary p-3 rounded-[5px] flex items-center gap-3">
                            <i className="fas fa-info-circle"></i>
                            <p className="font-semibold text-sm">السحب والإيداع بدون رسوم لمدة 60 يوم من تاريخ إنشاء الحساب.</p>
                        </div>
                    </div>
                );

                return (
                    <>
                        {renderHeader(selectedService.name)}
                        <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                             <ActivationNotice />
                             <div className="grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-[5px]">
                                <button onClick={() => setTransactionType('شحن')} className={`py-2.5 rounded-[5px] font-bold text-md transition-colors ${transactionType === 'شحن' ? 'bg-white text-primary shadow' : 'text-gray-600'}`}>شحن / إيداع</button>
                                <button 
                                    onClick={() => setTransactionType('سحب')} 
                                    disabled
                                    className={`py-2.5 rounded-[5px] font-bold text-md transition-colors text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    سحب / تحويل
                                </button>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 text-right block mb-2">{selectedService.name}</label>
                                <input 
                                    type="text" 
                                    value={identifier} 
                                    onChange={e => setIdentifier(e.target.value)} 
                                    placeholder={selectedService.placeholder}
                                    disabled
                                    className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${identifierError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'} disabled:bg-gray-200 disabled:cursor-not-allowed`}
                                />
                                {identifierError && <p className="text-red-500 text-xs text-center mt-1">{identifierError}</p>}
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-700 text-right block mb-2">المبلغ</label>
                                <input 
                                    type="text" 
                                    inputMode="decimal" 
                                    value={amount} 
                                    onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} 
                                    placeholder="10 - 50,000"
                                    disabled
                                    className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${amountError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'} disabled:bg-gray-200 disabled:cursor-not-allowed`}
                                />
                                {amountError && <p className="text-red-500 text-xs text-center mt-1">{amountError}</p>}
                            </div>

                            {isBankWallet && (
                                <div className="mt-4">
                                    <h4 className="text-md font-bold text-gray-700 text-center mb-2">البنوك المدعومة</h4>
                                    <div className="bg-white border rounded-[5px] p-3 max-h-48 overflow-y-auto">
                                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                                            {bankList.map(bank => (
                                                <li key={bank} className="flex items-center gap-2">
                                                    <i className="fas fa-check-circle text-green-500 text-xs"></i>
                                                    <span>{bank}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                             <button onClick={handleSubmit} disabled className="w-full mt-2 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                تأكيد
                            </button>
                        </main>
                    </>
                );

            case 4: // Result Screen
                return (
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
                                <div className="flex flex-col items-center mb-4">
                                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                                       <i className="fas fa-times-circle text-4xl"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">فشلت العملية</h3>
                                    <p className="text-gray-600 mt-2">{transactionResult.reason}</p>
                                </div>
                                <div className="space-y-2 text-sm text-gray-600 text-right">
                                    <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">{transactionResult.service}</strong></div>
                                    <div className="flex justify-between border-b pb-2"><span>نوع العملية</span><strong className="text-gray-800">{transactionResult.type}</strong></div>
                                    <div className="flex justify-between border-b pb-2"><span>إلى رقم</span><strong className="text-gray-800 tracking-wider">{transactionResult.identifier}</strong></div>
                                    <div className="flex justify-between border-b pb-2"><span>المبلغ</span><strong className="text-red-600 line-through">{transactionResult.amount} جنيه</strong></div>
                                    <div className="flex justify-between border-b pb-2"><span>التاريخ</span><strong className="text-gray-800">{transactionResult.date}</strong></div>
                                    <div className="flex justify-between pt-2"><span>رقم مرجعي</span><strong className="text-gray-800">{transactionResult.refNumber}</strong></div>
                                </div>
                                <button onClick={resetState} className="w-full mt-6 py-2.5 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
                                    عملية جديدة
                                </button>
                                <button onClick={() => setScreen(Screen.Home)} className="w-full mt-3 py-2 px-4 font-bold text-primary bg-white border-2 border-primary rounded-[5px] hover:bg-primary-light transition-colors duration-300">
                                    العودة للرئيسية
                                </button>
                            </div>
                        )}
                        </main>
                    </>
                );

            default:
                return <p>خطأ</p>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {renderStepContent()}
        </div>
    );
};

export default EWalletScreen;