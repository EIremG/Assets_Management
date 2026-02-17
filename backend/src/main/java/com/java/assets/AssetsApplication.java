package com.java.assets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy  // AOP'yi aktif et
public class AssetsApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(AssetsApplication.class, args);
    }
}