package com.andrei.licenta.service.impl;

import com.andrei.licenta.model.FoodEaten;
import com.andrei.licenta.model.User;
import com.andrei.licenta.repository.FoodEatenRepository;
import com.andrei.licenta.security.JwtUser;
import com.andrei.licenta.service.IFoodTrackerService;
import com.andrei.licenta.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class FoodTrackerService implements IFoodTrackerService {

  @Autowired
  private FoodEatenRepository repo;

  @Autowired
  private IUserService userService;

  @Override
  public List<FoodEaten> getAll() {
    return repo.findAll();
  }

  @Override
  public List<FoodEaten> getForConnectedUser() {
    JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return repo.findByUserIdOrderByDateAsc(user.getId());
  }

  @Override
  public FoodEaten getOne(UUID id) {
    return repo.findById(id).get();
  }

  @Override
  public void delete(UUID id) {
    repo.deleteById(id);
  }

  @Override
  public FoodEaten save(FoodEaten foodEaten) {
    if(foodEaten != null) {
      if(foodEaten.getUser() == null) {
        foodEaten.setUser(userService.getConnectedUser());
      }
      if(foodEaten.getDate() == null) {
        foodEaten.setDate(new Date());
      }
    }
    foodEaten.setCaloriesEaten(foodEaten.computeCaloriesEaten());
    return repo.save(foodEaten);
  }

  @Override
  public List<FoodEaten> getByDate(Date date) {
    LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    return repo.findByDate(localDate.getDayOfMonth(), localDate.getMonthValue(), localDate.getYear(), userService.getConnectedUser().getId());
  }

}
