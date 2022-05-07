package com.skilldistillery.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.entities.GarminEvent;
import com.skilldistillery.services.GarminEventService;

@RestController
@RequestMapping("api")
public class GarminEventController {
	
	@Autowired
	private GarminEventService gSvc;
	
	@GetMapping("index")
	public List<GarminEvent> index() {
		return gSvc.index();
	}
	
	@GetMapping("{id}")
	public GarminEvent findById(
		@PathVariable Integer id,
		HttpServletResponse res
	) {
		GarminEvent gEvent = gSvc.findById(id);
		if (gEvent == null) {
			res.setStatus(404);
		}
		return gEvent;
	}
	
	@GetMapping("search/date/{low}/{high}")
	public List<GarminEvent> findByDateBetween(
		@PathVariable String low,
		@PathVariable String high,
		HttpServletResponse res
	) {
		return gSvc.findByDateBetween(low, high);
	}
	
	@GetMapping("search/distance/{low}/{high}")
	public List<GarminEvent> findByDistanceBetween(
		@PathVariable Double low,
		@PathVariable Double high,
		HttpServletResponse res
	) {
		return gSvc.findByDistanceBetween(low, high);
	}
	
	@GetMapping("search/calories/{low}/{high}")
	public List<GarminEvent> findByCaloriesBetween(
		@PathVariable Integer low,
		@PathVariable Integer high,
		HttpServletResponse res
	) {
		return gSvc.findByCaloriesBetween(low, high);
	}
	
	@GetMapping("search/time/{low}/{high}")
	public List<GarminEvent> findByTimeBetween(
		@PathVariable String low,
		@PathVariable String high,
		HttpServletResponse res
	) {
		return gSvc.findByTimeBetween(low, high);
	}
	
	@GetMapping("search/ascent/{low}/{high}")
	public List<GarminEvent> findByAscentBetween(
		@PathVariable Integer low,
		@PathVariable Integer high,
		HttpServletResponse res
	) {
		return gSvc.findByAscentBetween(low, high);
	}
	
	@GetMapping("search/descent/{low}/{high}")
	public List<GarminEvent> findByDescentBetween(
		@PathVariable Integer low,
		@PathVariable Integer high,
		HttpServletResponse res
	) {
		return gSvc.findByDescentBetween(low, high);
	}
	
	@GetMapping("search/time/elapsed/{low}/{high}")
	public List<GarminEvent> findByTimeMovingBetween(
		@PathVariable String low,
		@PathVariable String high,
		HttpServletResponse res
	) {
		return gSvc.findByTimeMovingBetween(low, high);
	}
	
	@GetMapping("search/time/moving/{low}/{high}")
	public List<GarminEvent> findByTimeElapsedBetween(
		@PathVariable String low,
		@PathVariable String high,
		HttpServletResponse res
	) {
		return gSvc.findByTimeElapsedBetween(low, high);
	}
	
	@PostMapping("create")
	public GarminEvent create(
			@RequestBody GarminEvent gEvent,
			HttpServletRequest req,
			HttpServletResponse res
	) {
		try {
			gSvc.create(gEvent);
			res.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(gEvent.getId());
			res.setHeader("Location", url.toString());
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			gEvent = null;
		}
		
		return gEvent;
	}
	
	@PutMapping("update/{id}")
	private GarminEvent update(
			@RequestBody GarminEvent gEvent,
			HttpServletResponse res
	) {
		try {
			gSvc.update(gEvent);
			if (gEvent == null) {
				res.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			gEvent = null;
		}
		return gEvent;
	}
	
	@DeleteMapping("delete/{id}")
	private void delete(
			@PathVariable Integer id,
			HttpServletResponse res
	) {
		if (gSvc.deleteById(id)) {
			res.setStatus(204);
		} else {
			res.setStatus(404);
		}
	}
	

}
