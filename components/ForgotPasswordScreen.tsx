
import React, { useState } from 'react';
import { Screen } from '../types';

interface ForgotPasswordScreenProps {
  setScreen: (screen: Screen) => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ setScreen }) => {
    const [nationalId, setNationalId] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [error, setError] = useState('');

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const userDataString = localStorage.getItem('userData');

        if (userDataString) {
            const storedData = JSON.parse(userDataString);
            if (
                storedData.nationalId === nationalId &&
                storedData.phone === phone &&
                storedData.whatsapp === whatsapp
            ) {
                setScreen(Screen.ResetPassword);
            } else {
                setError('البيانات التي أدخلتها غير متطابقة مع سجلاتنا.');
            }
        } else {
            setError('لم يتم العثور على حساب. يرجى التأكد من البيانات أو إنشاء حساب جديد.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white p-6">
            <div className="flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">استعادة كلمة المرور</h2>
                <p className="text-center text-gray-600 text-sm mb-6">أدخل بياناتك للتحقق من هويتك.</p>
                
                <form className="space-y-4" onSubmit={handleVerification}>
                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                    <div>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={14}
                            placeholder="الرقم القومي"
                            value={nationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                     <div>
                        <input
                            type="tel"
                            placeholder="رقم الواتساب"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            required
                            className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[5px] shadow-sm text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300"
                        >
                            تحقق
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-auto text-center">
                <button onClick={() => setScreen(Screen.Login)} className="font-medium text-sm text-gray-600 hover:text-gray-800">
                    العودة لتسجيل الدخول
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;