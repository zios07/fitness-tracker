package com.andrei.licenta.repository;

import com.andrei.licenta.model.FoodEaten;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface FoodEatenRepository extends JpaRepository<FoodEaten, UUID> {
  List<FoodEaten> findByUserIdOrderByDateAsc(UUID id);

  @Query(value = "select * from food_tracker f where day(f.date) = :day and month(f.date) = :month and year(f.date) = :year and f.user_id = :userId", nativeQuery = true)
  List<FoodEaten> findByDate(@Param("day") int day,@Param("month")  int month,@Param("year")  int year, @Param("userId")  UUID id);
}
