# Cloud-Native Event Ticketing Platform

A **microservices-based event ticketing platform** developed with **Spring Boot, Docker and Kubernetes**, with integrated application monitoring using **Prometheus and Grafana**.

## 🚀 Features

* **Microservices Architecture** with:

  * API Gateway
  * Users Service
  * Events Service
  * Frontend
* **Spring Boot** for backend microservices
* **Docker** for containerization
* **Kubernetes** for deployment, service discovery, scaling and self-healing
* **Prometheus & Grafana** for application and infrastructure monitoring
* Monitoring of metrics such as:

  * CPU and memory usage
  * Request rate
  * Response time
  * Application health
* **Horizontal scaling** through multiple Kubernetes Pods
* Kubernetes **Services** for communication between microservices

## 🏗️ Architecture

```text
                    ┌──────────────┐
                    │   Frontend   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ API Gateway  │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 ▼                   ▼
          ┌──────────────┐    ┌──────────────┐
          │ Users Service│    │Events Service│
          └──────────────┘    └──────────────┘

                    Kubernetes
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        Prometheus              Grafana
        (Metrics)             (Dashboards)
```

## 🛠️ Technologies

**Backend:** Java, Spring Boot, REST APIs
**Architecture:** Microservices, API Gateway
**Containerization:** Docker
**Orchestration:** Kubernetes
**Monitoring:** Prometheus, Grafana
**Frontend:** Angular
**Build:** Gradle
**Version Control:** Git / GitHub

## 🎯 Project Goals

The project demonstrates how a distributed application can be **containerized, deployed, monitored and scaled** using modern cloud-native technologies. The Kubernetes configuration is designed to support multiple replicas of individual microservices and provide self-healing and service discovery.
