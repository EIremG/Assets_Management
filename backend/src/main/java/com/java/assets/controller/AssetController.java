package com.java.assets.controller;

import com.java.assets.exception.DuplicateSerialNoException;
import com.java.assets.model.Asset;
import com.java.assets.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "http://localhost:3000")
public class AssetController {
    
    private final AssetService assetService;
    
    @Autowired
    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }
    
    /**
     * 1. ENDPOINT: Tüm asset'leri getir
     * GET /api/assets
     */
    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets() {
        List<Asset> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }
    
    /**
     * 2. ENDPOINT: Yeni asset ekle
     * POST /api/assets
     */
    @PostMapping
    public ResponseEntity<?> addAsset(@RequestBody Asset asset) {
        try {
            Asset savedAsset = assetService.addAsset(asset);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAsset);
        } catch (DuplicateSerialNoException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "An error occurred while adding asset"));
        }
    }
    
    /**
     * 3. ENDPOINT: Asset sil
     * DELETE /api/assets/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAsset(@PathVariable String id) {
        try {
            assetService.deleteAsset(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * BONUS: Asset güncelle
     * PUT /api/assets/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAsset(@PathVariable String id, @RequestBody Asset asset) {
        try {
            Asset updatedAsset = assetService.updateAsset(id, asset);
            return ResponseEntity.ok(updatedAsset);
        } catch (DuplicateSerialNoException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of("error", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
        }
    }
    
    /**
     * 4. ENDPOINT (BONUS): Pagination ile asset'leri getir
     * GET /api/assets/paginated?page=0&size=10
     */
    @GetMapping("/paginated")
    public ResponseEntity<Page<Asset>> getAllAssetsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Asset> assets = assetService.getAllAssetsPaginated(pageable);
        return ResponseEntity.ok(assets);
    }
    
    /**
     * BONUS: ID'ye göre asset getir
     * GET /api/assets/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getAssetById(@PathVariable String id) {
        return assetService.getAssetById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}