package com.example.users.Model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class user {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long Id ;
    private String Vorname ;
    private String Nachname ;
    private String Email ;
    private String Password ;

    protected user() {}
    public user(String Vorname,String Nachname,String Email,String Password) {
        this.Vorname = Vorname ;
        this.Nachname = Nachname ;
        this.Email = Email ;
        this.Password = Password ;
    }

    // Getter
    public String getVorname() {
        return Vorname ;
    }
    public String getNachname() {
        return Nachname ;
    }
    public String getEmail() {
        return Email ;
    }
    public String getPassword() {
        return Password ;
    }

    //Setter
    public void SetEmail(String email){
        this.Email=email ;
    }
    public void setVorname(String Vorname){
        this.Vorname=Vorname ;
    }
    public void setNachname(String Nachname){
        this.Nachname=Nachname ;
    }
}
