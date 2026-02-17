package com.java.assets.controller;

import com.java.assets.model.Asset;
import com.java.assets.service.AssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Asset Management", description = "Asset CRUD operations")
@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @Operation(summary = "Get all assets", description = "Returns list of all assets")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved")
    @GetMapping
    public ResponseEntity<List<Asset>> getAllAssets() {
        return ResponseEntity.ok(assetService.getAllAssets());
    }

    @Operation(summary = "Get asset by ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asset found"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(
            @Parameter(description = "Asset ID") @PathVariable String id) {
        return ResponseEntity.ok(assetService.getAssetById(id));
    }

    @Operation(summary = "Add new asset")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Asset created"),
        @ApiResponse(responseCode = "400", description = "Validation error"),
        @ApiResponse(responseCode = "409", description = "Duplicate serial number")
    })
    @PostMapping
    public ResponseEntity<Asset> addAsset(@Valid @RequestBody Asset asset) {
        return ResponseEntity.status(HttpStatus.CREATED).body(assetService.addAsset(asset));
    }

    @Operation(summary = "Update asset")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asset updated"),
        @ApiResponse(responseCode = "404", description = "Asset not found"),
        @ApiResponse(responseCode = "409", description = "Duplicate serial number")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(
            @Parameter(description = "Asset ID") @PathVariable String id,
            @Valid @RequestBody Asset asset) {
        return ResponseEntity.ok(assetService.updateAsset(id, asset));
    }

    @Operation(summary = "Delete asset")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Asset deleted"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(
            @Parameter(description = "Asset ID") @PathVariable String id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get paginated assets")
    @GetMapping("/paginated")
    public ResponseEntity<Page<Asset>> getAssetsPaginated(
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(assetService.getAssetsPaginated(page, size));
    }
}