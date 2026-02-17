package com.java.assets.service;
import org.junit.jupiter.api.BeforeEach;
import com.java.assets.exception.AssetNotFoundException;
import com.java.assets.exception.DuplicateSerialNoException;
import com.java.assets.model.Asset;
import com.java.assets.repository.AssetRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AssetServiceImplTest {

    @Mock
    private AssetRepository assetRepository;

    @InjectMocks
    private AssetServiceImpl assetService;

    private Asset testAsset;

    @BeforeEach
    void setUp() {
        testAsset = new Asset(
            "1",
            "Laptop Dell XPS",
            "SN001",
            LocalDate.of(2026, 2, 17),
            "Computer"
        );
    }

    @Test
    @DisplayName("getAllAssets → should return all assets")
    void getAllAssets_shouldReturnAllAssets() {
        when(assetRepository.findAll()).thenReturn(List.of(testAsset));

        List<Asset> result = assetService.getAllAssets();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Laptop Dell XPS");
        verify(assetRepository, times(1)).findAll();
    }

    @Test
    @DisplayName("getAssetById → should return asset when found")
    void getAssetById_shouldReturnAsset_whenFound() {
        when(assetRepository.findById("1")).thenReturn(Optional.of(testAsset));

        Asset result = assetService.getAssetById("1");

        assertThat(result.getId()).isEqualTo("1");
        assertThat(result.getName()).isEqualTo("Laptop Dell XPS");
    }

    @Test
    @DisplayName("getAssetById → should throw exception when not found")
    void getAssetById_shouldThrowException_whenNotFound() {
        when(assetRepository.findById("999")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> assetService.getAssetById("999"))
            .isInstanceOf(AssetNotFoundException.class)
            .hasMessageContaining("999");
    }

    @Test
    @DisplayName("addAsset → should save and return asset")
    void addAsset_shouldSaveAndReturnAsset() {
        when(assetRepository.findBySerialNo("SN001")).thenReturn(Optional.empty());
        when(assetRepository.save(any(Asset.class))).thenReturn(testAsset);

        Asset result = assetService.addAsset(testAsset);

        assertThat(result.getSerialNo()).isEqualTo("SN001");
        verify(assetRepository, times(1)).save(any(Asset.class));
    }

    @Test
    @DisplayName("addAsset → should throw exception when serialNo exists")
    void addAsset_shouldThrowException_whenSerialNoExists() {
        when(assetRepository.findBySerialNo("SN001")).thenReturn(Optional.of(testAsset));

        assertThatThrownBy(() -> assetService.addAsset(testAsset))
            .isInstanceOf(DuplicateSerialNoException.class)
            .hasMessageContaining("SN001");

        verify(assetRepository, never()).save(any());
    }

    @Test
    @DisplayName("updateAsset → should update and return asset")
    void updateAsset_shouldUpdateAndReturnAsset() {
        Asset updatedAsset = new Asset("1", "Updated Laptop", "SN001",
            LocalDate.of(2026, 2, 17), "Computer");

        when(assetRepository.findById("1")).thenReturn(Optional.of(testAsset));
        when(assetRepository.save(any(Asset.class))).thenReturn(updatedAsset);

        Asset result = assetService.updateAsset("1", updatedAsset);

        assertThat(result.getName()).isEqualTo("Updated Laptop");
        verify(assetRepository, times(1)).save(any(Asset.class));
    }

    @Test
    @DisplayName("updateAsset → should throw exception when not found")
    void updateAsset_shouldThrowException_whenNotFound() {
        when(assetRepository.findById("999")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> assetService.updateAsset("999", testAsset))
            .isInstanceOf(AssetNotFoundException.class);
    }

    @Test
    @DisplayName("deleteAsset → should delete successfully")
    void deleteAsset_shouldDeleteSuccessfully() {
        when(assetRepository.existsById("1")).thenReturn(true);
        doNothing().when(assetRepository).deleteById("1");

        assetService.deleteAsset("1");

        verify(assetRepository, times(1)).deleteById("1");
    }

    @Test
    @DisplayName("deleteAsset → should throw exception when not found")
    void deleteAsset_shouldThrowException_whenNotFound() {
        when(assetRepository.existsById("999")).thenReturn(false);

        assertThatThrownBy(() -> assetService.deleteAsset("999"))
            .isInstanceOf(AssetNotFoundException.class);

        verify(assetRepository, never()).deleteById(any());
    }
}