package com.andrei.licenta.repository;

import com.andrei.licenta.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

import java.util.List;

@Repository
public interface FoodRepository extends JpaRepository<Food, UUID> {
    List<Food> findByCaloriesLessThan(Integer calories);

    List<Food> findByName(String name);
}
