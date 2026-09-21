package com.example.users.Repository;

import com.example.users.Model.user;

public interface UserServiceRepository {
    public void createUser(user user) ;
    public Boolean CheckLogin(String email,String password) ;
}
