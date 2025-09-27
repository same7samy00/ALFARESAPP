
import React, { useState, useEffect } from 'react';
import { Screen } from '../types';
import TogglePasswordIcon from './icons/TogglePasswordIcon';

interface LoginScreenProps {
  setScreen: (screen: Screen) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setScreen }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedPhone = localStorage.getItem('rememberedPhone');
    if (rememberedPhone) {
        setPhone(rememberedPhone);
        setRememberMe(true);
    }
  }, []);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    if (isChecked) {
        localStorage.setItem('rememberedPhone', phone);
    } else {
        localStorage.removeItem('rememberedPhone');
    }
  };

  useEffect(() => {
    if (rememberMe) {
        localStorage.setItem('rememberedPhone', phone);
    }
  }, [phone, rememberMe]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const performLogin = () => {
        if (rememberMe) {
            localStorage.setItem('rememberedPhone', phone);
        } else {
            localStorage.removeItem('rememberedPhone');
        }
        setScreen(Screen.Home);
    };

    // Admin Login Check
    if (phone === '0000' && password === '0000') {
        performLogin();
        return;
    }

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.phone === phone && userData.password === password) {
            performLogin();
        } else {
            setError('رقم الهاتف أو كلمة المرور غير صحيحة.');
        }
    } else {
        setError('لم يتم العثور على حساب. يرجى إنشاء حساب أولاً.');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">مرحباً بعودتك!</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <div>
              <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
          </div>
          <div className="relative">
              <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pr-4 pl-12 py-2.5 text-right bg-gray-100 border-2 border-transparent rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
          <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember-me" className="mr-2 block text-gray-900">
                  تذكرني
              </label>
              </div>
              <button
                type="button"
                onClick={() => setScreen(Screen.ForgotPassword)}
                className="font-medium text-primary hover:text-[#0053c7]"
              >
                هل نسيت كلمة المرور؟
              </button>
          </div>
          <div>
              <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[5px] shadow-sm text-md font-medium text-white bg-gradient-to-r from-primary to-[#0053c7] hover:scale-105 transform transition-transform duration-300"
              >
              تسجيل الدخول
              </button>
          </div>
          </form>
      </div>
      <div className="text-center text-sm text-gray-600 mt-auto pt-4">
        مستخدم جديد؟{' '}
        <button onClick={() => setScreen(Screen.Register)} className="font-medium text-primary hover:text-[#0053c7]">
          سجل الآن
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
