package com.skilldistillery.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class GarminEventTest {

	private static EntityManagerFactory emf;
	private static EntityManager em;
	private GarminEvent gEvent;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("GarminTrackerJPA");
	}
	
	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}
	
	@BeforeEach
	void setUp() {
		em = emf.createEntityManager();
		gEvent = em.find(GarminEvent.class, 1);
	}
	
	@AfterEach
	void tearDown() {
		em.close();
		gEvent = null;
	}

	@Test
	void test_Event_mapping() {
		assertNotNull(gEvent);
		assertEquals(1, gEvent.getId());
		assertEquals("Running", gEvent.getType());
	}

}
