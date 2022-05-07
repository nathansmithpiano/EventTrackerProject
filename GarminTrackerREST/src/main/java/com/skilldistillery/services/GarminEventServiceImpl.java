package com.skilldistillery.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.entities.GarminEvent;
import com.skilldistillery.repositories.GarminEventRepository;

@Service
public class GarminEventServiceImpl implements GarminEventService {
	
	@Autowired
	private GarminEventRepository repo;

	@Override
	public List<GarminEvent> index() {
		return repo.findAll();
	}

	@Override
	public GarminEvent findById(int id) {
		Optional<GarminEvent> op = repo.findById(id);
		GarminEvent gEvent = null;
		if (op.isPresent()) {
			gEvent = op.get();
		}
		return gEvent;
	}
	
	@Override
	public List<GarminEvent> findByDateBetween(String low, String high) {
		LocalDate lowDate = LocalDate.parse(low);
		LocalDateTime lowDateTime = lowDate.atStartOfDay();
		LocalDate highDate = LocalDate.parse(high);
		LocalDateTime highDateTime = highDate.atStartOfDay();
		return repo.findByDateBetween(lowDateTime, highDateTime);
	}
	
	@Override
	public List<GarminEvent> findByDistanceBetween(double low, double high) {
		return repo.findByDistanceBetween(low, high);
	}
	
	@Override
	public List<GarminEvent> findByCaloriesBetween(int low, int high) {
		return repo.findByCaloriesBetween(low, high);
	}
	
	@Override
	public List<GarminEvent> findByTimeBetween(String low, String high) {
		LocalTime lowTime = LocalTime.parse(low);
		LocalTime highTime = LocalTime.parse(high);
		return repo.findByTimeBetween(lowTime, highTime);
	}
	
	@Override
	public List<GarminEvent> findByAscentBetween(int low, int high) {
		return repo.findByAscentBetween(low, high);
	}
	
	@Override
	public List<GarminEvent> findByDescentBetween(int low, int high) {
		return repo.findByDescentBetween(low, high);
	}
	
	@Override
	public List<GarminEvent> findByTimeMovingBetween(String low, String high) {
		LocalTime lowTime = LocalTime.parse(low);
		LocalTime highTime = LocalTime.parse(high);
		return repo.findByTimeMovingBetween(lowTime, highTime);
	}
	
	@Override
	public List<GarminEvent> findByTimeElapsedBetween(String low, String high) {
		LocalTime lowTime = LocalTime.parse(low);
		LocalTime highTime = LocalTime.parse(high);
		return repo.findByTimeElapsedBetween(lowTime, highTime);
	}
	

	@Override
	public GarminEvent create(GarminEvent gEvent) {
		return repo.saveAndFlush(gEvent);
	}

	@Override
	public GarminEvent update(GarminEvent gEvent) {
		repo.save(gEvent);

		GarminEvent updated = null;
		Optional<GarminEvent> op = repo.findById(gEvent.getId());

		if (op.isPresent()) {
			updated = op.get();
		}

		if (updated.getId() != gEvent.getId() || updated.getType().equals(gEvent.getType())) {
			updated = null;
		}

		return updated;
	}

	@Override
	public boolean deleteById(int id) {
		Optional<GarminEvent> op = repo.findById(id);
		if (op.isPresent()) {
			GarminEvent gEvent = op.get();
			if (gEvent != null) {
				repo.delete(gEvent);
			}
		}
		op = repo.findById(id);
		if (op.isPresent()) {
			return false;
		} else {
			return true;
		}
	}

	

}
