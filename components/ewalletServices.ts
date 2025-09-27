
export type IdentifierType = 'phone' | 'instapay' | 'account_number' | 'text';
export type TransactionType = 'شحن' | 'سحب';

export interface EWalletService {
  name: string;
  provider: string;
  icon: string;
  identifierType: IdentifierType;
  prefixes?: string[]; // For phone validation
  placeholder: string;
}

export interface EWalletCategory {
  name: string;
  icon: string;
  services: EWalletService[];
}

export const ewalletCategories: EWalletCategory[] = [
  {
    name: 'محافظ شركات الاتصالات',
    icon: 'fas fa-sim-card',
    services: [
      { name: 'فودافون كاش', provider: 'Vodafone', icon: 'fas fa-mobile-alt', identifierType: 'phone', prefixes: ['010'], placeholder: 'رقم فودافون كاش' },
      { name: 'أورانج كاش', provider: 'Orange', icon: 'fas fa-mobile-alt', identifierType: 'phone', prefixes: ['012'], placeholder: 'رقم أورانج كاش' },
      { name: 'إتصالات كاش', provider: 'Etisalat', icon: 'fas fa-mobile-alt', identifierType: 'phone', prefixes: ['011'], placeholder: 'رقم إتصالات كاش' },
      { name: 'وي كاش', provider: 'WE', icon: 'fas fa-mobile-alt', identifierType: 'phone', prefixes: ['015'], placeholder: 'رقم وي كاش' },
    ],
  },
  {
    name: 'المحافظ البنكية',
    icon: 'fas fa-university',
    services: [
      { name: 'شحن المحفظة البنكية', provider: 'Bank Wallet', icon: 'fas fa-wallet', identifierType: 'account_number', placeholder: 'رقم المحفظة البنكية' },
      { name: 'سحب من المحفظة البنكية', provider: 'Bank Wallet', icon: 'fas fa-wallet', identifierType: 'account_number', placeholder: 'رقم المحفظة البنكية' },
    ],
  },
  {
    name: 'خدمات انستا باي',
    icon: 'fas fa-bolt',
    services: [
       { name: 'خدمات انستا باي', provider: 'InstaPay', icon: 'fas fa-bolt', identifierType: 'instapay', placeholder: 'رقم الهاتف أو username@instapay' },
    ],
  },
];