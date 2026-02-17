export interface Asset {
  id?: string;
  name: string;
  serialNo: string;
  assignDate: string;
  category?: string; // ← YENİ!
}

// Kategori renkleri ve ikonları
export const CATEGORIES = [
  { value: 'Computer', label: '💻 Computer', color: '#667eea' },
  { value: 'Peripheral', label: '🖱️ Peripheral', color: '#f093fb' },
  { value: 'Monitor', label: '🖥️ Monitor', color: '#4facfe' },
  { value: 'Network', label: '🌐 Network', color: '#43e97b' },
  { value: 'Mobile', label: '📱 Mobile', color: '#fa709a' },
  { value: 'Other', label: '📦 Other', color: '#a8edea' },
];

export const getCategoryColor = (category?: string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found ? found.color : '#999';
};

export const getCategoryLabel = (category?: string): string => {
  const found = CATEGORIES.find(c => c.value === category);
  return found ? found.label : '📦 Other';
};