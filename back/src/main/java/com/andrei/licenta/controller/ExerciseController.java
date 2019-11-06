package com.andrei.licenta.controller;

import com.andrei.licenta.exception.ResourceNotFoundException;
import com.andrei.licenta.model.Exercise;
import com.andrei.licenta.repository.ExerciseRepository;
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
@RequestMapping("/api/exercises")
@Api(name = "Exercise list API", description = "Provides a list of methods that manages the list of exercises", stage = ApiStage.PRE_ALPHA)
public class ExerciseController {
    @Autowired
    ExerciseRepository exerciseRepository;

    @GetMapping("")
    @ApiMethod(description = "Return a list of Exercise containing all exercises from the exercise_list")
    public List<Exercise> getAllExercises() { return exerciseRepository.findAll(); }

    @GetMapping("/id/{id}")
    @ApiMethod(description = "Return only the exercise with the specified id, if the exercise is not found it throws an exception")
    public Exercise getExerciseById(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID exerciseId) {
        return exerciseRepository.findById(exerciseId).orElseThrow(() -> new ResourceNotFoundException("Exercise", "id", exerciseId));
    }

    @GetMapping("/category/{category}")
    @ApiMethod(description = "Return a list of Exercise containing all exercises that are in the specified category")
    public List<Exercise> getExerciseByCategory(@ApiPathParam(name = "category") @PathVariable(value = "category") String exerciseCategory) {
        return exerciseRepository.findByCategory(exerciseCategory);
    }

    @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
    @PostMapping("")
    @ApiMethod(description = "Create a new exercise and save it to the exercise_list and return the new exercise_list")
    public Exercise createExercise(@Valid @RequestBody Exercise exercise) {
      return exerciseRepository.save(exercise);
    }

    @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
    @PutMapping("/{id}")
    @ApiMethod(description = "Update the data on the exercise with the specified id and return the new exercise_list")
    public Exercise updateExercise(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID exerciseId, @Valid @RequestBody Exercise exerciseDetails) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new ResourceNotFoundException("Exercise", "id", exerciseId));
        exercise.setCode(exerciseDetails.getCode());
        exercise.setMET(exerciseDetails.getMET());
        exercise.setCategory(exerciseDetails.getCategory());
        exercise.setDescription(exerciseDetails.getDescription());

        return exerciseRepository.save(exercise);
    }

    @PreAuthorize("hasAnyRole('ADMIN, CURATOR')")
    @DeleteMapping("/{id}")
    @ApiMethod(description = "Delete the exercises with the specified id from exercise_list and return the new exercise_list")
    public List<Exercise> deleteExercise(@ApiPathParam(name = "id") @PathVariable(value = "id") UUID exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId).orElseThrow(() -> new ResourceNotFoundException("Exercise", "id", exerciseId));
        exerciseRepository.delete(exercise);

        return exerciseRepository.findAll();
    }
}
