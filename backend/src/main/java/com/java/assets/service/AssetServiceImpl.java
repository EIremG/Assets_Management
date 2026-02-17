package com.java.assets.service;

import com.java.assets.exception.AssetNotFoundException;
import com.java.assets.exception.DuplicateSerialNoException;
import com.java.assets.model.Asset;
import com.java.assets.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;

    @Override
    public List<Asset> getAllAssets() {
        log.info("Fetching all assets");
        return assetRepository.findAll();
    }

    @Override
    public Asset getAssetById(String id) {
        log.info("Fetching asset with id: {}", id);
        return assetRepository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException(id));
    }

    @Override
    public Asset addAsset(Asset asset) {
        log.info("Adding new asset with serialNo: {}", asset.getSerialNo());
        assetRepository.findBySerialNo(asset.getSerialNo())
                .ifPresent(existing -> {
                    throw new DuplicateSerialNoException(
                            "Asset with serialNo '" + asset.getSerialNo() + "' already exists!"
                    );
                });
        return assetRepository.save(asset);
    }

    @Override
    public Asset updateAsset(String id, Asset updatedAsset) {
        log.info("Updating asset with id: {}", id);
        Asset existing = assetRepository.findById(id)
                .orElseThrow(() -> new AssetNotFoundException(id));

        // SerialNo değiştiyse duplicate kontrolü
        if (!existing.getSerialNo().equals(updatedAsset.getSerialNo())) {
            assetRepository.findBySerialNo(updatedAsset.getSerialNo())
                    .ifPresent(found -> {
                        throw new DuplicateSerialNoException(
                                "Asset with serialNo '" + updatedAsset.getSerialNo() + "' already exists!"
                        );
                    });
        }

        existing.setName(updatedAsset.getName());
        existing.setSerialNo(updatedAsset.getSerialNo());
        existing.setAssignDate(updatedAsset.getAssignDate());
        if (updatedAsset.getCategory() != null) {
            existing.setCategory(updatedAsset.getCategory());
        }

        return assetRepository.save(existing);
    }

    @Override
    public void deleteAsset(String id) {
        log.info("Deleting asset with id: {}", id);
        if (!assetRepository.existsById(id)) {
            throw new AssetNotFoundException(id);
        }
        assetRepository.deleteById(id);
    }

    @Override
    public Page<Asset> getAssetsPaginated(int page, int size) {
        log.info("Fetching paginated assets - page: {}, size: {}", page, size);
        return assetRepository.findAll(PageRequest.of(page, size));
    }
}