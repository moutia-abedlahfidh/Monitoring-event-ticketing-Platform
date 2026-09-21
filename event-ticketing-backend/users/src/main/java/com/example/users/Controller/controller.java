package com.example.users.Controller;

import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/ckeckuser")
    public void CheckUser(String Email,String Password)
    {
        
    }
}
