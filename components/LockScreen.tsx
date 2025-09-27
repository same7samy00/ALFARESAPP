
import React, { useState, useEffect } from 'react';
import TogglePasswordIcon from './icons/TogglePasswordIcon';

interface LockScreenProps {
  onUnlock: () => void;
  onLogout: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, onLogout }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserName(userData.name || 'المستخدم');
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (userData.password === password) {
        onUnlock();
      } else {
        setError('كلمة المرور غير صحيحة.');
        // Vibrate on error for feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(100);
        }
      }
    } else {
      // Should not happen if the app is locked, but handle it gracefully
      onLogout();
    }
  };

  return (
    <div className="absolute inset-0 bg-gray-50 z-50 flex flex-col items-center justify-center p-6 animate-slide-in-up">
      <div className="w-full max-w-sm text-center">
        <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <i className="fas fa-user-lock text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">مرحباً بعودتك، {userName}</h2>
        <p className="text-gray-600 mt-2">تم قفل التطبيق للحفاظ على أمان حسابك.</p>
        
        <form className="mt-8 space-y-4" onSubmit={handleUnlock}>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <div className="relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="أدخل كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full pr-4 pl-12 py-3 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
             <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label={passwordVisible ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              >
              <TogglePasswordIcon isVisible={passwordVisible} className="w-6 h-6" />
            </button>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-[5px] shadow-sm text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300"
          >
            فتح القفل
          </button>
        </form>
        
        <div className="mt-6">
          <button onClick={onLogout} className="font-medium text-sm text-gray-600 hover:text-primary">
            هل أنت لست {userName}؟ تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
