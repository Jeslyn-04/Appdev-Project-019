package com.example.demo.entity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bio;
    private List<String> completed=new ArrayList<>();
    @Column(name = "email_id")
    private String email;
    @Column(name = "name")
    private String name;


    @Column(name = "password")
    private String password;
    private String preference;
    private String profile;
    private List<String> wanttoread=new ArrayList<>();

}
