
import React from 'react';
import { Screen } from '../../types';

interface BottomNavProps {
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setScreen }) => {
  const navItems = [
    { screen: Screen.Home, icon: 'fas fa-home', label: 'الرئيسية' },
    { screen: Screen.History, icon: 'fas fa-history', label: 'السجل' },
    { screen: Screen.Offers, icon: 'fas fa-tag', label: 'العروض' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 p-2 flex justify-around items-center sticky bottom-0 z-20 shrink-0 h-16">
      {navItems.map(item => {
        const isActive = activeScreen === item.screen;
        return (
          <button
            key={item.label}
            onClick={() => setScreen(item.screen)}
            className={`flex flex-col items-center w-1/3 transition-colors ${isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
          >
            <i className={`${item.icon} text-xl mb-1`}></i>
            <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        );
      })}
    </footer>
  );
};

export default BottomNav;
