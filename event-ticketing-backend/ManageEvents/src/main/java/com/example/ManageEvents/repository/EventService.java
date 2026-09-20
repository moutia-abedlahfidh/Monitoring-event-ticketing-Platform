package com.example.ManageEvents.repository;

import java.util.*;

import com.example.ManageEvents.Event;

public interface EventService {
    List<Event> getAllEvents() ;
    Event createEvent(Event event) ;
    void deleteEvent(Long ID) ;
    Optional<Event> getEventById(Long ID) ;
}
