import axios from 'axios';
import { Asset } from '../types/Asset';

const API_URL = 'http://localhost:8080/api/assets';

export const assetService = {
  getAllAssets: async (): Promise<Asset[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  addAsset: async (asset: Asset): Promise<Asset> => {
    const response = await axios.post(API_URL, asset);
    return response.data;
  },

  updateAsset: async (id: string, asset: Asset): Promise<Asset> => {
    const response = await axios.put(`${API_URL}/${id}`, asset);
    return response.data;
  },

  deleteAsset: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};