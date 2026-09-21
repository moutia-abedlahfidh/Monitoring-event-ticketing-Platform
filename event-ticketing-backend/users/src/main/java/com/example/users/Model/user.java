package com.example.users.Model;

import jakarta.persistence.*;

@Entity
@Table(name="users")
public class user {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id ;
    private String Vorname ;
    private String Nachname ;
    private String email ;
    private String password ;

    protected user() {}
    public user(String Vorname,String Nachname,String Email,String Password) {
        this.Vorname = Vorname ;
        this.Nachname = Nachname ;
        this.email = Email ;
        this.password = Password ;
    }

    // Getter
    public Long getId() { return id; }
    public String getVorname() {
        return Vorname ;
    }
    public String getNachname() {
        return Nachname ;
    }
    public String getEmail() {
        return email ;
    }
    public String getPassword() {
        return password ;
    }

    //Setter
    public void SetEmail(String email){
        this.email=email ;
    }
    public void setVorname(String Vorname){
        this.Vorname=Vorname ;
    }
    public void setNachname(String Nachname){
        this.Nachname=Nachname ;
    }
}
