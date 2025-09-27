
export interface FinancialService {
  name: string;
}

export interface FinancialCategory {
  name: string;
  icon: string;
  items: FinancialService[];
}

export const financialServicesData: FinancialCategory[] = [
  {
    name: 'خدمات شحن الحسابات الإلكترونية',
    icon: 'fas fa-credit-card',
    items: [
      { name: 'شحن حساب فوري' },
      { name: 'شحن حساب أمان' },
      { name: 'شحن حساب كاش مصر' },
      { name: 'شحن حساب مصاري' },
      { name: 'شحن حساب بساطة' },
      { name: 'شحن حساب الأهلي ممكن' },
      { name: 'شحن حساب سداد' },
      { name: 'شحن حساب ضامن' },
      { name: 'شحن حساب خالص' },
      { name: 'شحن كاش يو' },
    ],
  },
  {
    name: 'خدمات الدفع الإلكتروني',
    icon: 'fas fa-mobile-alt',
    items: [
      { name: 'خالص باي' },
      { name: 'فوري باي' },
      { name: 'صرف باي ماكس Paymax' },
      { name: 'مدفوعات اكسبت' },
      { name: 'برميم كارد Premium Card' },
    ],
  },
  {
    name: 'خدمات الأعمال والتجارة',
    icon: 'fas fa-briefcase',
    items: [
      { name: 'سمارت بيزنيس (72959)' },
      { name: 'سمارت بيزنيس (73987)' },
      { name: 'تحصيلات حالا' },
      { name: 'أوليكس' },
      { name: 'جوميا - موردين' },
      { name: 'الفاتورة الإليكترونية' },
    ],
  },
  {
    name: 'خدمات بنك ناصر',
    icon: 'fas fa-university',
    items: [
      { name: 'استعلام نفقة بنك ناصر' },
      { name: 'تسديد نفقة بنك ناصر' },
    ],
  },
  {
    name: 'خدمات مصر المقاصة',
    icon: 'fas fa-file-invoice',
    items: [
      { name: 'سداد مطالبات مصر المقاصة' },
      { name: 'طلب خدمات مصر المقاصة' },
    ],
  },
];
