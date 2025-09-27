
import React, { useState } from 'react';
import { Screen } from '../types';

interface RequestMachineScreenProps {
  setScreen: (screen: Screen, props?: any) => void;
  origin?: Screen;
}

const machineImages = [
    'https://i.ibb.co/ymwGTt2F/1.webp',
    'https://i.ibb.co/9kXXTZpp/OIP-1.webp',
    'https://i.ibb.co/GfnXxZ1d/OIP-2.webp',
    'https://i.ibb.co/84KPTnbc/OIP.webp'
];

const specifications = [
  { icon: 'fas fa-mobile-alt', label: 'الشاشة', value: '5.99 بوصة تاتش' },
  { icon: 'fab fa-android', label: 'النظام', value: 'أندرويد 7.1' },
  { icon: 'fas fa-microchip', label: 'المعالج', value: 'رباعي النواة' },
  { icon: 'fas fa-memory', label: 'الذاكرة', value: '2 جيجا رام + 16 جيجا' },
  { icon: 'fas fa-camera', label: 'الكاميرا', value: '5 ميجا مع ماسح باركود' },
  { icon: 'fas fa-print', label: 'الطابعة', value: 'حرارية مدمجة (58مم)' },
  { icon: 'fas fa-wifi', label: 'الاتصال', value: '4G, واي فاي, بلوتوث, GPS' },
  { icon: 'fas fa-battery-full', label: 'البطارية', value: '2580mAh' },
];

const features = [
  { icon: 'fas fa-box-open', text: 'تأتي بالكرتونة مع الشاحن وضمان لمدة سنتين.' },
  { icon: 'fas fa-shipping-fast', text: 'توصيل لأي مكان في الجمهورية خلال 48 ساعة.' },
  { icon: 'fas fa-user-check', text: 'تجربة الماكينة مع المندوب قبل الاستلام.' },
  { icon: 'fas fa-cogs', text: 'تعمل على نظام الفارس، فوري، وأمان.' },
  { icon: 'fas fa-percent', text: 'أعلى عمولة في السوق (15 جنيه لكل 1000 جنيه) مع نظام الفارس.' },
  { icon: 'fas fa-credit-card', text: 'تدعم كل الكروت: كهرباء، مياه، بنكية، instaPay.' },
];

const RequestMachineScreen: React.FC<RequestMachineScreenProps> = ({ setScreen, origin }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const goBack = () => setScreen(origin || Screen.MerchantServices);
  const goToOrderForm = () => setScreen(Screen.RequestMachineForm, { origin });

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % machineImages.length);
  };

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + machineImages.length) % machineImages.length);
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
      {renderHeader('طلب ماكينة')}
      <main className="flex-grow overflow-y-auto">
        {/* Image Slider */}
        <div className="relative bg-white p-4">
            <img src={machineImages[currentImage]} alt="SUNMI V2 PRO" className="w-full h-64 object-contain rounded-[5px]"/>
            <button onClick={prevImage} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-50 transition-opacity">
                <i className="fas fa-chevron-left"></i>
            </button>
            <button onClick={nextImage} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-50 transition-opacity">
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>

        <div className="p-4 space-y-6">
            {/* Title and Price */}
            <div className="bg-white p-4 rounded-[5px] shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800">SUNMI V2 PRO</h2>
                <p className="text-3xl font-bold text-primary mt-2">4599 جنيه</p>
            </div>

            {/* Specifications */}
            <div className="bg-white p-4 rounded-[5px] shadow-sm">
                <h3 className="text-lg font-bold text-gray-700 mb-3">المواصفات الفنية</h3>
                <div className="grid grid-cols-2 gap-4">
                    {specifications.map(spec => (
                        <div key={spec.label} className="flex items-start gap-3">
                            <i className={`${spec.icon} text-primary text-lg w-5 text-center`}></i>
                            <div>
                                <p className="text-sm font-semibold text-gray-500">{spec.label}</p>
                                <p className="text-md font-bold text-gray-800">{spec.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
             {/* Features */}
            <div className="bg-white p-4 rounded-[5px] shadow-sm">
                <h3 className="text-lg font-bold text-gray-700 mb-3">أهم المميزات</h3>
                <ul className="space-y-3">
                   {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <i className={`${feature.icon} text-green-500 text-md mt-1 w-5 text-center`}></i>
                            <p className="text-sm text-gray-700">{feature.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </main>
      <footer className="p-4 bg-white border-t sticky bottom-0 shrink-0">
          <button onClick={goToOrderForm} className="w-full py-3 px-4 rounded-[5px] shadow-lg text-md font-bold text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300">
              اطلب الماكينة الآن
          </button>
      </footer>
    </div>
  );
};

export default RequestMachineScreen;
