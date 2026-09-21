package com.example.users.Service;

import org.springframework.stereotype.Service;

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

    @Override
    public Boolean CheckLogin(String email, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'CheckLogin'");
    }
    
}
