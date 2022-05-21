# EventTrackerProject

  -- Developed for Skill Distillery Bootcamp Cohort 32 --

### Description

  This project uses REST and jparepository to perform CRUD and search procedures through a JSON-based API.  The database consists of one table - garmin_event - containing my personal activities imported through Garmin Connect.

### Cool Features

  It's fun to see an object created and retrieved through JSON and Postman.  It's also interesting to see my real-life activity data displayed and to be able to study, search, etc.  This should prove interesting in future developments of the same data/project.

### Technologies Used

- Java
- MySql
- MAMP
- MYSQL Workbench
- Spring Boot
- JPA
- jparepository
- Gradle
- Spring Tool Suite 4
- Postman
- Atom
- Github
- Terminal
- Garmin Connect (for exporting data)
- Google Chrome
- MacBook Pro Retina 2015

### Routes
Each of these routes speaks to a specific method and mapping in the controller class.  Parameters and/or JSON body is received by the controller, which sends data or a request to the corresponding method in the service class, which in turn sends data or a request to the repository, which may or may not use an implemented method from the jparepository interface.
- http://localhost:8082/api/index : display all objects in GarminEvent table
- http://localhost:8082/api/1 : display one specific GarminEvent by id
- http://localhost:8082/api/create : create new GarminEvent
- http://localhost:8082/api/update/1 : update by id (int)
- http://localhost:8082/api/delete/1 : delete by id (int)
- http://localhost:8082/api/search/distance/1/10 : search by distance between (double low /double high)
- http://localhost:8082/api/search/calories/500/1500 : search by calories burnt between (int low / int high)
- http://localhost:8082/api/search/date/2019-01-01/2020-12-31 : search by date between (yyyy-mm-dd low / yyyy-mm-dd high)
- http://localhost:8082/api/search/time/moving/04:00:00/23:00:00 : search by time moving between (hh-mm-ss low / hh-mm-ss high)
- http://localhost:8082/api/search/time/elapsed/04:00:00/23:00:00 : search by time elapsed between (hh-mm-ss low / hh-mm-ss high)
- http://localhost:8082/api/search/ascent/5000/50000 : search by total ascent between (int low / int high)
- http://localhost:8082/api/search/descent/5000/50000 : search by total descent between (int low / int high)

### AWS routes
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/index : display all objects in GarminEvent table
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/1 : display one specific GarminEvent by id
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/create : create new GarminEvent
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/update/1 : update by id (int)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/delete/1 : delete by id (int)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/distance/1/10 : search by distance between (double low /double high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/calories/500/1500 : search by calories burnt between (int low / int high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/date/2019-01-01/2020-12-31 : search by date between (yyyy-mm-dd low / yyyy-mm-dd high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/time/moving/04:00:00/23:00:00 : search by time moving between (hh-mm-ss low / hh-mm-ss high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/time/elapsed/04:00:00/23:00:00 : search by time elapsed between (hh-mm-ss low / hh-mm-ss high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/ascent/5000/50000 : search by total ascent between (int low / int high)
- http://52.52.235.108:8080/GarminTrackerRestApplication/api/search/descent/5000/50000 : search by total descent between (int low / int high)

### Thoughts For The Future

  This is our first weekend project using jparepository.  This simplifies so many things and opens up much more potential for functional queries, nested queries, etc.  I am excited to see where we take this project next week.







## The Data

### garmindb
The database contains only one table, `garmin_event`:

```
+-----------------+-------------+------+-----+---------+----------------+
| Field           | Type        | Null | Key | Default | Extra          |
+-----------------+-------------+------+-----+---------+----------------+
| id              | int(11)     | NO   | PRI | NULL    | auto_increment |
| type            | varchar(45) | NO   |     | NULL    |                |
| date            | datetime    | YES  |     | NULL    |                |
| title           | varchar(45) | YES  |     | NULL    |                |
| distance        | double      | YES  |     | NULL    |                |
| calories        | int(11)     | YES  |     | NULL    |                |
| time            | time        | YES  |     | NULL    |                |
| hr_avg          | int(11)     | YES  |     | NULL    |                |
| hr_max          | int(11)     | YES  |     | NULL    |                |
| aerobic_te      | double      | YES  |     | NULL    |                |
| run_cadence_avg | int(11)     | YES  |     | NULL    |                |
| run_cadence_max | int(11)     | YES  |     | NULL    |                |
| pace_avg        | time        | YES  |     | NULL    |                |
| ascent          | int(11)     | YES  |     | NULL    |                |
| descent         | int(11)     | YES  |     | NULL    |                |
| time_moving     | time        | YES  |     | NULL    |                |
| time_elapsed    | time        | YES  |     | NULL    |                |
| elevation_min   | int(11)     | YES  |     | NULL    |                |
| elevation_max   | int(11)     | YES  |     | NULL    |                |
+-----------------+-------------+------+-----+---------+----------------+
```

Sample record with id=1:

```
+----+---------------+---------------------+-----------------------+----------+----------+----------+--------+--------+------------+-----------------+-----------------+----------+--------+---------+-------------+--------------+---------------+---------------+
| id | type          | date                | title                 | distance | calories | time     | hr_avg | hr_max | aerobic_te | run_cadence_avg | run_cadence_max | pace_avg | ascent | descent | time_moving | time_elapsed | elevation_min | elevation_max |
+----+---------------+---------------------+-----------------------+----------+----------+----------+--------+--------+------------+-----------------+-----------------+----------+--------+---------+-------------+--------------+---------------+---------------+
|  1 | Trail Running | 2022-04-03 15:12:06 | Boulder Trail Running |     8.17 |     1426 | 03:36:43 |    112 |    165 |        3.1 |              59 |             248 | 00:26:32 |   7618 |    7608 | 02:41:05    | 03:41:22     |          5706 |          8438 |
+----+---------------+---------------------+-----------------------+----------+----------+----------+--------+--------+------------+-----------------+-----------------+----------+--------+---------+-------------+--------------+---------------+---------------+
```

For simplicity's sake, only two fields are non-null: id (generated, auto-increment), and type.


### GarminTrackerJPA
<table>
<tr>
<th>JPA Entity</th>
<th>Angular model</th>
</tr>
<tr>
<td>

```java
@Entity
@Table(name = "garmin_event")
public class GarminEvent {

	@Id
	@GeneratedValue(
        strategy =
            GenerationType.IDENTITY)
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
}
```
</td>
<td>
</td>
</tr>
</table>
