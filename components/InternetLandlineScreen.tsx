
import React, { useState } from 'react';
import { Screen } from '../types';
import { internetServicesData, InternetService, ServicePackage, governorateCodes } from './internetLandlineServices';

interface InternetLandlineScreenProps {
  setScreen: (screen: Screen) => void;
}

const InternetLandlineScreen: React.FC<InternetLandlineScreenProps> = ({ setScreen }) => {
    const [step, setStep] = useState(1);
    const [selectedService, setSelectedService] = useState<InternetService | null>(null);
    const [phone, setPhone] = useState('');
    const [governorateInfo, setGovernorateInfo] = useState<{name: string, isValid: boolean} | null>(null);
    const [phoneError, setPhoneError] = useState('');
    const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionResult, setTransactionResult] = useState<{ success: boolean; [key: string]: any } | null>(null);

    const resetState = () => {
        setStep(1);
        setSelectedService(null);
        setPhone('');
        setGovernorateInfo(null);
        setPhoneError('');
        setSelectedPackage(null);
        setIsLoading(false);
        setTransactionResult(null);
    };

    const goBack = () => {
        if (step === 3) {
            resetState();
        } else if (step === 2) {
            setStep(1);
            setSelectedService(null);
            setPhone('');
            setGovernorateInfo(null);
            setPhoneError('');
            setSelectedPackage(null);
        } else {
            setScreen(Screen.Home);
        }
    };

    const handleServiceSelect = (service: InternetService) => {
        setSelectedService(service);
        setStep(2);
    };
    
    const handlePhoneChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setPhone(numericValue);
        setGovernorateInfo(null);
        setPhoneError('');

        if (!numericValue) return;

        const matchedCode = Object.keys(governorateCodes)
            .sort((a, b) => b.length - a.length) // Prioritize longer codes like '013' over '01'
            .find(code => numericValue.startsWith(code));

        if (matchedCode) {
            const info = governorateCodes[matchedCode];
            const expectedTotalLength = matchedCode.length + info.length;
            const isValid = numericValue.length === expectedTotalLength;
            setGovernorateInfo({ name: info.name, isValid });
            if (numericValue.length > expectedTotalLength) {
                setPhoneError(`الرقم يجب أن يكون ${expectedTotalLength} أرقام.`);
            } else {
                 setPhoneError('');
            }
        } else {
            setPhoneError('كود المحافظة غير صحيح.');
        }
    };

    const handleSubmit = () => {
        if (!selectedService || !selectedPackage || !governorateInfo?.isValid) return;
        
        setIsLoading(true);
        setTransactionResult(null);
        setStep(3);
        
        setTimeout(() => {
            const profit = selectedPackage.price * selectedPackage.commissionRate;
            const amountToPay = selectedPackage.price - profit;
            
            const result = {
                success: false,
                reason: 'لا يوجد رصيد كافي لإتمام العملية.',
                service: selectedService.name,
                provider: selectedService.provider,
                phone: phone,
                package: selectedPackage.name,
                amountPaid: selectedPackage.price.toFixed(2),
                profit: profit.toFixed(2),
                amountToPay: amountToPay.toFixed(2),
                date: new Date().toLocaleString('ar-EG'),
                refNumber: `ALFARES-INET${Date.now()}`
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

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                    {renderHeader('الانترنت والأرضي')}
                    <main className="flex-grow p-4 overflow-y-auto">
                        <p className="text-center text-gray-600 mb-6">اختر الخدمة المطلوبة</p>
                        <div className="flex flex-col gap-3">
                            {internetServicesData.map(service => (
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
            
            case 2:
                if (!selectedService) return null;

                if (selectedService.flowType === 'INQUIRY_ONLY') {
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
                            {renderHeader(selectedService.name)}
                            <ActivationNotice />
                            <main className="flex-grow p-6 flex flex-col">
                                <div className="w-full space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 text-right block mb-2">رقم الهاتف الأرضي (مع كود المحافظة)</label>
                                        <input 
                                          type="tel" 
                                          placeholder="مثال: 02xxxxxxxx" 
                                          disabled
                                          className="w-full px-4 py-2.5 text-right bg-gray-200 border-2 border-gray-200 rounded-[5px] cursor-not-allowed tracking-widest"
                                        />
                                    </div>
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
                }

                if (selectedService.flowType === 'PHONE_AND_SELECTION') {
                    const profit = selectedPackage ? selectedPackage.price * selectedPackage.commissionRate : 0;
                    const amountToPay = selectedPackage ? selectedPackage.price - profit : 0;

                    return (
                        <>
                        {renderHeader(selectedService.name)}
                        <main className="flex-grow p-4 flex flex-col">
                            <div>
                                <label className="text-sm font-medium text-gray-700 text-right block mb-2">رقم الهاتف الأرضي (مع كود المحافظة)</label>
                                <input type="tel" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="مثال: 02xxxxxxxx" className={`w-full px-4 py-2.5 text-right bg-white border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent tracking-widest ${phoneError ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`} />
                                {governorateInfo && (
                                    <p className={`text-center text-sm mt-2 font-semibold ${governorateInfo.isValid ? 'text-green-600' : 'text-yellow-700'}`}>
                                        المحافظة: {governorateInfo.name} {governorateInfo.isValid ? '(مكتمل)' : '(أكمل الرقم...)'}
                                    </p>
                                )}
                                {phoneError && <p className="text-red-500 text-xs text-center mt-1">{phoneError}</p>}
                            </div>

                            <p className="text-center text-gray-600 my-4">اختر الباقة</p>
                            <div className="flex-grow overflow-y-auto grid grid-cols-2 gap-3">
                                {selectedService.packages?.map(pkg => (
                                    <div 
                                        key={pkg.name} 
                                        onClick={() => setSelectedPackage(pkg)} 
                                        className={`flex flex-col items-center justify-center text-center px-2 py-4 rounded-[5px] border-2 transition-all cursor-pointer ${selectedPackage?.name === pkg.name ? 'bg-primary-light border-primary shadow-lg' : 'bg-white border-gray-200'}`}
                                    >
                                        <p className="font-bold text-gray-800 text-sm leading-tight">{pkg.name}</p>
                                        <p className="text-xs text-gray-600 mt-1">{pkg.price.toFixed(2)} جنيه</p>
                                    </div>
                                ))}
                            </div>

                            {selectedPackage && (
                                <div className="bg-white p-3 rounded-[5px] shadow-inner border mt-4 space-y-2 animate-slide-in-up">
                                    <div className="flex justify-between text-sm"><span>الإجمالي:</span><strong>{selectedPackage.price.toFixed(2)} جنيه</strong></div>
                                    <div className="flex justify-between text-sm"><span>الربح (1%):</span><strong className="text-primary">{profit.toFixed(2)} جنيه</strong></div>
                                    <div className="flex justify-between font-bold text-md border-t pt-2 mt-2"><span>المخصوم من الكاش:</span><strong className="text-primary">{amountToPay.toFixed(2)} جنيه</strong></div>
                                </div>
                            )}

                            <button onClick={handleSubmit} disabled={!governorateInfo?.isValid || !selectedPackage} className="w-full mt-4 py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed shrink-0">
                                تأكيد
                            </button>
                        </main>
                        </>
                    )
                }
                return null;
            
            case 3:
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
                                        <div className="flex justify-between border-b pb-2"><span>الخدمة</span><strong className="text-gray-800">{transactionResult.service}</strong></div>
                                        <div className="flex justify-between border-b pb-2"><span>رقم الهاتف</span><strong className="text-gray-800 tracking-wider">{transactionResult.phone}</strong></div>
                                        <div className="flex justify-between border-b pb-2"><span>الباقة</span><strong className="text-gray-800">{transactionResult.package}</strong></div>
                                        <div className="flex justify-between border-b pb-2"><span>المبلغ</span><strong className="text-red-600 line-through">{transactionResult.amountPaid} جنيه</strong></div>
                                        <div className="flex justify-between border-b pb-2"><span>الربح</span><strong className="text-red-600 line-through">{transactionResult.profit} جنيه</strong></div>
                                        <div className="flex justify-between border-b pb-2"><span>المخصوم</span><strong className="text-red-600 line-through">{transactionResult.amountToPay} جنيه</strong></div>
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
                            )
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
            {renderStep()}
        </div>
    );
};

export default InternetLandlineScreen;