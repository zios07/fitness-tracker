package com.andrei.licenta.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(
        name = "report",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "date"})
)
public class Report {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    @Column(name = "date")
    @NotNull
    private Date date;

    //you need to initiate this with getCaloriesBurned from ExercisePerformed.java
    @Column(name = "calories_burned")
    @NotNull
    private Integer caloriesBurned;

    //you need to initiate this with getCaloriesEaten from FoodEaten.java
    @Column(name = "calories_eaten")
    @NotNull
    private Integer caloriesEaten;

    public Report() { }

    public Report(@NotNull User user, @NotNull Date date, @NotNull Integer caloriesBurned, @NotNull Integer caloriesEaten) {
        this.user = user;
        this.date = date;
        this.caloriesBurned = caloriesBurned;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(Integer caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }

    public Integer getCaloriesEaten() {
        return caloriesEaten;
    }

    public void setCaloriesEaten(Integer caloriesEaten) {
        this.caloriesEaten = caloriesEaten;
    }
}
