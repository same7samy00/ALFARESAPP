import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary to-[#0053c7] h-52 rounded-b-[5px] flex flex-col items-center justify-center text-white pt-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-b-[5px]">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,144C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <img src="https://i.postimg.cc/NGNTSpWF/3.png" alt="الفارس للمدفوعات" className="h-24 w-auto" />
      </div>
    </div>
  );
};

export default AuthHeader;