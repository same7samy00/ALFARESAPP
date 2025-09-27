
import React from 'react';

interface StepProps {
    formData: { phone: string };
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const StepPhoneNumber: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.phone.trim().length >= 10) { // Basic validation
            nextStep();
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">رقم الهاتف</h2>
            <div>
                <label htmlFor="phone" className="text-sm font-medium text-gray-700 text-right block mb-2">سيتم استخدامه لتسجيل الدخول</label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>
            <div className="flex gap-4">
                <button type="button" onClick={prevStep} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-sm text-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">السابق</button>
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50" disabled={formData.phone.trim().length < 10}>التالي</button>
            </div>
        </form>
    );
};

export default StepPhoneNumber;