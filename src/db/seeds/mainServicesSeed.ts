export interface MainServiceData {
  id: string;
  name: string;
  nameArabic: string | null;
  code: string | null;
  description: string | null;
  orderId: number;
  isActive: boolean;
}

export const MAIN_SERVICES_DATA: readonly MainServiceData[] = [
  {
    code: 'HVAC',
    description: 'Heating, Ventilation, and Air Conditioning services',
    id: 'a1b2c3d4-e5f6-4789-a012-345678901234',
    isActive: true,
    name: 'HVAC',
    nameArabic: 'التكييف والتهوية',
    orderId: 1,
  },
  {
    code: 'ELECTRICAL',
    description: 'Electrical systems maintenance and repair',
    id: 'b2c3d4e5-f6a7-4890-b123-456789012345',
    isActive: true,
    name: 'Electrical',
    nameArabic: 'الكهرباء',
    orderId: 2,
  },
  {
    code: 'PLUMBING',
    description: 'Plumbing services and water systems',
    id: 'c3d4e5f6-a7b8-4901-c234-567890123456',
    isActive: true,
    name: 'Plumbing',
    nameArabic: 'السباكة',
    orderId: 3,
  },
  {
    code: 'ELEVATOR',
    description: 'Elevator and lift maintenance',
    id: 'd4e5f6a7-b8c9-4012-d345-678901234567',
    isActive: true,
    name: 'Elevator',
    nameArabic: 'المصعد',
    orderId: 4,
  },
];

