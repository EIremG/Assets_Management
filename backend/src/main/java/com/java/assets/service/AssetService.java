package com.java.assets.service;

import com.java.assets.exception.DuplicateSerialNoException;
import com.java.assets.model.Asset;
import com.java.assets.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {
    
    private final AssetRepository assetRepository;
    
    @Autowired
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }
    
    /**
     * Tüm asset'leri getir
     */
    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }
    
    /**
     * Yeni asset ekle (serialNo kontrolü ile)
     */
    public Asset addAsset(Asset asset) {
        // serialNo unique kontrolü
        Optional<Asset> existingAsset = assetRepository.findBySerialNo(asset.getSerialNo());
        
        if (existingAsset.isPresent()) {
            throw new DuplicateSerialNoException(
                "Asset with serialNo '" + asset.getSerialNo() + "' already exists!"
            );
        }
        
        return assetRepository.save(asset);
    }
    
    /**
     * Asset sil
     */
    public void deleteAsset(String id) {
        if (!assetRepository.existsById(id)) {
            throw new RuntimeException("Asset not found with id: " + id);
        }
        assetRepository.deleteById(id);
    }
    
    /**
     * Asset güncelle
     */
    public Asset updateAsset(String id, Asset updatedAsset) {
        return assetRepository.findById(id)
            .map(asset -> {
                asset.setName(updatedAsset.getName());
                // serialNo değiştiriliyorsa duplicate kontrolü yap
                if (!asset.getSerialNo().equals(updatedAsset.getSerialNo())) {
                    Optional<Asset> existing = assetRepository.findBySerialNo(updatedAsset.getSerialNo());
                    if (existing.isPresent() && !existing.get().getId().equals(id)) {
                        throw new DuplicateSerialNoException(
                            "Asset with serialNo '" + updatedAsset.getSerialNo() + "' already exists!"
                        );
                    }
                    asset.setSerialNo(updatedAsset.getSerialNo());
                }
                asset.setAssignDate(updatedAsset.getAssignDate());
                return assetRepository.save(asset);
            })
            .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
    }
    
    /**
     * Pagination ile asset'leri getir (4. endpoint - bonus)
     */
    public Page<Asset> getAllAssetsPaginated(Pageable pageable) {
        return assetRepository.findAll(pageable);
    }
    
    /**
     * ID'ye göre asset getir
     */
    public Optional<Asset> getAssetById(String id) {
        return assetRepository.findById(id);
    }
}