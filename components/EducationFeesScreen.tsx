
import React, { useState } from 'react';
import { Screen } from '../types';
import { educationServicesData, EducationCategory, EducationSubCategory } from './educationServices';

interface EducationFeesScreenProps {
  setScreen: (screen: Screen) => void;
}

const EducationFeesScreen: React.FC<EducationFeesScreenProps> = ({ setScreen }) => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<EducationCategory | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<EducationSubCategory | null>(null);

    const goBack = () => {
        if (step === 3) {
            setSelectedSubCategory(null);
            setStep(2);
        } else if (step === 2) {
            setSelectedCategory(null);
            setStep(1);
        } else {
            setScreen(Screen.Home);
        }
    };
    
    const handleCategorySelect = (category: EducationCategory) => {
        setSelectedCategory(category);
        setStep(2);
    };
    
    const handleSubCategorySelect = (subCategory: EducationSubCategory) => {
        setSelectedSubCategory(subCategory);
        setStep(3);
    };
    
    const getHeaderTitle = () => {
        if (step === 3 && selectedSubCategory) return selectedSubCategory.name;
        if (step === 2 && selectedCategory) return selectedCategory.name;
        return 'رسوم التعليم';
    };

    const renderHeader = (title: string) => (
        <header className="relative bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20 shrink-0 h-20">
           <button onClick={goBack} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-[5px] text-gray-600 hover:text-primary hover:bg-primary-light transition-colors" aria-label="Back">
               <i className="fas fa-arrow-right text-xl"></i>
           </button>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/6">
               <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap text-center truncate">{title}</h1>
           </div>
           <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="Logo" className="h-10 w-auto"/>
       </header>
    );
    
    const ActivationNotice = () => (
      <div className="bg-yellow-100 border-b-2 border-yellow-200 text-yellow-800 text-sm font-semibold p-3 w-full shrink-0 flex items-center justify-center gap-4">
          <i className="fas fa-exclamation-triangle"></i>
          <span>الحساب غير مفعل لهذه الخدمة</span>
          <a href="https://wa.me/201013803653" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 transition-colors" aria-label="Contact support on WhatsApp">
              <i className="fab fa-whatsapp text-2xl"></i>
          </a>
      </div>
    );

    const renderStepContent = () => {
        switch (step) {
            case 1: // Main Category Selection
                return (
                    <main className="flex-grow p-4 overflow-y-auto">
                        <p className="text-center text-gray-600 mb-6">اختر نوع الخدمة التعليمية</p>
                        <div className="flex flex-col gap-3">
                            {educationServicesData.map(category => (
                                <div key={category.name} onClick={() => handleCategorySelect(category)} className="bg-white p-4 rounded-[5px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 flex items-center justify-center bg-primary-light rounded-[5px] text-primary">
                                            <i className={`${category.icon} text-xl`}></i>
                                        </div>
                                        <p className="font-semibold text-gray-700 text-md">{category.name}</p>
                                    </div>
                                    <i className="fas fa-chevron-left text-gray-400"></i>
                                </div>
                            ))}
                        </div>
                    </main>
                );
            
            case 2: // Sub-list (either final items or sub-categories)
                if (!selectedCategory) return null;
                // If it has sub-categories, show them
                if (selectedCategory.subCategories) {
                    return (
                        <main className="flex-grow p-4 overflow-y-auto">
                            <p className="text-center text-gray-600 mb-6">اختر الفئة</p>
                             <div className="flex flex-col gap-3">
                                {selectedCategory.subCategories.map(subCat => (
                                    <div key={subCat.name} onClick={() => handleSubCategorySelect(subCat)} className="bg-white p-4 rounded-[5px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border flex justify-between items-center">
                                        <p className="font-semibold text-gray-700 text-md">{subCat.name}</p>
                                        <i className="fas fa-chevron-left text-gray-400"></i>
                                    </div>
                                ))}
                            </div>
                        </main>
                    );
                }
                // Otherwise, show final items (disabled)
                return (
                    <main className="flex-grow p-4 overflow-y-auto">
                        <p className="text-center text-gray-600 mb-6">الخدمات المتاحة</p>
                         <div className="flex flex-col gap-3">
                            {selectedCategory.items?.map(item => (
                                <div key={item.name} className="bg-gray-50 p-4 rounded-[5px] border flex justify-between items-center opacity-70 cursor-not-allowed">
                                    <p className="font-semibold text-gray-500 text-md">{item.name}</p>
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                            ))}
                        </div>
                    </main>
                );

            case 3: // Final items from a sub-category
                if (!selectedSubCategory) return null;
                return (
                     <main className="flex-grow p-4 overflow-y-auto">
                        <p className="text-center text-gray-600 mb-6">الخدمات المتاحة</p>
                         <div className="flex flex-col gap-3">
                            {selectedSubCategory.items.map(item => (
                                <div key={item.name} className="bg-gray-50 p-4 rounded-[5px] border flex justify-between items-center opacity-70 cursor-not-allowed">
                                    <p className="font-semibold text-gray-500 text-md">{item.name}</p>
                                    <i className="fas fa-lock text-gray-400"></i>
                                </div>
                            ))}
                        </div>
                    </main>
                );

            default:
                return <p>خطأ</p>;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100">
            {renderHeader(getHeaderTitle())}
            <ActivationNotice />
            {renderStepContent()}
        </div>
    );
};

export default EducationFeesScreen;
