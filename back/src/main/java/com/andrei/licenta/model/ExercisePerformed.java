package com.andrei.licenta.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(
        name = "exercise_tracker",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "exercise_id", "date"})
)
public class ExercisePerformed {

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
    @JoinColumn(name = "exercise_id")
    @NotNull
    private Exercise exercise;

    @Column(name = "date")
    @NotNull
    private Date date;

    @Column(name = "calories_burned")
    @NotNull
    private Integer caloriesBurned;

    @Column(name = "time")
    @NotNull
    private Integer time;

    public ExercisePerformed() { }


  public ExercisePerformed(@NotNull User user, @NotNull Exercise exercise, @NotNull Date date, @NotNull Integer caloriesBurned, @NotNull Integer time) {
    this.user = user;
    this.exercise = exercise;
    this.date = date;
    this.caloriesBurned = caloriesBurned;
    this.time = time;
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

  public Exercise getExercise() {
    return exercise;
  }

  public void setExercise(Exercise exercise) {
    this.exercise = exercise;
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

  public Integer getTime() {
    return time;
  }

  public void setTime(Integer time) {
    this.time = time;
  }

  public int computeCaloriesBurned() {
        return (int) (this.exercise.getMET() * 3.5 * this.user.getWeight() / 200 * this.time);
    }
}
