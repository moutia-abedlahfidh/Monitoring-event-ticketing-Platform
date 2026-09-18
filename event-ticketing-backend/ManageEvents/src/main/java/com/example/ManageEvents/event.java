package com.example.ManageEvents;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String venue;
    private String city;
    private LocalDateTime date;
    private BigDecimal priceFrom;
    private Integer availableSeats;

    // Getter/Setter
}