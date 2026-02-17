package com.java.assets.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "assets")
public class Asset {
    
    @Id
    private String id;
    
    private String name;
    
    @Indexed(unique = true)
    private String serialNo;
    
    private LocalDate assignDate;
    
    private String category; // ← YENİ ALAN!

    // Constructors
    public Asset() {}

    public Asset(String id, String name, String serialNo, LocalDate assignDate, String category) {
        this.id = id;
        this.name = name;
        this.serialNo = serialNo;
        this.assignDate = assignDate;
        this.category = category;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSerialNo() { return serialNo; }
    public void setSerialNo(String serialNo) { this.serialNo = serialNo; }

    public LocalDate getAssignDate() { return assignDate; }
    public void setAssignDate(LocalDate assignDate) { this.assignDate = assignDate; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    @Override
    public String toString() {
        return "Asset{id='" + id + "', name='" + name + "', serialNo='" + serialNo + 
               "', assignDate=" + assignDate + "', category='" + category + "'}";
    }
}