
export const governorateCodes: { [key: string]: { name: string; length: number } } = {
    '02': { name: 'القاهرة / الجيزة', length: 8 },
    '03': { name: 'الإسكندرية', length: 7 },
    '013': { name: 'القليوبية', length: 7 },
    '040': { name: 'الغربية', length: 7 },
    '045': { name: 'البحيرة', length: 7 },
    '046': { name: 'مطروح', length: 7 },
    '047': { name: 'كفر الشيخ', length: 7 },
    '048': { name: 'المنوفية', length: 7 },
    '050': { name: 'الدقهلية', length: 7 },
    '055': { name: 'الشرقية', length: 7 },
    '057': { name: 'دمياط', length: 7 },
    '062': { name: 'السويس', length: 7 },
    '064': { name: 'الإسماعيلية', length: 7 },
    '065': { name: 'البحر الأحمر', length: 7 },
    '066': { name: 'بورسعيد', length: 7 },
    '068': { name: 'شمال سيناء', length: 7 },
    '069': { name: 'جنوب سيناء', length: 7 },
    '082': { name: 'بني سويف', length: 7 },
    '084': { name: 'الفيوم', length: 7 },
    '086': { name: 'المنيا', length: 7 },
    '088': { name: 'أسيوط', length: 7 },
    '092': { name: 'الوادي الجديد', length: 7 },
    '093': { name: 'سوهاج', length: 7 },
    '095': { name: 'الأقصر', length: 7 },
    '096': { name: 'قنا', length: 7 },
    '097': { name: 'أسوان', length: 7 },
};

export type ServiceFlowType = 'PHONE_AND_SELECTION' | 'INQUIRY_ONLY';

export interface ServicePackage {
  name: string;
  price: number;
  commissionRate: number; // e.g., 0.01 for 1%
}

export interface InternetService {
  name: string;
  provider: 'WE' | 'Orange' | 'Vodafone' | 'Etisalat' | 'Noor' | 'El-Fagr';
  icon: string;
  flowType: ServiceFlowType;
  packages?: ServicePackage[];
  notes?: string;
}

export const internetServicesData: InternetService[] = [
    {
        name: 'باقة الإنترنت الإضافية WE',
        provider: 'WE',
        icon: 'fas fa-wifi',
        flowType: 'PHONE_AND_SELECTION',
        packages: [
            { name: 'باقة 20GB', price: 66.28, commissionRate: 0.01 },
            { name: 'باقة 50GB', price: 100.40, commissionRate: 0.01 },
            { name: 'باقة 100GB', price: 200.80, commissionRate: 0.01 },
            { name: 'باقة 400GB', price: 803.20, commissionRate: 0.01 },
            { name: 'باقة 2000GB', price: 4016.00, commissionRate: 0.01 },
        ],
    },
    {
        name: 'إنترنت منزلي WE',
        provider: 'WE',
        icon: 'fas fa-wifi',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'فواتير التليفون الأرضي WE',
        provider: 'WE',
        icon: 'fas fa-phone-alt',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'أورانج DSL',
        provider: 'Orange',
        icon: 'fas fa-broadcast-tower',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'فودافون DSL',
        provider: 'Vodafone',
        icon: 'fas fa-signal',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'اتصالات DSL',
        provider: 'Etisalat',
        icon: 'fas fa-satellite-dish',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'فواتير نور DSL',
        provider: 'Noor',
        icon: 'fas fa-lightbulb',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
    {
        name: 'إنترنت الفجر',
        provider: 'El-Fagr',
        icon: 'fas fa-sun',
        flowType: 'INQUIRY_ONLY',
        notes: 'الاستعلامات غير متاحة لتوفير اكبر عمولة في مصر'
    },
];
