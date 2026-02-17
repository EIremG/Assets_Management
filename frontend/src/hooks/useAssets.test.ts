import { renderHook, act } from '@testing-library/react';
import { useAssets } from './useAssets';
import { assetService } from '../services/assetService';
import { AssetCategory } from '../types/Asset';

jest.mock('../services/assetService');
const mockAssetService = assetService as jest.Mocked<typeof assetService>;

const mockAsset = {
  id: '1',
  name: 'Laptop Dell XPS',
  serialNo: 'SN001',
  assignDate: '2026-02-17',
  category: AssetCategory.COMPUTER,
};

describe('useAssets', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch assets on mount', async () => {
    mockAssetService.getAllAssets.mockResolvedValue([mockAsset]);

    const { result } = renderHook(() => useAssets());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.assets).toHaveLength(1);
    expect(result.current.assets[0].name).toBe('Laptop Dell XPS');
  });

  test('should set loading true while fetching', async () => {
    mockAssetService.getAllAssets.mockResolvedValue([]);
    const { result } = renderHook(() => useAssets());
    expect(result.current.loading).toBe(true);
  });

  test('should handle edit correctly', async () => {
    mockAssetService.getAllAssets.mockResolvedValue([mockAsset]);
    const { result } = renderHook(() => useAssets());

    act(() => {
      result.current.handleEdit(mockAsset);
    });

    expect(result.current.editingId).toBe('1');
    expect(result.current.formData.name).toBe('Laptop Dell XPS');
  });

  test('should cancel edit correctly', async () => {
    mockAssetService.getAllAssets.mockResolvedValue([mockAsset]);
    const { result } = renderHook(() => useAssets());

    act(() => { result.current.handleEdit(mockAsset); });
    act(() => { result.current.handleCancelEdit(); });

    expect(result.current.editingId).toBeNull();
    expect(result.current.formData.name).toBe('');
  });

  test('should fail validation with short name', async () => {
    mockAssetService.getAllAssets.mockResolvedValue([]);
    const { result } = renderHook(() => useAssets());

    act(() => {
      result.current.setFormData({
        ...result.current.formData,
        name: 'A',
      });
    });

    const mockEvent = { preventDefault: jest.fn() } as any;
    await act(async () => {
      await result.current.handleSubmit(mockEvent);
    });

    expect(result.current.formErrors.name).toBeTruthy();
    expect(mockAssetService.addAsset).not.toHaveBeenCalled();
  });
});