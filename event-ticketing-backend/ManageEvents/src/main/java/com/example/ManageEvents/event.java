package com.example.ManageEvents;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import jakarta.persistence.Table;


@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String city;
    private LocalDateTime date;
    private BigDecimal priceFrom;
    private Integer availableSeats;

    // Getter/Setter

    public Event (String title,String city,LocalDateTime date,BigDecimal priceFrom,Integer availableSeats) {
        this.title = title ;
        this.city = city ;
        this.date = date ;
        this.priceFrom = priceFrom ;
        this.availableSeats = availableSeats ;
    }
}