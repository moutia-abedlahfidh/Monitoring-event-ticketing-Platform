package com.example.users.Controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.users.Service.ServiceUser ;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.users.Model.user;
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
    public ResponseEntity<Map<String,String>> createUser(@RequestBody user user){
        user created_user = service.createUser(user) ;
        if (created_user != null) {
            String token = Jwtservice.generateToken(user.getEmail());
            service.saveToken(user, token);
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "E-Mail oder Passwort falsch"));
    }

    @PostMapping("/ckeckuser")
    public Optional<user> CheckUser(@RequestBody user user)
    {
        return service.CheckLogin(user.getEmail(), user.getPassword()) ;
    }
    public record LoginRequest(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody LoginRequest req) 
    {
        Optional<user> found = service.CheckLogin(req.email(),req.password()) ;
        if (found.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "E-Mail oder Passwort falsch"));
        }
        String token = Jwtservice.generateToken(found.get().getEmail());
        service.saveToken(found.get(), token);
        return ResponseEntity.ok(Map.of("token", token));
        
    } 

}
