package com.example.ManageEvents.service;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.ManageEvents.Event;
import com.example.ManageEvents.repository.EventRepository;
import com.example.ManageEvents.repository.EventService;

@Service
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository ;

    public EventServiceImpl(EventRepository eventRepository) {
    this.eventRepository = eventRepository;
}

    @Override
    public Event createEvent(Event event) {
        return eventRepository.save(event) ;
    }

    @Override
    public Optional<List<Event>> getAllEvents() {
        return null ;
    }

    @Override
    public void deleteEvent(int ID) {} 

    @Override
    public Optional<Event> getEventById(int ID)
    {
        return null ;
    } 
    

    
}
