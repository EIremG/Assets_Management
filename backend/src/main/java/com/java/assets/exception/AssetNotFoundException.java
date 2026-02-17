package com.java.assets.exception;

public class AssetNotFoundException extends RuntimeException {

    public AssetNotFoundException(String id) {
        super("Asset not found with id: " + id);
    }
}