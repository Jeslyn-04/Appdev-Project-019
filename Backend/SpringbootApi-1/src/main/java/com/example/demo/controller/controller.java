package com.example.demo.controller;


import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.service;
import com.example.dto.dto;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/api/users")
public class controller {

    private service userService;

    // Build Add User REST API
    @PostMapping
    public ResponseEntity<dto> createUser(@RequestBody dto userDto){
        dto savedUser = userService.createUser(userDto);
        return new ResponseEntity<dto>(savedUser, HttpStatus.CREATED);
    }

    // Build Get User REST API
    @GetMapping("{id}")
    public ResponseEntity<dto> getUserById(@PathVariable("id") Long userId){
        dto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    // Build Get All Users REST API
    @GetMapping
    public ResponseEntity<List<dto>> getAllUsers(){
        List<dto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Build Update User REST API
    @PutMapping("{id}")
    public ResponseEntity<dto> updateUser(@PathVariable("id") Long userId,
                                                      @RequestBody dto updatedUser){
          dto userDto = userService.updateUser(userId, updatedUser);
          return ResponseEntity.ok(userDto);
    }

    // Build Delete User REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully!.");
    }
}
