package com.andrei.licenta.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
@Table(name = "food_list")
@JsonIgnoreProperties(allowGetters = true)
public class Food {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "name", length = 50)
    @NotNull
    @Size(min = 4, max = 50)
    private String name;

    @Column(name = "calories")
    @NotNull
    private Integer calories;

    @Column(name = "fat")
    @NotNull
    private double fat;

    @Column(name = "saturated_fat")
    @NotNull
    private double saturatedFat;

    @Column(name = "carbohydrates")
    @NotNull
    private double carbohydrates;

    @Column(name = "fiber")
    @NotNull
    private double fiber;

    @Column(name = "sugar")
    @NotNull
    private double sugar;

    @Column(name = "protein")
    @NotNull
    private double protein;

    @Column(name = "sodium")
    @NotNull
    private double sodium;

    public Food() {}

    public Food(String name, Integer calories, double fat, double saturatedFat, double carbohydrates, double fiber, double sugar, double protein, double sodium) {
        this.name = name;
        this.calories = calories;
        this.fat = fat;
        this.saturatedFat = saturatedFat;
        this.carbohydrates = carbohydrates;
        this.fiber = fiber;
        this.sugar = sugar;
        this.protein = protein;
        this.sodium = sodium;
    }

   public UUID getId() {
       return id;
   }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public double getFat() {
        return fat;
    }

    public void setFat(double fat) {
        this.fat = fat;
    }

    public double getSaturatedFat() {
        return saturatedFat;
    }

    public void setSaturatedFat(double saturatedFat) {
        this.saturatedFat = saturatedFat;
    }

    public double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public double getFiber() {
        return fiber;
    }

    public void setFiber(double fiber) {
        this.fiber = fiber;
    }

    public double getSugar() {
        return sugar;
    }

    public void setSugar(double sugar) {
        this.sugar = sugar;
    }

    public double getProtein() {
        return protein;
    }

    public void setProtein(double protein) {
        this.protein = protein;
    }

    public double getSodium() {
        return sodium;
    }

    public void setSodium(double sodium) {
        this.sodium = sodium;
    }
}
