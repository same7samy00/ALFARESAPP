import React from 'react';

const SplashScreen: React.FC = () => {
    const rainDrops = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        style: {
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
        }
    }));

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0053c7] to-primary text-white overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                {rainDrops.map(drop => (
                    <img
                        key={drop.id}
                        src="https://i.postimg.cc/NGNTSpWF/3.png"
                        alt=""
                        className="rain-drop object-contain"
                        style={drop.style}
                    />
                ))}
            </div>

            <div className="relative z-10 text-center animate-fade-in-out">
                 <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="الفارس للمدفوعات" className="h-32 w-auto" />
            </div>
        </div>
    );
};

export default SplashScreen;