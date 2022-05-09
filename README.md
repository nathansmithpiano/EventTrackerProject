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
