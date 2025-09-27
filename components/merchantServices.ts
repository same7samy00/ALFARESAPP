
export interface MerchantService {
  name: string;
  description: string;
  icon: string;
}

export const merchantServicesData: MerchantService[] = [
  {
    name: 'طلب شريحة',
    description: 'شريحة مجانية مع إنترنت مجاني لاستخدام التطبيق فقط',
    icon: 'fas fa-sim-card',
  },
  {
    name: 'طلب ماكينة',
    description: 'ماكينة دفع إلكتروني لقبول المدفوعات',
    icon: 'fas fa-cash-register',
  },
  {
    name: 'الدعم الفني',
    description: 'تواصل مع فريق الدعم الفني',
    icon: 'fas fa-headset',
  },
  {
    name: 'طلب خدمة',
    description: 'أضف أي خدمة مدفوعات غير موجودة بالتطبيق',
    icon: 'fas fa-plus-circle',
  },
  {
    name: 'خدمة سلفني',
    description: 'تسلف حتى 5000 جنيه شهرياً بدون فوائد',
    icon: 'fas fa-money-bill-wave',
  },
];