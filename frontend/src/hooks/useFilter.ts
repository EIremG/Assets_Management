import { useState, useMemo, useEffect } from 'react';
import { Asset } from '../types/Asset';

const ITEMS_PER_PAGE = 6;

export const useFilter = (assets: Asset[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sayfa 1'e dön - arama veya kategori değişince
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Filtrelenmiş asset'ler - useMemo ile performans
  const filteredAssets = useMemo(() =>
    assets.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || asset.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }),
    [assets, searchTerm, selectedCategory]
  );

  // Sayfalanmış asset'ler - useMemo ile performans
  const paginatedAssets = useMemo(() =>
    filteredAssets.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ),
    [filteredAssets, currentPage]
  );

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    handleCategoryToggle,
    clearFilters,
    filteredAssets,
    paginatedAssets,
    currentPage,
    setCurrentPage,
    totalPages,
    ITEMS_PER_PAGE,
  };
};