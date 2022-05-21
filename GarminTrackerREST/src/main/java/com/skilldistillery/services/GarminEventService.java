package com.skilldistillery.services;

import java.util.List;

import com.skilldistillery.entities.GarminEvent;

public interface GarminEventService {
	
	long count();
	List<GarminEvent> index();
	GarminEvent findById(int id);
	List<GarminEvent> findByDateBetween(String low, String high);
	List<GarminEvent> findByDistanceBetween(double low, double high);
	List<GarminEvent> findByCaloriesBetween(int low, int high);
	List<GarminEvent> findByTimeBetween(String low, String high);
	List<GarminEvent> findByAscentBetween(int low, int high);
	List<GarminEvent> findByDescentBetween(int low, int high);
	List<GarminEvent> findByTimeMovingBetween(String low, String high);
	List<GarminEvent> findByTimeElapsedBetween(String low, String high);
	GarminEvent create(GarminEvent gEvent);
	GarminEvent update(GarminEvent gEvent);
	boolean deleteById(int id);
	int getTotalDistance();
	int getTotalCalories();
	

}
