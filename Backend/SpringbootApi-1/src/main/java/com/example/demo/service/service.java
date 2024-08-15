package com.example.demo.service;


import java.util.List;

import com.example.dto.dto;

public interface service {
    dto createUser(dto UserDto);

    dto getUserById(Long UserId);

    List<dto> getAllUsers();

    dto updateUser(Long userId, dto updatedUser);

    void deleteUser(Long UserId);
}
