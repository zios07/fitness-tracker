package com.andrei.licenta.controller;

import com.andrei.licenta.model.FoodEaten;
import com.andrei.licenta.service.IFoodTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/foods/tracker")
public class FoodTrackerController {

  @Autowired
  private IFoodTrackerService service;


  @GetMapping("")
  public List<FoodEaten> getAll() {
    return service.getForConnectedUser();
  }

  @GetMapping(value = "search")
  public List<FoodEaten> getByDate(@RequestParam @DateTimeFormat(pattern="dd-MM-yyyy") Date date) throws ParseException {
//    Date date = (new SimpleDateFormat("")).parse(strDate);
    return service.getByDate(date);
  }

  @PostMapping
  public FoodEaten create(@RequestBody FoodEaten foodEaten) {
    return service.save(foodEaten);
  }

  @DeleteMapping(value = "{id}")
  public void delete(@PathVariable UUID id) {
    service.delete(id);
  }

}
