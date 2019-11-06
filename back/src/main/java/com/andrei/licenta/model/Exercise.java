package com.andrei.licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "exercise_list")
@JsonIgnoreProperties(allowGetters = true)
public class Exercise {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "code", length = 5)
    @NotNull
    @Size(min = 5, max = 5)
    private String code;

    @Column(name = "MET")
    @NotNull
    private double MET;

    @Column(name = "category", length = 25)
    @NotNull
    @Size(min = 4, max = 25)
    private String category;

    @Column(name = "description", length = 250)
    @NotNull
    @Size(min = 4, max = 250)
    private String description;

    public Exercise() { }

    public Exercise(@NotNull @Size(min = 5, max = 5) String code, @NotNull double MET, @NotNull @Size(min = 4, max = 25) String category, @NotNull @Size(min = 4, max = 250) String description) {
        this.code = code;
        this.MET = MET;
        this.category = category;
        this.description = description;
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getCode() { return code; }

    public void setCode(String code) { this.code = code; }

    public double getMET() { return MET; }

    public void setMET(double MET) { this.MET = MET; }

    public String getCategory() { return category; }

    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }
}
