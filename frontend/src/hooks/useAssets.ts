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

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await assetService.updateAsset(editingId, formData);
        toast.success('Asset updated successfully! ✏️');
      } else {
        await assetService.addAsset(formData);
        toast.success('Asset added successfully! 🎉');
      }
      setFormData(INITIAL_FORM);
      setEditingId(null);
      await fetchAssets();
    } catch (error: any) {
      const errorMsg = error.response?.data?.error 
        || error.response?.data?.message 
        || 'An error occurred';
      toast.error(errorMsg + ' ❌');
    }
  }, [editingId, formData, fetchAssets]);

  const handleEdit = useCallback((asset: Asset) => {
    setFormData({
      name: asset.name,
      serialNo: asset.serialNo,
      assignDate: asset.assignDate,
      category: asset.category,
    });
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
    setEditingId(null);
  }, []);

  return {
    assets,
    formData,
    setFormData,
    editingId,
    loading,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCancelEdit,
  };
};