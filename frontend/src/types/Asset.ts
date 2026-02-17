export enum AssetCategory {
  COMPUTER = 'Computer',
  PERIPHERAL = 'Peripheral',
  MONITOR = 'Monitor',
  NETWORK = 'Network',
  MOBILE = 'Mobile',
  OTHER = 'Other',
}

export interface Asset {
  id?: string;
  name: string;
  serialNo: string;
  assignDate: string;
  category: AssetCategory;
}

export interface CategoryConfig {
  value: AssetCategory;
  label: string;
  color: string;
}

export const CATEGORIES: CategoryConfig[] = [
  { value: AssetCategory.COMPUTER, label: '💻 Computer', color: '#667eea' },
  { value: AssetCategory.PERIPHERAL, label: '🖱️ Peripheral', color: '#f093fb' },
  { value: AssetCategory.MONITOR, label: '🖥️ Monitor', color: '#4facfe' },
  { value: AssetCategory.NETWORK, label: '🌐 Network', color: '#43e97b' },
  { value: AssetCategory.MOBILE, label: '📱 Mobile', color: '#fa709a' },
  { value: AssetCategory.OTHER, label: '📦 Other', color: '#a8edea' },
];

export const getCategoryColor = (category?: AssetCategory | string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found ? found.color : '#999';
};

export const getCategoryLabel = (category?: AssetCategory | string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found ? found.label : '📦 Other';
};