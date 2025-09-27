
import React from 'react';

interface RegistrationProgressProps {
    currentStep: number;
    totalSteps: number;
}

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ currentStep, totalSteps }) => {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="mb-6">
            <p className="text-center text-sm font-semibold text-gray-600 mb-2">
                خطوة {currentStep} من {totalSteps}
            </p>
            <div className="w-full bg-gray-200 rounded-[5px] h-2.5">
                <div 
                    className="bg-primary h-2.5 rounded-[5px] transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default RegistrationProgress;