package com.example.ManageEvents.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.ManageEvents.Event;
import com.example.ManageEvents.service.EventServiceImpl ;

@RestController
@RequestMapping("/api/events")
public class controller {
    private final EventServiceImpl  service ;

    public controller(EventServiceImpl  service) {
        this.service = service;
    }

    @PostMapping
    public void createNewEvent(@RequestBody Event event) {
        service.createEvent(event) ;
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return service.getAllEvents() ;
    }

    @GetMapping("/{id}")
    public Event getOneEvent(@PathVariable("id") Long id) {
        return service.getEventById(id).orElse(null);
    }

    @PostMapping("/delete/{id}")
    public void deleteOneEvent(@PathVariable("id") Long id) {
        service.deleteEvent(id) ;
    }
}
