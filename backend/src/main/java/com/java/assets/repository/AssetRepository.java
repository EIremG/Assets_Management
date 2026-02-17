package com.java.assets.repository;

import com.java.assets.model.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {
    
    /**
     * serialNo'ya göre asset bulma (unique kontrolü için)
     */
    Optional<Asset> findBySerialNo(String serialNo);
    
    /**
     * Pagination için (4. endpoint - bonus)
     */
    Page<Asset> findAll(Pageable pageable);
}
