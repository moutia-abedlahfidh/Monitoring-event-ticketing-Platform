package com.example.users.Repository;

import java.util.Optional;

import com.example.users.Model.user;


public interface UserServiceRepository {
    public void createUser(user user) ;
    public void saveToken(user u,String token) ;
    public Optional<user> CheckLogin(String email,String password) ;
}
