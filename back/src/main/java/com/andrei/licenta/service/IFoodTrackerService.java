package com.andrei.licenta.service;

import com.andrei.licenta.model.FoodEaten;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface IFoodTrackerService {

  List<FoodEaten> getAll();

  List<FoodEaten> getForConnectedUser();

  FoodEaten getOne(UUID id);

  void delete(UUID id);

  FoodEaten save(FoodEaten foodEaten);

  List<FoodEaten> getByDate(Date date);
}
