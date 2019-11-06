package com.andrei.licenta.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(
        name = "food_tracker",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "food_id", "date"})
)
@JsonIgnoreProperties(allowGetters = true)
public class FoodEaten {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @ManyToOne
    @JoinColumn(name = "food_id")
    @NotNull
    private Food food;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "serving_qty", nullable = false)
    private double servingQty;

    @Column(name = "calories_eaten", nullable = false)
    private int caloriesEaten;

    public FoodEaten() { }

  public FoodEaten(@NotNull User user, @NotNull Food food, Date date, double servingQty, int caloriesEaten) {
    this.user = user;
    this.food = food;
    this.date = date;
    this.servingQty = servingQty;
    this.caloriesEaten = caloriesEaten;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public Food getFood() {
    return food;
  }

  public void setFood(Food food) {
    this.food = food;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }

  public double getServingQty() {
    return servingQty;
  }

  public void setServingQty(double servingQty) {
    this.servingQty = servingQty;
  }

  public int getCaloriesEaten() {
    return caloriesEaten;
  }

  public void setCaloriesEaten(int caloriesEaten) {
    this.caloriesEaten = caloriesEaten;
  }

  public int computeCaloriesEaten() {
        return (int) (this.food.getCalories() * this.servingQty);
    }
}
