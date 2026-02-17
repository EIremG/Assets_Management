import axiosInstance from './axiosInstance';
import { Asset } from '../types/Asset';

export const assetService = {

  getAllAssets: async (): Promise<Asset[]> => {
    const response = await axiosInstance.get('');
    return response.data;
  },

  getAssetById: async (id: string): Promise<Asset> => {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  },

  addAsset: async (asset: Asset): Promise<Asset> => {
    const response = await axiosInstance.post('', asset);
    return response.data;
  },

  updateAsset: async (id: string, asset: Asset): Promise<Asset> => {
    const response = await axiosInstance.put(`/${id}`, asset);
    return response.data;
  },

  deleteAsset: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/${id}`);
  },
};