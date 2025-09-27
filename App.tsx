
import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';
import RegistrationSuccessScreen from './components/RegistrationSuccessScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import ResetPasswordScreen from './components/ResetPasswordScreen';
import SplashScreen from './components/SplashScreen';
import AuthHeader from './components/common/AuthHeader';
import MobileRechargeScreen from './components/MobileRechargeScreen';
import SmartRechargeScreen from './components/SmartRechargeScreen';
import InternetLandlineScreen from './components/InternetLandlineScreen';
import EWalletScreen from './components/EWalletScreen';
import EducationFeesScreen from './components/EducationFeesScreen';
import PublicUtilitiesScreen from './components/PublicUtilitiesScreen';
import FinancialTransactionsScreen from './components/FinancialTransactionsScreen';
import InsuranceServicesScreen from './components/InsuranceServicesScreen';
import TransportationTourismScreen from './components/TransportationTourismScreen';
import SubscriptionsDonationsScreen from './components/SubscriptionsDonationsScreen';
import OnlineServicesScreen from './components/OnlineServicesScreen';
import InstallmentsLoansScreen from './components/InstallmentsLoansScreen';
import GovernmentServicesScreen from './components/GovernmentServicesScreen';
import MiscellaneousServicesScreen from './components/MiscellaneousServicesScreen';
import MerchantServicesScreen from './components/MerchantServicesScreen';
import RequestSimScreen from './components/RequestSimScreen';
import RequestSimResultScreen from './components/RequestSimResultScreen';
import RequestMachineScreen from './components/RequestMachineScreen';
import RequestMachineFormScreen from './components/RequestMachineFormScreen';
import RequestServiceScreen from './components/RequestServiceScreen';
import RequestServiceResultScreen from './components/RequestServiceResultScreen';
import LendMeServiceScreen from './components/LendMeServiceScreen';
import LendMeServiceResultScreen from './components/LendMeServiceResultScreen';
import HistoryScreen from './components/HistoryScreen';
import OffersScreen from './components/OffersScreen';
import NotificationsScreen from './components/NotificationsScreen';
import AccountScreen from './components/AccountScreen';
import BottomNav from './components/common/BottomNav';
import CashInScreen from './components/CashInScreen';
import CashInFormScreen from './components/CashInFormScreen';
import CashOutScreen from './components/CashOutScreen';
import CashOutFormScreen from './components/CashOutFormScreen';
import CashOutResultScreen from './components/CashOutResultScreen';
import CashInPendingScreen from './components/CashInPendingScreen';
import FAQScreen from './components/FAQScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LockScreen from './components/LockScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SplashScreen);
  const [screenProps, setScreenProps] = useState<any>({});
  const [isLocked, setIsLocked] = useState(false);

  const navigate = (screen: Screen, props: any = {}) => {
    setScreenProps(props);
    setCurrentScreen(screen);
  };

  useEffect(() => {
    const isUserLoggedIn = () => !!localStorage.getItem('userData');
    
    const handleVisibilityChange = () => {
      const loggedOutScreens = [
        Screen.SplashScreen, Screen.Onboarding, Screen.Welcome, 
        Screen.Login, Screen.Register, Screen.ForgotPassword, Screen.ResetPassword
      ];
      
      if (!isUserLoggedIn() || loggedOutScreens.includes(currentScreen)) {
        return;
      }
      
      if (document.visibilityState === 'hidden') {
        localStorage.setItem('appHiddenTimestamp', Date.now().toString());
      } else if (document.visibilityState === 'visible') {
        const hiddenTimestamp = localStorage.getItem('appHiddenTimestamp');
        if (hiddenTimestamp) {
          const elapsed = Date.now() - parseInt(hiddenTimestamp, 10);
          if (elapsed > 300000) { // 5 minutes
            setIsLocked(true);
          }
          localStorage.removeItem('appHiddenTimestamp');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentScreen]);

  useEffect(() => {
    const hiddenTimestamp = localStorage.getItem('appHiddenTimestamp');
    if (hiddenTimestamp) {
        const elapsed = Date.now() - parseInt(hiddenTimestamp, 10);
        if (elapsed > 300000 && !!localStorage.getItem('userData')) {
             const loggedOutScreens = [
                Screen.SplashScreen, Screen.Onboarding, Screen.Welcome, 
                Screen.Login, Screen.Register, Screen.ForgotPassword, Screen.ResetPassword
             ];
             if (!loggedOutScreens.includes(currentScreen)) {
                 setIsLocked(true);
             }
        }
        localStorage.removeItem('appHiddenTimestamp');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberedPhone');
    localStorage.removeItem('appHiddenTimestamp');
    setIsLocked(false);
    navigate(Screen.Welcome);
  };

  useEffect(() => {
    if (currentScreen === Screen.SplashScreen) {
        const timer = setTimeout(() => {
            const hasOnboarded = localStorage.getItem('hasOnboarded');
            if (!hasOnboarded) {
                navigate(Screen.Onboarding);
            } else {
                const userDataString = localStorage.getItem('userData');
                if (userDataString) {
                    navigate(Screen.Login);
                } else {
                    navigate(Screen.Welcome);
                }
            }
        }, 3000); // Splash screen duration: 3 seconds

        return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const screensWithAuthHeader = [
    Screen.Welcome,
    Screen.Login,
    Screen.Register,
    Screen.RegistrationSuccess,
    Screen.ForgotPassword,
    Screen.ResetPassword,
  ];
  const showAuthHeader = screensWithAuthHeader.includes(currentScreen);
  
  const screensWithBottomNav = [Screen.Home, Screen.History, Screen.Offers];
  const showBottomNav = screensWithBottomNav.includes(currentScreen) && !isLocked;

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SplashScreen:
        return <SplashScreen />;
      case Screen.Onboarding:
        return <OnboardingScreen setScreen={navigate} />;
      case Screen.Login:
        return <LoginScreen setScreen={navigate} />;
      case Screen.Register:
        return <RegisterScreen setScreen={navigate} />;
      case Screen.RegistrationSuccess:
        return <RegistrationSuccessScreen setScreen={navigate} />;
      case Screen.ForgotPassword:
        return <ForgotPasswordScreen setScreen={navigate} />;
      case Screen.ResetPassword:
        return <ResetPasswordScreen setScreen={navigate} />;
      case Screen.Home:
        return <HomeScreen setScreen={navigate} />;
       case Screen.MobileRecharge:
        return <MobileRechargeScreen setScreen={navigate} />;
      case Screen.SmartRecharge:
        return <SmartRechargeScreen setScreen={navigate} />;
      case Screen.InternetLandline:
        return <InternetLandlineScreen setScreen={navigate} />;
      case Screen.EWallet:
        return <EWalletScreen setScreen={navigate} />;
      case Screen.EducationFees:
        return <EducationFeesScreen setScreen={navigate} />;
      case Screen.PublicUtilities:
        return <PublicUtilitiesScreen setScreen={navigate} />;
      case Screen.FinancialTransactions:
        return <FinancialTransactionsScreen setScreen={navigate} />;
      case Screen.InsuranceServices:
        return <InsuranceServicesScreen setScreen={navigate} />;
      case Screen.TransportationTourism:
        return <TransportationTourismScreen setScreen={navigate} />;
      case Screen.SubscriptionsDonations:
        return <SubscriptionsDonationsScreen setScreen={navigate} />;
      case Screen.OnlineServices:
        return <OnlineServicesScreen setScreen={navigate} />;
      case Screen.InstallmentsLoans:
        return <InstallmentsLoansScreen setScreen={navigate} />;
      case Screen.GovernmentServices:
        return <GovernmentServicesScreen setScreen={navigate} />;
      case Screen.MiscellaneousServices:
        return <MiscellaneousServicesScreen setScreen={navigate} />;
      case Screen.MerchantServices:
        return <MerchantServicesScreen setScreen={navigate} />;
      case Screen.RequestSim:
        return <RequestSimScreen setScreen={navigate} {...screenProps} />;
      case Screen.RequestSimResult:
        return <RequestSimResultScreen setScreen={navigate} {...screenProps} />;
      case Screen.RequestMachine:
        return <RequestMachineScreen setScreen={navigate} {...screenProps} />;
      case Screen.RequestMachineForm:
        return <RequestMachineFormScreen setScreen={navigate} {...screenProps} />;
      case Screen.RequestService:
        return <RequestServiceScreen setScreen={navigate} {...screenProps} />;
      case Screen.RequestServiceResult:
        return <RequestServiceResultScreen setScreen={navigate} />;
      case Screen.LendMeService:
        return <LendMeServiceScreen setScreen={navigate} {...screenProps} />;
      case Screen.LendMeServiceResult:
        return <LendMeServiceResultScreen setScreen={navigate} {...screenProps} />;
      case Screen.History:
        return <HistoryScreen setScreen={navigate} />;
      case Screen.Offers:
        return <OffersScreen setScreen={navigate} />;
      case Screen.Notifications:
        return <NotificationsScreen setScreen={navigate} />;
      case Screen.Account:
        return <AccountScreen setScreen={navigate} />;
      case Screen.CashIn:
        return <CashInScreen setScreen={navigate} {...screenProps} />;
      case Screen.CashInForm:
        return <CashInFormScreen setScreen={navigate} />;
      case Screen.CashOut:
        return <CashOutScreen setScreen={navigate} {...screenProps} />;
      case Screen.CashOutForm:
        return <CashOutFormScreen setScreen={navigate} {...screenProps} />;
      case Screen.CashOutResult:
        return <CashOutResultScreen setScreen={navigate} {...screenProps} />;
      case Screen.CashInPending:
        return <CashInPendingScreen setScreen={navigate} {...screenProps} />;
      case Screen.FAQ:
        return <FAQScreen setScreen={navigate} {...screenProps} />;
      case Screen.Welcome:
      default:
        return <WelcomeScreen setScreen={navigate} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
      <div className="relative w-full max-w-md h-screen max-h-[800px] overflow-hidden bg-white shadow-2xl rounded-[5px] border-4 border-gray-200 flex flex-col">
        {isLocked ? (
          <LockScreen onUnlock={() => setIsLocked(false)} onLogout={handleLogout} />
        ) : (
          <>
            {showAuthHeader && <AuthHeader />}
            <div key={currentScreen} className={`flex-grow overflow-y-auto ${showAuthHeader ? "animate-slide-in-up" : "h-full"}`}>
                {renderScreen()}
            </div>
            {showBottomNav && <BottomNav activeScreen={currentScreen} setScreen={navigate} />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
