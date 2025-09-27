
import React, { useState } from 'react';
import { Screen } from '../types';

interface FAQScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const faqs = [
    {
        question: 'كيف يمكنني تفعيل حسابي؟',
        answer: 'لتفعيل الحساب، يرجى التواصل مع خدمة العملاء عبر واتساب وإرسال صورة واضحة لبطاقة الرقم القومي (وجه وظهر). يلزم أيضاً وجود رصيد لا يقل عن 200 جنيه في حسابك لتأكيد الجدية واستكمال عملية التفعيل.'
    },
    {
        question: 'لماذا أحتاج لوجود رصيد لتفعيل الحساب؟',
        answer: 'يُطلب وجود رصيد مبدئي في الحساب لعدة أسباب هامة:\n\n1. **إثبات الجدية:** يساعد هذا الإجراء في التأكد من أن المستخدمين الجدد جادون في استخدام خدمات التطبيق.\n2. **تغطية التكاليف:** يساهم في تغطية التكاليف الإدارية الأولية لإنشاء وتأمين الحساب.\n3. **جاهزية الاستخدام:** يضمن أن يكون حسابك جاهزًا للاستخدام الفوري في جميع الخدمات المدفوعة بعد التفعيل مباشرة.\n\nنؤكد أن هذا الرصيد يظل ملكًا لك بالكامل ويمكنك استخدامه في أي عملية داخل التطبيق.'
    },
    {
        question: 'هل توجد رسوم على عمليات شحن أو سحب الكاش؟',
        answer: 'حاليًا، شحن الحساب عبر فودافون كاش مجاني تمامًا. كذلك، السحب عبر ماكينات الصراف الآلي لبنك مصر أو فودافون كاش يتم بدون أي رسوم.'
    },
    {
        question: 'ماذا أفعل إذا فشلت عملية الدفع؟',
        answer: 'أولاً، تأكد من وجود رصيد كافٍ في حسابك. يمكنك مراجعة تفاصيل العملية الفاشلة في "سجل العمليات". إذا استمرت المشكلة، يرجى التواصل مع الدعم الفني وتزويدهم بالرقم المرجعي للعملية.'
    },
    {
        question: 'هل بياناتي آمنة؟',
        answer: 'نعم، نحن نلتزم بأعلى معايير الأمان لحماية بياناتك الشخصية والمالية. التطبيق يعمل تحت إشراف ورقابة البنك المركزي المصري.'
    }
];

const FAQScreen: React.FC<FAQScreenProps> = ({ setScreen, origin }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first question by default

  const goBack = () => setScreen(origin || Screen.Account);
  
  const handleToggle = (index: number) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
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

  return (
    <div className="flex flex-col h-full bg-gray-100">
      {renderHeader('الأسئلة الشائعة')}
      <main className="flex-grow overflow-y-auto p-4 space-y-3">
        {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
                <div key={index} className="bg-white rounded-[5px] shadow-sm overflow-hidden">
                    <button onClick={() => handleToggle(index)} className="w-full text-right p-4 flex justify-between items-center">
                        <span className="font-bold text-gray-800">{faq.question}</span>
                        <i className={`fas fa-chevron-down text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="px-4 pb-4">
                            <p className="text-sm text-gray-600 border-t pt-3 whitespace-pre-line">{faq.answer}</p>
                        </div>
                    </div>
                </div>
            )
        })}
      </main>
    </div>
  );
};

export default FAQScreen;
