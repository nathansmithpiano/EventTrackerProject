package com.skilldistillery.repositories;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.entities.GarminEvent;

public interface GarminEventRepository extends JpaRepository<GarminEvent, Integer> {
	
	List<GarminEvent> findByDateBetween(LocalDateTime low, LocalDateTime high);
	List<GarminEvent> findByDistanceBetween(double low, double high);
	List<GarminEvent> findByCaloriesBetween(int low, int high);
	List<GarminEvent> findByTimeBetween(LocalTime low, LocalTime high);
	List<GarminEvent> findByAscentBetween(int low, int high);
	List<GarminEvent> findByDescentBetween(int low, int high);
	List<GarminEvent> findByTimeMovingBetween(LocalTime low, LocalTime high);
	List<GarminEvent> findByTimeElapsedBetween(LocalTime low, LocalTime high);

}
