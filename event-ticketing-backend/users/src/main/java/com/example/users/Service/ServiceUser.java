package com.example.users.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import ch.qos.logback.core.subst.Token;
import com.example.users.Model.user;
import com.example.users.Repository.DatabaseRepository;
import com.example.users.Repository.UserServiceRepository;

@Service
public class ServiceUser implements UserServiceRepository{
    private final DatabaseRepository databaseRepository ;

    public ServiceUser(DatabaseRepository databaseRepository)
    {
        this.databaseRepository = databaseRepository ;
    }
    @Override
    public void createUser(user user) {
        // TODO Generate New User
        try{
            databaseRepository.save(user);
        }catch(Exception e)
        {
            throw new RuntimeException("Fehler beim erstellen des Users ",e);
        }
    }

    //TODO create Methode to update Token
    @Override
    public void saveToken(user u,String token)
    {
        u.setCurrentToken(token);
        databaseRepository.save(u);
    }

    @Override
    public Optional<user> CheckLogin(String email,String password) {
        try{
            Optional<user> user_exists = databaseRepository.findByEmailAndPassword(email,password);
            if (user_exists != null) {
                return user_exists ;
            } else {
                return null ;
            }

        }catch(Exception e)
        {
            throw new RuntimeException("Fehler beim erstellen des Users ",e);
        }
    }
    
}
