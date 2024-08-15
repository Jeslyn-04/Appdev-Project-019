package com.example.demo.service.Impl;


import org.springframework.stereotype.Service;

import com.example.demo.entity.entity;
import com.example.demo.exception.exception;
import com.example.demo.mapper.mapper;
import com.example.demo.repository.repo;
import com.example.demo.service.service;
import com.example.dto.dto;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class serviceImpl implements service {

    private repo userRepository;

    @Override
    public dto createUser(dto userDto) {

        entity user = mapper.mapToUser(userDto);
        entity savedUser = userRepository.save(user);
        return mapper.mapToUserDto(savedUser);
    }

    @Override
    public dto getUserById(Long userId) {
        entity user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new exception("user is not exists with given id : " + userId));

        return mapper.mapToUserDto(user);
    }

    @Override
    public List<dto> getAllUsers() {
        List<entity> users = userRepository.findAll();
        return users.stream().map((user) -> mapper.mapToUserDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public dto updateUser(Long userId, dto updatedUser) {

        entity user = userRepository.findById(userId).orElseThrow(
                () -> new exception("user is not exists with given id: " + userId)
        );
        user.setPassword(user.getPassword());
        user.setEmail(user.getEmail());
        user.setWanttoread(updatedUser.getWanttoread());
        user.setCompleted(updatedUser.getCompleted());
        user.setName(updatedUser.getName());
        user.setBio(updatedUser.getBio());
        user.setPreference(updatedUser.getPreference());
        user.setProfile(updatedUser.getProfile());

        entity updateduserObj = userRepository.save(user);

        return mapper.mapToUserDto(updateduserObj);
    }

    @Override
    public void deleteUser(Long userId) {

        entity user = userRepository.findById(userId).orElseThrow(
                () -> new exception("user is not exists with given id: " + userId)
        );

        userRepository.deleteById(userId);
    }
}
