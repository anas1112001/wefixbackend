export interface BranchSeedData {
  branchTitle: string;
  branchNameArabic: string | null;
  branchNameEnglish: string | null;
  branchRepresentativeName: string | null;
  representativeMobileNumber: string | null;
  representativeEmailAddress: string | null;
  companyId: string; // Will be set dynamically from existing companies
  teamLeaderLookupId: string | null; // Will be set dynamically from TEAM_LEADER lookups
  isActive: boolean;
}

export const BRANCHES_DATA: readonly Omit<BranchSeedData, 'companyId' | 'teamLeaderLookupId'>[] = [
  {
    branchTitle: 'Main Branch - Amman',
    branchNameArabic: 'الفرع الرئيسي - عمان',
    branchNameEnglish: 'Main Branch - Amman',
    branchRepresentativeName: 'Ahmad Al-Mansouri',
    representativeMobileNumber: '+962791234567',
    representativeEmailAddress: 'ahmad.mansouri@example.com',
    isActive: true,
  },
  {
    branchTitle: 'North Branch - Irbid',
    branchNameArabic: 'الفرع الشمالي - إربد',
    branchNameEnglish: 'North Branch - Irbid',
    branchRepresentativeName: 'Sara Al-Khatib',
    representativeMobileNumber: '+962792345678',
    representativeEmailAddress: 'sara.khatib@example.com',
    isActive: true,
  },
  {
    branchTitle: 'South Branch - Aqaba',
    branchNameArabic: 'الفرع الجنوبي - العقبة',
    branchNameEnglish: 'South Branch - Aqaba',
    branchRepresentativeName: 'Mohammed Al-Zahra',
    representativeMobileNumber: '+962793456789',
    representativeEmailAddress: 'mohammed.zahra@example.com',
    isActive: true,
  },
  {
    branchTitle: 'East Branch - Zarqa',
    branchNameArabic: 'الفرع الشرقي - الزرقاء',
    branchNameEnglish: 'East Branch - Zarqa',
    branchRepresentativeName: 'Fatima Al-Rashid',
    representativeMobileNumber: '+962794567890',
    representativeEmailAddress: 'fatima.rashid@example.com',
    isActive: false,
  },
];

