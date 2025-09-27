export type FlowType = 'PHONE_AND_SELECTION' | 'PRINT_CARDS' | 'INQUIRY_ONLY' | 'INQUIRY_WITH_SUBTYPE';

export interface ServiceItem {
  name: string;
  price?: number;
  commission?: number;
}

export interface ServiceSubCategory {
    name: string;
    items: ServiceItem[];
}

export interface ServiceCategory {
  name:string;
  flowType: FlowType;
  items?: ServiceItem[];
  subCategories?: ServiceSubCategory[];
  notes?: string;
  subTypes?: string[]; // For INQUIRY_WITH_SUBTYPE
}

export interface ServiceProvider {
  name: string;
  logo: string;
  prefixes?: string[];
  categories: ServiceCategory[];
}

export const smartServicesData: ServiceProvider[] = [
  // فودافون
  {
    name: 'فودافون',
    logo: 'https://i.postimg.cc/pLJm5Yk3/11.png',
    prefixes: ['010'],
    categories: [
      { 
        name: 'فواتير فودافون', 
        flowType: 'INQUIRY_ONLY',
        notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.'
      },
      {
        name: 'تجديد فليكس على الطاير',
        flowType: 'INQUIRY_ONLY',
        notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.',
      },
      {
        name: 'باقات فليكس',
        flowType: 'PHONE_AND_SELECTION',
        items: [
          { name: 'فليكس 45', price: 64.29, commission: 0.64 },
          { name: 'فليكس 70', price: 100.00, commission: 1.00 },
          { name: 'فليكس 100', price: 142.86, commission: 1.43 },
          { name: 'فليكس 150', price: 214.29, commission: 2.14 },
          { name: 'فليكس 300', price: 428.57, commission: 4.29 },
        ],
      },
      {
        name: 'كروت فودافون',
        flowType: 'PRINT_CARDS',
        items: [
          { name: 'كارت 25', price: 25, commission: 0.25 },
          { name: 'كارت 50', price: 50, commission: 0.50 },
          { name: 'كارت 100', price: 100, commission: 1.00 },
        ],
      },
      {
        name: 'كروت فكة فودافون',
        flowType: 'PHONE_AND_SELECTION',
        items: [
          { name: 'فكة 13', price: 13, commission: 0.13 },
          { name: 'فكة 16.5', price: 16.5, commission: 0.17 },
          { name: 'فكة 19.5', price: 19.5, commission: 0.20 },
          { name: 'فكة 26', price: 26, commission: 0.26 },
        ],
      },
    ],
  },
  // أورانج
  {
    name: 'أورانج',
    logo: 'https://i.postimg.cc/25jVQbKy/12.png',
    prefixes: ['012'],
    categories: [
      { 
          name: 'فواتير اورنج', 
          flowType: 'INQUIRY_WITH_SUBTYPE',
          subTypes: ['فاتورة أورنج', 'فاتورة هوم أورنج'],
          notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.'
      },
      {
        name: 'كروت شحن اورنج',
        flowType: 'PRINT_CARDS',
        items: [
          { name: 'كارت 13', price: 13, commission: 0.13 },
          { name: 'كارت 16.5', price: 16.5, commission: 0.17 },
          { name: 'كارت 19.5', price: 19.5, commission: 0.20 },
          { name: 'كارت 26', price: 26, commission: 0.26 },
          { name: 'كارت 38', price: 38, commission: 0.38 },
          { name: 'كارت 45', price: 45, commission: 0.45 },
          { name: 'كارت 55', price: 55, commission: 0.55 },
          { name: 'كارت 65', price: 65, commission: 0.65 },
          { name: 'كارت 100', price: 100, commission: 1.00 },
        ],
      },
      {
        name: 'كارت الكبير',
        flowType: 'PHONE_AND_SELECTION',
        subCategories: [
            {
                name: 'كروت الكبير وحدات',
                items: [
                    { name: '13 وحدات', price: 13, commission: 0.13 },
                    { name: '16.5 وحدات', price: 16.5, commission: 0.17 },
                    { name: '19.5 وحدات', price: 19.5, commission: 0.20 },
                    { name: '26 وحدات', price: 26, commission: 0.26 },
                    { name: '38 وحدات', price: 38, commission: 0.38 },
                    { name: '45 وحدات', price: 45, commission: 0.45 },
                    { name: '55 وحدات', price: 55, commission: 0.55 },
                    { name: '65 وحدات', price: 65, commission: 0.65 },
                ]
            },
            {
                name: 'كروت الكبير ميجابيت',
                items: [
                    { name: '13 ميجابيت', price: 13, commission: 0.13 },
                    { name: '16.5 ميجابيت', price: 16.5, commission: 0.17 },
                    { name: '19.5 ميجابيت', price: 19.5, commission: 0.20 },
                    { name: '26 ميجابيت', price: 26, commission: 0.26 },
                    { name: '38 ميجابيت', price: 38, commission: 0.38 },
                    { name: '45 ميجابيت', price: 45, commission: 0.45 },
                    { name: '55 ميجابيت', price: 55, commission: 0.55 },
                    { name: '65 ميجابيت', price: 65, commission: 0.65 },
                ]
            }
        ]
      },
    ],
  },
  // إتصالات
  {
    name: 'إتصالات',
    logo: 'https://i.postimg.cc/d1L3XMvK/13.png',
    prefixes: ['011'],
    categories: [
      { name: 'فواتير اتصالات', flowType: 'INQUIRY_ONLY', notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.' },
      {
        name: 'أقوى كارت',
        flowType: 'PHONE_AND_SELECTION',
        subCategories: [
            { name: 'كروت الميكس', items: [ { name: 'ميكس 13', price: 13, commission: 0.13 }, { name: 'ميكس 16.5', price: 16.5, commission: 0.17 }, { name: 'ميكس 19.5', price: 19.5, commission: 0.20 }, { name: 'ميكس 26', price: 26, commission: 0.26 }, { name: 'ميكس 38', price: 38, commission: 0.38 }, { name: 'ميكس 65', price: 65, commission: 0.65 }] },
            { name: 'كروت الدقائق', items: [ { name: 'دقائق 13', price: 13, commission: 0.13 }, { name: 'دقائق 16.5', price: 16.5, commission: 0.17 }, { name: 'دقائق 19.5', price: 19.5, commission: 0.20 }, { name: 'دقائق 26', price: 26, commission: 0.26 }, { name: 'دقائق 38', price: 38, commission: 0.38 }, { name: 'دقائق 65', price: 65, commission: 0.65 }] },
            { name: 'كروت ميجا إكس', items: [ { name: 'ميجا إكس 13', price: 13, commission: 0.13 }, { name: 'ميجا إكس 16.5', price: 16.5, commission: 0.17 }, { name: 'ميجا إكس 19.5', price: 19.5, commission: 0.20 }, { name: 'ميجا إكس 26', price: 26, commission: 0.26 }] },
            { name: 'كروت السوشيال', items: [ { name: 'سوشيال 13', price: 13, commission: 0.13 }, { name: 'سوشيال 16.5', price: 16.5, commission: 0.17 }, { name: 'سوشيال 19.5', price: 19.5, commission: 0.20 }, { name: 'سوشيال 26', price: 26, commission: 0.26 }] },
            { name: 'كروت الاستريمينج', items: [ { name: 'ستريمينج 13', price: 13, commission: 0.13 }, { name: 'ستريمينج 16.5', price: 16.5, commission: 0.17 }, { name: 'ستريمينج 19.5', price: 19.5, commission: 0.20 }, { name: 'ستريمينج 26', price: 26, commission: 0.26 }] },
            { name: 'كروت التسلية', items: [ { name: 'تسلية 13', price: 13, commission: 0.13 }, { name: 'تسلية 16.5', price: 16.5, commission: 0.17 }, { name: 'تسلية 19.5', price: 19.5, commission: 0.20 }, { name: 'تسلية 26', price: 26, commission: 0.26 }] },
        ]
      },
      {
        name: 'دماغ تانية',
        flowType: 'PHONE_AND_SELECTION',
        items: [
            { name: 'دماغ تانية 30', price: 30, commission: 0.30 },
            { name: 'دماغ تانية 40', price: 40, commission: 0.40 },
            { name: 'دماغ تانية 55', price: 55, commission: 0.55 },
            { name: 'دماغ تانية 70', price: 70, commission: 0.70 },
            { name: 'دماغ تانية 90', price: 90, commission: 0.90 },
            { name: 'دماغ تانية 110', price: 110, commission: 1.10 },
            { name: 'دماغ تانية 140', price: 140, commission: 1.40 },
            { name: 'دماغ تانية 145', price: 145, commission: 1.45 },
            { name: 'دماغ تانية 180', price: 180, commission: 1.80 },
            { name: 'دماغ تانية 235', price: 235, commission: 2.35 },
        ],
      },
       {
        name: 'باقات حكاية',
        flowType: 'PHONE_AND_SELECTION',
        items: [
            { name: 'حكاية 25', price: 25, commission: 0.25 },
            { name: 'حكاية 40', price: 40, commission: 0.40 },
            { name: 'حكاية 45', price: 45, commission: 0.45 },
            { name: 'حكاية 60', price: 60, commission: 0.60 },
            { name: 'حكاية 80', price: 80, commission: 0.80 },
            { name: 'حكاية 105', price: 105, commission: 1.05 },
            { name: 'حكاية 155', price: 155, commission: 1.55 },
            { name: 'حكاية 235', price: 235, commission: 2.35 },
        ],
      },
      {
        name: 'كروت اتصالات',
        flowType: 'PRINT_CARDS',
        items: [
          { name: 'كارت 13', price: 13, commission: 0.13 },
          { name: 'كارت 16.5', price: 16.5, commission: 0.17 },
          { name: 'كارت 19.5', price: 19.5, commission: 0.20 },
          { name: 'كارت 26', price: 26, commission: 0.26 },
          { name: 'كارت 38', price: 38, commission: 0.38 },
          { name: 'كارت 39', price: 39, commission: 0.39 },
          { name: 'كارت 65', price: 65, commission: 0.65 },
          { name: 'كارت 100', price: 100, commission: 1.00 },
        ],
      },
    ],
  },
  // وي
  {
    name: 'وي',
    logo: 'https://i.postimg.cc/26MyNH8L/14.png',
    prefixes: ['015'],
    categories: [
      { name: 'فواتير وي', flowType: 'INQUIRY_ONLY', notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.' },
      {
        name: 'كروت شحن وي',
        flowType: 'PRINT_CARDS',
        items: [
          { name: 'كارت 13', price: 13, commission: 0.13 },
          { name: 'كارت 16.5', price: 16.5, commission: 0.17 },
          { name: 'كارت 19.5', price: 19.5, commission: 0.20 },
          { name: 'كارت 26', price: 26, commission: 0.26 },
          { name: 'كارت 38', price: 38, commission: 0.38 },
          { name: 'كارت 40', price: 40, commission: 0.40 },
          { name: 'كارت 50', price: 50, commission: 0.50 },
          { name: 'كارت 60', price: 60, commission: 0.60 },
          { name: 'كارت 75', price: 75, commission: 0.75 },
          { name: 'كارت 100', price: 100, commission: 1.00 },
          { name: 'كارت 150', price: 150, commission: 1.50 },
        ],
      },
    ],
  },
  // خدمات إضافية
  {
    name: 'حوكمة تشغيل الهاتف',
    logo: 'https://i.postimg.cc/B6hdt6jd/2.png',
    categories: [{ name: 'حوكمة تشغيل الهاتف', flowType: 'INQUIRY_ONLY', notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.', items: [{name: 'حوكمة', price: 0, commission: 0}] }],
  },
  {
    name: 'تحصيلات اتصالات',
    logo: 'https://i.postimg.cc/d1L3XMvK/13.png',
    categories: [{ name: 'تحصيلات اتصالات', flowType: 'INQUIRY_ONLY', notes: 'حسابك غير مفعل لهذه الخدمة. برجاء التفعيل من خلال خدمة العملاء.', items: [{name: 'تحصيلات', price: 0, commission: 0}] }],
  },
];
