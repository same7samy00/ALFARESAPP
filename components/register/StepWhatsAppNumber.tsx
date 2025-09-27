import React, { useState } from 'react';
import { parseNationalId } from '../../nationalIdParser';

interface StepProps {
    formData: any;
    setFormData: (data: any) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const StepWhatsAppNumber: React.FC<StepProps> = ({ formData, setFormData, nextStep, prevStep }) => {
    const [isVerified, setIsVerified] = useState(false);
    
    const handleVerify = () => {
        const nationalIdInfo = parseNationalId(formData.nationalId).data;
        
        let details = '';
        if (nationalIdInfo) {
            details = `\n-- تفاصيل الرقم القومي --\nتاريخ الميلاد: ${nationalIdInfo.birthDate}\nالنوع: ${nationalIdInfo.gender}\nالمحافظة: ${nationalIdInfo.governorate}`;
        }

        const message = encodeURIComponent(
`طلب فتح حساب بتطبيق الفارس للمدفوعات
الاسم: ${formData.name}
رقم الهاتف: ${formData.phone}
الرقم القومي: ${formData.nationalId}${details}

برجاء تفعيل الحساب
رقم الواتساب: ${formData.whatsapp}`
        );
        const url = `https://wa.me/201013803653?text=${message}`;
        window.open(url, '_blank');
        setIsVerified(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isVerified) {
            nextStep();
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">رقم الواتساب</h2>
            <div>
                <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700 text-right block mb-2">يجب التحقق من الرقم للمتابعة</label>
                <input
                    id="whatsapp"
                    type="tel"
                    placeholder="ادخل رقم الواتساب"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    required
                    disabled={isVerified}
                    className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-200"
                />
            </div>

            {!isVerified ? (
                <button
                    type="button"
                    onClick={handleVerify}
                    disabled={!formData.whatsapp.trim()}
                    className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-green-500 hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
                >
                    تحقق عبر الواتساب
                </button>
            ) : (
                 <p className="text-center text-green-600 font-medium text-sm p-2 bg-green-100 rounded-[5px]">تم إرسال طلب التحقق. اضغط "التالي" للمتابعة.</p>
            )}

            <div className="flex gap-4">
                 <button type="button" onClick={prevStep} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-sm text-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all">السابق</button>
                 <button type="submit" disabled={!isVerified} className="w-full flex justify-center py-2.5 px-4 rounded-[5px] shadow-lg text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300 disabled:opacity-50">التالي</button>
            </div>
        </form>
    );
};

export default StepWhatsAppNumber;