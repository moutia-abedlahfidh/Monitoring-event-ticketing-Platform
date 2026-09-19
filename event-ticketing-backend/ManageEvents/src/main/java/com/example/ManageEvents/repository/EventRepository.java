package com.example.ManageEvents.repository;
import com.example.ManageEvents.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event,Long>{
    
}
