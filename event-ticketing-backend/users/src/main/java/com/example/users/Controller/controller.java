package com.example.users.Controller;

import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.users.Model.user;
import com.example.users.Service.ServiceUser;

@RestController 
@RequestMapping ("/api/users")
public class controller {
    private final ServiceUser service ;
    public controller(ServiceUser service){
        this.service = service ;
    }

    @PostMapping("/create")
    public void createUser(@RequestBody user user){
        service.createUser(user);
    }

    @PostMapping("/ckeckuser")
    public Optional<user> CheckUser(@RequestBody user user)
    {
        return service.CheckLogin(user.getEmail(), user.getPassword()) ;
    }
}
