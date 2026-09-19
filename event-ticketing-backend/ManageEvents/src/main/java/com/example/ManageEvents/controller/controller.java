package com.example.ManageEvents.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
