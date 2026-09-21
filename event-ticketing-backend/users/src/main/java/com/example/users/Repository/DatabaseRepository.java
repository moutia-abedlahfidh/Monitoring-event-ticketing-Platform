package com.example.users.Repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.users.Model.user;

public interface DatabaseRepository extends JpaRepository<user,Long>{
    Optional<user> findByEmailAndPassword (String Email,String password) ;
}