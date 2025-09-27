const governorates: { [key: string]: string } = {
    '01': 'القاهرة', '02': 'الإسكندرية', '03': 'بورسعيد', '04': 'السويس',
    '11': 'دمياط', '12': 'الدقهلية', '13': 'الشرقية', '14': 'القليوبية',
    '15': 'كفر الشيخ', '16': 'الغربية', '17': 'المنوفية', '18': 'البحيرة',
    '19': 'الإسماعيلية', '21': 'الجيزة', '22': 'بني سويف', '23': 'الفيوم',
    '24': 'المنيا', '25': 'أسيوط', '26': 'سوهاج',
    '27': 'قنا', '28': 'أسوان', '29': 'الأقصر',
    '31': 'البحر الأحمر', '32': 'الوادي الجديد', '33': 'مطروح',
    '34': 'شمال سيناء', '35': 'جنوب سيناء', '88': 'خارج مصر'
};

export interface NationalIdInfo {
    birthDate: string;
    age: number;
    gender: string;
    governorate: string;
}

export const parseNationalId = (id: string): { data: NationalIdInfo | null; error: string | null } => {
    if (id.length !== 14) {
        return { data: null, error: null }; // No error if not 14 digits yet
    }

    try {
        const centuryDigit = parseInt(id.substring(0, 1));
        if (centuryDigit !== 2 && centuryDigit !== 3) {
            throw new Error("الرقم الأول يجب أن يكون 2 أو 3.");
        }

        const year = parseInt(id.substring(1, 3));
        const month = parseInt(id.substring(3, 5));
        const day = parseInt(id.substring(5, 7));
        const fullYear = (centuryDigit === 2 ? 1900 : 2000) + year;

        const birthDateObj = new Date(fullYear, month - 1, day);
        // Check for invalid date (e.g., month 13, day 32) and if date is in the future
        if (birthDateObj.getFullYear() !== fullYear || birthDateObj.getMonth() !== (month - 1) || birthDateObj.getDate() !== day || birthDateObj > new Date()) {
            throw new Error("تاريخ الميلاد في الرقم القومي غير صحيح.");
        }

        const birthDate = `${day}/${month}/${fullYear}`;

        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        const governorateCode = id.substring(7, 9);
        const governorate = governorates[governorateCode];
        if (!governorate) {
            throw new Error("كود المحافظة غير صحيح.");
        }

        const genderDigit = parseInt(id.substring(12, 13));
        const gender = genderDigit % 2 !== 0 ? 'ذكر' : 'أنثى';

        return { data: { birthDate, age, gender, governorate }, error: null };
    } catch (e: any) {
        return { data: null, error: e.message || 'الرقم القومي غير صالح.' };
    }
};
