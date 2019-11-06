package com.andrei.licenta.repository;

import com.andrei.licenta.model.ExercisePerformed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ExercisePerformedRepository extends JpaRepository<ExercisePerformed, UUID> {
  List<ExercisePerformed> findByUserIdOrderByDateAsc(UUID id);

  @Query(value = "select * from exercise_tracker f where day(f.date) = :day and month(f.date) = :month and year(f.date) = :year and f.user_id = :userId", nativeQuery = true)
  List<ExercisePerformed> findByDate(@Param("day") int day, @Param("month")  int month, @Param("year")  int year, @Param("userId")  UUID id);
}
