
import React, { useState } from 'react';
import { Screen } from '../types';
import RegistrationProgress from './register/RegistrationProgress';
import StepName from './register/StepName';
import StepNationalId from './register/StepNationalId';
import StepPhoneNumber from './register/StepPhoneNumber';
import StepWhatsAppNumber from './register/StepWhatsAppNumber';
import StepPassword from './register/StepPassword';

interface RegisterScreenProps {
  setScreen: (screen: Screen) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ setScreen }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        nationalId: '',
        phone: '',
        whatsapp: '',
        password: '',
    });
    
    const totalSteps = 5;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    
    const handleFinalSubmit = (password: string) => {
        const accountCode = Math.floor(100000 + Math.random() * 900000).toString();
        const creationDate = new Date().toLocaleDateString('ar-EG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const finalData = { 
            ...formData, 
            password,
            accountCode,
            creationDate
        };
        localStorage.setItem('userData', JSON.stringify(finalData));
        setScreen(Screen.RegistrationSuccess);
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return <StepName formData={formData} setFormData={setFormData} nextStep={nextStep} />;
            case 2:
                return <StepNationalId formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <StepPhoneNumber formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <StepWhatsAppNumber formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 5:
                return <StepPassword submit={handleFinalSubmit} prevStep={prevStep} />;
            default:
                return <p>خطأ في الخطوات</p>;
        }
    }

    return (
        <div className="p-6 flex flex-col h-full bg-white">
            <div className="flex-grow">
                <RegistrationProgress currentStep={step} totalSteps={totalSteps} />
                <div className="py-8">
                    {renderStep()}
                </div>
            </div>
            <div className="mt-auto text-center text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <button onClick={() => setScreen(Screen.Login)} className="font-medium text-primary hover:text-[#0053c7]">
                    تسجيل الدخول
                </button>
            </div>
        </div>
    );
};

export default RegisterScreen;