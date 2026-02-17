import { renderHook, act } from '@testing-library/react';
import { useFilter } from './useFilter';
import { AssetCategory } from '../types/Asset';

const mockAssets = [
  { id: '1', name: 'Laptop Dell', serialNo: 'SN001', assignDate: '2026-02-17', category: AssetCategory.COMPUTER },
  { id: '2', name: 'Mouse Logitech', serialNo: 'SN002', assignDate: '2026-02-16', category: AssetCategory.PERIPHERAL },
  { id: '3', name: 'Monitor LG', serialNo: 'SN003', assignDate: '2026-02-15', category: AssetCategory.MONITOR },
];

describe('useFilter', () => {

  test('should return all assets when no filter', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    expect(result.current.filteredAssets).toHaveLength(3);
  });

  test('should filter by name', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    act(() => { result.current.setSearchTerm('Laptop'); });
    expect(result.current.filteredAssets).toHaveLength(1);
    expect(result.current.filteredAssets[0].name).toBe('Laptop Dell');
  });

  test('should filter by serialNo', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    act(() => { result.current.setSearchTerm('SN002'); });
    expect(result.current.filteredAssets).toHaveLength(1);
    expect(result.current.filteredAssets[0].serialNo).toBe('SN002');
  });

  test('should filter by category', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    act(() => { result.current.handleCategoryToggle(AssetCategory.COMPUTER); });
    expect(result.current.filteredAssets).toHaveLength(1);
    expect(result.current.filteredAssets[0].category).toBe(AssetCategory.COMPUTER);
  });

  test('should clear filters', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    act(() => { result.current.setSearchTerm('Laptop'); });
    act(() => { result.current.clearFilters(); });
    expect(result.current.filteredAssets).toHaveLength(3);
    expect(result.current.searchTerm).toBe('');
  });

  test('should reset to page 1 when search changes', () => {
    const { result } = renderHook(() => useFilter(mockAssets));
    act(() => { result.current.setCurrentPage(3); });
    act(() => { result.current.setSearchTerm('Laptop'); });
    expect(result.current.currentPage).toBe(1);
  });
});