package com.andrei.licenta.service;

import com.andrei.licenta.model.ExercisePerformed;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface IExerciseTrackerService {

  List<ExercisePerformed> getAll();

  List<ExercisePerformed> getForConnectedUser();

  ExercisePerformed getOne(UUID id);

  void delete(UUID id);

  ExercisePerformed save(ExercisePerformed foodEaten);

  List<ExercisePerformed> getByDate(Date date);
}
