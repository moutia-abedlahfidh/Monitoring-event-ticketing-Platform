package com.example.ManageEvents.repository;

import java.util.*;

import com.example.ManageEvents.Event;

public interface EventService {
    Optional<List<Event>> getAllEvents() ;
    Event createEvent(Event event) ;
    void deleteEvent(int ID) ;
    Optional<Event> getEventById(int ID) ;
}
