package com.example.users.Controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.users.Model.user;
import com.example.users.Service.ServiceUser;
import com.example.users.Service.JwtService;

@RestController 
@RequestMapping ("/api/users")
public class controller {
    private final ServiceUser service ;
    public final JwtService Jwtservice ;
    public controller(ServiceUser service,JwtService Jwtservice){
        this.service = service ;
        this.Jwtservice = Jwtservice ;
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

    @GetMapping("/login")
    public String generateToken() {
        return "Token = "+Jwtservice.generateToken("vgfg");
    }
}
