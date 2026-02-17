package com.java.assets.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Assets Management API")
                        .version("1.0.0")
                        .description("Full-stack Asset Management System REST API")
                        .contact(new Contact()
                                .name("Pavza Assets")
                                .email("contact@pavza.com")));
    }
}