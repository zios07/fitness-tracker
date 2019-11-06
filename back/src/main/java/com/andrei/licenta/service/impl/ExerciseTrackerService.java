package com.andrei.licenta.service.impl;

import com.andrei.licenta.model.ExercisePerformed;
import com.andrei.licenta.model.User;
import com.andrei.licenta.repository.ExercisePerformedRepository;
import com.andrei.licenta.security.JwtUser;
import com.andrei.licenta.service.IExerciseTrackerService;
import com.andrei.licenta.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class ExerciseTrackerService implements IExerciseTrackerService {

  @Autowired
  private ExercisePerformedRepository repo;

  @Autowired
  private IUserService userService;

  @Override
  public List<ExercisePerformed> getAll() {
    return repo.findAll();
  }

  @Override
  public List<ExercisePerformed> getForConnectedUser() {
    JwtUser user = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return repo.findByUserIdOrderByDateAsc(user.getId());
  }

  @Override
  public ExercisePerformed getOne(UUID id) {
    return repo.findById(id).get();
  }

  @Override
  public void delete(UUID id) {
    repo.deleteById(id);
  }

  @Override
  public ExercisePerformed save(ExercisePerformed exercisePerformed) {
    if(exercisePerformed != null) {
      if(exercisePerformed.getUser() == null)
        exercisePerformed.setUser(userService.getConnectedUser());
      if(exercisePerformed.getDate() == null)
        exercisePerformed.setDate(new Date());
    }
    exercisePerformed.setCaloriesBurned(exercisePerformed.computeCaloriesBurned());
    return repo.save(exercisePerformed);
  }

  @Override
  public List<ExercisePerformed> getByDate(Date date) {
    LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    return repo.findByDate(localDate.getDayOfMonth(), localDate.getMonthValue(), localDate.getYear(), userService.getConnectedUser().getId());
  }

}
