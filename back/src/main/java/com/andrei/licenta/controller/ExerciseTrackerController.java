package com.andrei.licenta.controller;


import com.andrei.licenta.model.ExercisePerformed;
import com.andrei.licenta.service.IExerciseTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/exercises/tracker")
public class ExerciseTrackerController {

    @Autowired
    private IExerciseTrackerService service;


    @GetMapping
    public List<ExercisePerformed> getAll() {
      return service.getForConnectedUser();
    }

    @GetMapping(value = "search")
    public List<ExercisePerformed> getByDate(@RequestParam @DateTimeFormat(pattern="dd-MM-yyyy") Date date) throws ParseException {
      return service.getByDate(date);
    }

    @PostMapping
    public ExercisePerformed create(@RequestBody ExercisePerformed foodEaten) {
      return service.save(foodEaten);
    }

    @DeleteMapping(value = "{id}")
    public void delete(@PathVariable UUID id) {
      service.delete(id);
    }

}
