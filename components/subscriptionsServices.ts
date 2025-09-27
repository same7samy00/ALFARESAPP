
export interface SubscriptionService {
  name: string;
}

export interface SubscriptionSubCategory {
  name: string;
  items: SubscriptionService[];
}

export interface SubscriptionCategory {
  name: string;
  icon: string;
  items?: SubscriptionService[];
  subCategories?: SubscriptionSubCategory[];
}

export const subscriptionsServicesData: SubscriptionCategory[] = [
  {
    name: 'القنوات والترفيه',
    icon: 'fas fa-tv',
    items: [
      { name: 'قنوات beIN SPORTS' },
      { name: 'اشتراكات بي إن هل' },
    ],
  },
  {
    name: 'الجمعيات الخيرية والتبرعات',
    icon: 'fas fa-heart',
    items: [
      { name: 'جمعية الأورمان' },
      { name: 'مصر الخير' },
      { name: 'بنك الطعام المصري' },
      { name: 'واحة عمر للناس' },
      { name: 'التبرعات (عام)' },
      { name: 'كهرباء رسالة' },
    ],
  },
  {
    name: 'المستشفيات والخدمات الطبية',
    icon: 'fas fa-hospital',
    items: [
      { name: 'مستشفى شفاء الأورمان' },
      { name: 'معهد الأورام القومي' },
      { name: 'المستشفيات الجامعية' },
      { name: 'مستشفى 57357' },
      { name: 'مستشفى بهية' },
    ],
  },
  {
    name: 'مشاريع هيئة الحكماء المسلمين',
    icon: 'fas fa-stethoscope',
    items: [
      { name: 'مشروع علاج الأورام الطبية لهيئة الحكماء المسلمين' },
      { name: 'مشروع علاج أمراض العيون الطبية لهيئة الحكماء المسلمين' },
      { name: 'مشروع علاج أمراض العيون الطبية لهيئة الحكماء (أطباء)' },
      { name: 'مشروع علاج أمراض السرطان الطبية لهيئة الحكماء' },
    ],
  },
  {
    name: 'النقابات المهنية',
    icon: 'fas fa-user-tie',
    subCategories: [
      {
        name: 'نقابة الأطباء',
        items: [
          { name: 'نقابة الأطباء البشريين (اشتراك نقابة الأطباء)' },
          { name: 'نقابة الأطباء البشريين (تبرعات الأفراد)' },
        ],
      },
      {
        name: 'نقابة الصيادلة',
        items: [{ name: 'نقابة الصيادلة (اشتراك)' }],
      },
      {
        name: 'نقابة المهندسين',
        items: [
          { name: 'نقابة المهندسين (اشتراك شهري وتجديد)' },
          { name: 'نقابة المهندسين (للتبرعات والتدريب)' },
        ],
      },
      {
        name: 'نقابة المحامين',
        items: [
          { name: 'نقابة المحامين (فاتورة موحدة إلكترونيا)' },
          { name: 'نقابة المحامين (فايزة الرواتب الرسمية)' },
          { name: 'نقابة المحامين (باللغة الفلسطينية)' },
        ],
      },
      {
        name: 'نقابات أخرى',
        items: [
          { name: 'نقابة الصحفيين لخدمات الأعضاء' },
          { name: 'نقابة المساهمين (اشتراك شهري)' },
          { name: 'نقابة المحاسبين (باللغة الإنجليزية)' },
        ],
      },
    ],
  },
  {
    name: 'الخدمات الرياضية',
    icon: 'fas fa-running',
    items: [{ name: 'اشتراك نادي هيئة الرياضة بمدينة الملك عبدالله' }],
  },
  {
    name: 'خدمات أخرى',
    icon: 'fas fa-ellipsis-h',
    items: [
      { name: 'المصرية للاتصالات' },
      { name: 'العملة' },
      { name: 'سيستم للمساهمات' },
    ],
  },
];
