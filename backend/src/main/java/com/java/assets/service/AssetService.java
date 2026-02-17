package com.java.assets.service;

import com.java.assets.model.Asset;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AssetService {
    List<Asset> getAllAssets();
    Asset getAssetById(String id);
    Asset addAsset(Asset asset);
    Asset updateAsset(String id, Asset asset);
    void deleteAsset(String id);
    Page<Asset> getAssetsPaginated(int page, int size);
}