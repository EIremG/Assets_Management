package com.java.assets;

public class DuplicateSerialNoException extends RuntimeException {
    
    public DuplicateSerialNoException(String message) {
        super(message);
    }
    
    public DuplicateSerialNoException(String message, Throwable cause) {
        super(message, cause);
    }
}