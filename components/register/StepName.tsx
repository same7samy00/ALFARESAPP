
import React, { useState } from 'react';

interface StepProps {
    formData: { name: string };
    setFormData: (data: any) => void;
    nextStep: () => void;
}

const StepName: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
    const [error, setError] = useState('');

    const isNameValid = (name: string): boolean => {
        return name.trim().split(/\s+/).filter(part => part.length > 0).length === 4;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNameValid(formData.name)) {
            setError('');
            nextStep();
        } else {
            setError('الاسم الكامل يجب أن يتكون من أربع مقاطع.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">الاسم الرباعي</h2>
            <div>
                 <label htmlFor="name" className="text-sm font-medium text-gray-700 text-right block mb-2">ادخل اسمك بالكامل</label>
                <input
                    id="name"
                    type="text"
                    placeholder="مثال: محمد أحمد علي محمود"
                    value={formData.name}
                    onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        setError(''); // Clear error on change
                    }}
                    required
                    className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {error && <p className="text-red-500 text-xs text-center mt-1">{error}</p>}
            </div>
            <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50"
                disabled={!isNameValid(formData.name)}
            >
                التالي
            </button>
        </form>
    );
};
export default StepName;