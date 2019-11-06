package com.andrei.licenta.controller;

import com.andrei.licenta.exception.ResourceNotFoundException;
import com.andrei.licenta.model.Food;
import com.andrei.licenta.repository.FoodRepository;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.jsondoc.core.pojo.ApiStage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/foods")
@Api(name = "Food list API", description = "Provides a list of methods that manages the list of foods", stage = ApiStage.PRE_ALPHA)
public class FoodController {
  @Autowired
  FoodRepository foodRepository;

  @GetMapping("")
  @ApiMethod(description = "Return all foods from the food_list")
  public List<Food> getAllFoods() {
    return foodRepository.findAll();
  }

  @GetMapping("/id/{id}")
  @ApiMethod(description = "Return only the food with the specified id")
  public Food getFoodById(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID foodId) {
    return foodRepository.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Food", "id", foodId));
  }

  @GetMapping("/name/{name}")
  @ApiMethod(description = "Return only the food with the specified name")
  public List<Food> getFoodByName(@ApiPathParam(name = "name") @PathVariable(value = "name") String foodName) {
    return foodRepository.findByName(foodName);
  }

  @GetMapping("/lesscalories/{calories}")
  @ApiMethod(description = "Return all foods with less that the specified number of calories")
  public List<Food> getFoodCalories(@PathVariable(value = "calories") Integer calories) {
    return foodRepository.findByCaloriesLessThan(calories);
  }

  @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
  @PostMapping("")
  @ApiMethod(description = "Create a new food and save it to the food_list and return the new food_list")
  public Food createFood(@Valid @RequestBody Food food) {
    return foodRepository.save(food);
  }

  @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
  @PutMapping("/{id}")
  @ApiMethod(description = "Delete the food with the specified id from food_list and return the new food_list. Only admins have access to this function")
  public Food updateFood(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID foodId, @Valid @RequestBody Food foodDetails) {
    Food food = foodRepository.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Food", "id", foodId));
    food.setName(foodDetails.getName());
    food.setCalories(foodDetails.getCalories());
    food.setFat(foodDetails.getFat());
    food.setSaturatedFat(foodDetails.getSaturatedFat());
    food.setCarbohydrates(foodDetails.getCarbohydrates());
    food.setFiber(foodDetails.getFiber());
    food.setSugar(foodDetails.getSugar());
    food.setProtein(foodDetails.getProtein());
    food.setSodium(foodDetails.getSodium());
    Food updatedFood = foodRepository.save(food);

    return updatedFood;
  }

  @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
  @DeleteMapping("/{id}")
  @ApiMethod(description = "Update the data on the food with the specified id and return the new food_list")
  public List<Food> deleteFood(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID foodId) {
    Food food = foodRepository.findById(foodId).orElseThrow(() -> new ResourceNotFoundException("Food", "id", foodId));
    foodRepository.delete(food);

    return foodRepository.findAll();
  }
}
