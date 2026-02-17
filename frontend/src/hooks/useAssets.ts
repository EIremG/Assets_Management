import { useState, useEffect, useCallback } from 'react';
import { Asset, AssetCategory } from '../types/Asset';
import { assetService } from '../services/assetService';
import { toast } from 'react-toastify';

const INITIAL_FORM: Asset = {
  name: '',
  serialNo: '',
  assignDate: new Date().toISOString().split('T')[0],
  category: AssetCategory.OTHER,
};

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [formData, setFormData] = useState<Asset>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Asset, string>>>({});

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await assetService.getAllAssets();
      setAssets(data);
    } catch (error) {
      toast.error('Failed to fetch assets ❌');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<Record<keyof Asset, string>> = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (formData.name && formData.name.trim().length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    if (!formData.serialNo || formData.serialNo.trim().length === 0) {
      newErrors.serialNo = 'Serial number is required';
    }
    if (!formData.assignDate) {
      newErrors.assignDate = 'Assign date is required';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await assetService.updateAsset(editingId, formData);
        toast.success('Asset updated successfully! ✏️');
      } else {
        await assetService.addAsset(formData);
        toast.success('Asset added successfully! 🎉');
      }
      setFormData(INITIAL_FORM);
      setFormErrors({});
      setEditingId(null);
      await fetchAssets();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error
        || error.response?.data?.message
        || 'An error occurred';
      toast.error(errorMsg + ' ❌');
    }
  }, [editingId, formData, fetchAssets, validateForm]);

  const handleEdit = useCallback((asset: Asset) => {
    setFormData({
      name: asset.name,
      serialNo: asset.serialNo,
      assignDate: asset.assignDate,
      category: asset.category,
    });
    setFormErrors({});
    setEditingId(asset.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;
    try {
      await assetService.deleteAsset(id);
      toast.success('Asset deleted successfully! 🗑️');
      await fetchAssets();
    } catch (error) {
      toast.error('Failed to delete asset ❌');
    }
  }, [fetchAssets]);

  const handleCancelEdit = useCallback(() => {
    setFormData(INITIAL_FORM);
    setFormErrors({});
    setEditingId(null);
  }, []);

  return {
    assets,
    formData,
    setFormData,
    editingId,
    loading,
    formErrors,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancelEdit,
  };
};