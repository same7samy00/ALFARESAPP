import React, { useState, useEffect } from 'react';
import { parseNationalId, NationalIdInfo } from '../../nationalIdParser';

interface StepProps {
    formData: { nationalId: string };
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const StepNationalId: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const [derivedInfo, setDerivedInfo] = useState<NationalIdInfo | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const id = formData.nationalId.trim();

        if (id.length < 14) {
            setDerivedInfo(null);
            setError('');
            return;
        }

        const { data, error } = parseNationalId(id);
        setDerivedInfo(data);
        setError(error || '');

    }, [formData.nationalId]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (derivedInfo && !error) {
            nextStep();
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center">الرقم القومي</h2>
            <div>
                <label htmlFor="nationalId" className="text-sm font-medium text-gray-700 text-right block mb-2">ادخل 14 رقمًا</label>
                <input
                    id="nationalId"
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={14}
                    placeholder="الرقم القومي"
                    value={formData.nationalId}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setFormData({ ...formData, nationalId: value });
                        }
                    }}
                    required
                    className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent tracking-widest"
                />
            </div>

            <div className="text-xs text-center text-gray-500 p-2 bg-yellow-50 border border-yellow-200 rounded-[5px]">
                <p>
                    <span className="font-bold">تلميح أمان:</span> لا تشارك رقمك القومي مع أي شخص. يمكن استخدامه لتغيير بيانات حسابك.
                </p>
            </div>
            
            {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}
            
            {derivedInfo && !error && (
                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-[5px] text-sm space-y-2 text-gray-700">
                    <div className="flex justify-between"><strong>تاريخ الميلاد:</strong> <span>{derivedInfo.birthDate}</span></div>
                    <div className="flex justify-between"><strong>العمر:</strong> <span>{derivedInfo.age} سنة</span></div>
                    <div className="flex justify-between"><strong>النوع:</strong> <span>{derivedInfo.gender}</span></div>
                    <div className="flex justify-between"><strong>المحافظة:</strong> <span>{derivedInfo.governorate}</span></div>
                </div>
            )}

            <div className="flex gap-4 pt-2">
                <button type="button" onClick={prevStep} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-sm text-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">السابق</button>
                <button type="submit" className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50" disabled={!derivedInfo || !!error}>التالي</button>
            </div>
        </form>
    );
};

export default StepNationalId;