# EcoShmel

## Overview

**EcoShmel** is a backend prototype for an environmental monitoring and alert system. It was designed to receive readings from simulated sensors built in Wokwi, such as temperature and water-level sensors, and compare those readings against threshold values stored in a database.

When a sensor reading exceeded its configured threshold, the system would trigger an alert and notify users located within that sensor's monitoring zone.

EcoShmel was an early step toward what later became [EONET Tracker](https://github.com/APAXIC/nasa-disaster-tracker). After discovering NASA's EONET API, I decided to discontinue this prototype and develop a new application focused on monitoring real-world natural events through NASA's data instead.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Database hosting | MongoDB Atlas |
| Sensor simulation | Wokwi |

## Author

- **Andrii Vus**  
  GitHub:  https://github.com/APAXIC  
  LinkedIn:  https://www.linkedin.com/in/andrii-vus/  
  Email:  irishardron@gmail.com