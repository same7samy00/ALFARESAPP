
import React, { useState } from 'react';
import { Screen } from '../types';
import TogglePasswordIcon from './icons/TogglePasswordIcon';

interface ResetPasswordScreenProps {
  setScreen: (screen: Screen) => void;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ setScreen }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = password.length >= 6;

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPasswordValid && passwordsMatch) {
            const userDataString = localStorage.getItem('userData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                userData.password = password;
                localStorage.setItem('userData', JSON.stringify(userData));

                setSuccessMessage('تم تغيير كلمة المرور بنجاح. سيتم توجيهك لتسجيل الدخول.');
                setTimeout(() => {
                    setScreen(Screen.Login);
                }, 2000);
            }
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-white p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">إنشاء كلمة مرور جديدة</h2>
            
            {successMessage ? (
                <p className="text-center text-green-600 font-semibold p-3 bg-green-100 rounded-[5px]">{successMessage}</p>
            ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="relative">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="كلمة المرور الجديدة (6 حروف على الأقل)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pr-4 pl-12 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                            <TogglePasswordIcon isVisible={passwordVisible} className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            placeholder="تأكيد كلمة المرور الجديدة"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={`w-full pr-4 pl-12 py-2.5 text-right bg-gray-100 border-2 rounded-[5px] focus:outline-none focus:ring-2 focus:border-transparent ${confirmPassword && !passwordsMatch ? 'border-red-500 ring-red-500' : 'border-transparent ring-primary'}`}
                        />
                        <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
                            <TogglePasswordIcon isVisible={confirmPasswordVisible} className="w-6 h-6" />
                        </button>
                    </div>
                    {confirmPassword && !passwordsMatch && <p className="text-red-500 text-xs text-center mt-1">كلمتا المرور غير متطابقتين</p>}

                    <div className="pt-4">
                        <button type="submit" disabled={!isPasswordValid || !passwordsMatch} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50">
                            حفظ كلمة المرور
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ResetPasswordScreen;