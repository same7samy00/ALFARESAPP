
export interface TransportationService {
  name: string;
}

export interface TransportationCategory {
  name: string;
  icon: string;
  items: TransportationService[];
}

export const transportationServicesData: TransportationCategory[] = [
  {
    name: 'تذاكر سفر',
    icon: 'fas fa-ticket-alt',
    items: [
      { name: 'تذاكر السكة الحديد' },
      { name: 'جو باص' },
      { name: 'مصر للطيران' },
      { name: 'طيران النيل' },
      { name: 'إير كايرو' },
      { name: 'العربية للطيران' },
      { name: 'بلو باص Bluebus' },
      { name: 'الحصان الذهبي' },
    ],
  },
  {
    name: 'خدمات النقل التشاركي',
    icon: 'fas fa-car',
    items: [
      { name: 'إيداع كابتن كريم 763' },
      { name: 'إيداع عميل كريم 772' },
      { name: 'إيداع حالا' },
      { name: 'سويفل Swvl' },
      { name: 'إيداع كابتن سوفيل' },
      { name: 'مستحقات أوبر باص' },
      { name: 'تحصيلات شركة وينجو' },
    ],
  },
  {
    name: 'خدمات أخرى',
    icon: 'fas fa-route',
    items: [
      { name: 'أتوبيسي (العاصمة)' },
      { name: 'مواصلات مصر' },
      { name: 'راجع فاضي سائق' },
      { name: 'راجع فاضي عميل' },
      { name: 'ترافل يلا للسياحة' },
    ],
  },
];