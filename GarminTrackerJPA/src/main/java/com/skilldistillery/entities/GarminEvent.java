package com.skilldistillery.entities;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "garmin_event")
public class GarminEvent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String type;

	private LocalDateTime date;

	private String title;

	private Double distance;

	private Integer calories;

	private LocalTime time;

	@Column(name = "hr_avg")
	private Integer hrAvg;

	@Column(name = "hr_max")
	private Integer hrMax;

	@Column(name = "aerobic_te")
	private Integer aerobicTe;

	@Column(name = "run_cadence_avg")
	private Integer runCadenceAvg;

	@Column(name = "run_cadence_max")
	private Integer runCadenceMax;

	@Column(name = "pace_avg")
	private LocalTime paceAvg;

	private Integer ascent;

	private Integer descent;

	@Column(name = "time_moving")
	private LocalTime timeMoving;

	@Column(name = "time_elapsed")
	private LocalTime timeElapsed;

	@Column(name = "elevation_min")
	private Integer elevationMin;

	@Column(name = "elevation_max")
	private Integer elevationMax;

	public GarminEvent() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

	public Integer getCalories() {
		return calories;
	}

	public void setCalories(Integer calories) {
		this.calories = calories;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public Integer getHrAvg() {
		return hrAvg;
	}

	public void setHrAvg(Integer hrAvg) {
		this.hrAvg = hrAvg;
	}

	public Integer getHrMax() {
		return hrMax;
	}

	public void setHrMax(Integer hrMax) {
		this.hrMax = hrMax;
	}

	public Integer getAerobicTe() {
		return aerobicTe;
	}

	public void setAerobicTe(Integer aerobicTe) {
		this.aerobicTe = aerobicTe;
	}

	public Integer getRunCadenceAvg() {
		return runCadenceAvg;
	}

	public void setRunCadenceAvg(Integer runCadenceAvg) {
		this.runCadenceAvg = runCadenceAvg;
	}

	public Integer getRunCadenceMax() {
		return runCadenceMax;
	}

	public void setRunCadenceMax(Integer runCadenceMax) {
		this.runCadenceMax = runCadenceMax;
	}

	public LocalTime getPaceAvg() {
		return paceAvg;
	}

	public void setPaceAvg(LocalTime paceAvg) {
		this.paceAvg = paceAvg;
	}

	public Integer getAscent() {
		return ascent;
	}

	public void setAscent(Integer ascent) {
		this.ascent = ascent;
	}

	public Integer getDescent() {
		return descent;
	}

	public void setDescent(Integer descent) {
		this.descent = descent;
	}

	public LocalTime getTimeMoving() {
		return timeMoving;
	}

	public void setTimeMoving(LocalTime timeMoving) {
		this.timeMoving = timeMoving;
	}

	public LocalTime getTimeElapsed() {
		return timeElapsed;
	}

	public void setTimeElapsed(LocalTime timeElapsed) {
		this.timeElapsed = timeElapsed;
	}

	public Integer getElevationMin() {
		return elevationMin;
	}

	public void setElevationMin(Integer elevationMin) {
		this.elevationMin = elevationMin;
	}

	public Integer getElevationMax() {
		return elevationMax;
	}

	public void setElevationMax(Integer elevationMax) {
		this.elevationMax = elevationMax;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		GarminEvent other = (GarminEvent) obj;
		return id == other.id;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("\n*** GarminEvent ***\nid=");
		builder.append(id);
		builder.append("\ntype=");
		builder.append(type);
		builder.append("\ndate=");
		builder.append(date);
		builder.append("\ntitle=");
		builder.append(title);
		builder.append("\ndistance=");
		builder.append(distance);
		builder.append("\ncalories=");
		builder.append(calories);
		builder.append("\ntime=");
		builder.append(time);
		builder.append("\nhrAvg=");
		builder.append(hrAvg);
		builder.append("\nhrMax=");
		builder.append(hrMax);
		builder.append("\naerobicTe=");
		builder.append(aerobicTe);
		builder.append("\nrunCadenceAvg=");
		builder.append(runCadenceAvg);
		builder.append("\nrunCadenceMax=");
		builder.append(runCadenceMax);
		builder.append("\npaceAvg=");
		builder.append(paceAvg);
		builder.append("\nascent=");
		builder.append(ascent);
		builder.append("\ndescent=");
		builder.append(descent);
		builder.append("\ntimeMoving=");
		builder.append(timeMoving);
		builder.append("\ntimeElapsed=");
		builder.append(timeElapsed);
		builder.append("\nelevationMin=");
		builder.append(elevationMin);
		builder.append("\nelevationMax=");
		builder.append(elevationMax);
		builder.append("\n*** END GarminEvent ***");
		return builder.toString();
	}

}
