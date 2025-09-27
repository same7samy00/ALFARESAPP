
import React, { useState } from 'react';
import TogglePasswordIcon from '../icons/TogglePasswordIcon';

interface StepProps {
    submit: (password: string) => void;
    prevStep: () => void;
}

const StepPassword: React.FC<StepProps> = ({ submit, prevStep }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const passwordsMatch = password === confirmPassword;
    const isPasswordValid = password.length >= 6;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPasswordValid && passwordsMatch) {
            submit(password);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">إنشاء كلمة المرور</h2>
            
            <div className="relative">
                <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="كلمة المرور (6 حروف على الأقل)"
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
                    placeholder="تأكيد كلمة المرور"
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

            <div className="flex gap-4 pt-4">
                <button type="button" onClick={prevStep} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-sm text-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">السابق</button>
                <button type="submit" disabled={!isPasswordValid || !passwordsMatch} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50">إنشاء حساب</button>
            </div>
        </form>
    );
};

export default StepPassword;