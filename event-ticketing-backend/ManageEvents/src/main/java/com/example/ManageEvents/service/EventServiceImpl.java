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
        try{
            return eventRepository.save(event) ;
        }catch(Exception e) {
            System.out.println(e);
        }
        return null ;
        
    }

    @Override
    public List<Event> getAllEvents() {
        try{
            return eventRepository.findAll() ;
        }catch(Exception e)
        {
            System.out.println(e);
        }
        return null ;
    }

    @Override
    public void deleteEvent(Long ID) {
        try{
            eventRepository.deleteById(ID) ;
        }catch(Exception e)
        {
            System.out.println(e);
        }
    } 

    @Override
    public Optional<Event> getEventById(Long ID)
    {
        try{
            return eventRepository.findById(ID) ;
        }catch(Exception e) {
            System.out.println(e);
        }
        return null ;
    } 
    

    
}
