package com.example.demo.mapper;

import com.example.demo.entity.entity;
import com.example.dto.dto;

public class mapper {

    public static dto mapToUserDto(entity user){
        return new dto(
                user.getId(),
                user.getBio(),
                user.getCompleted(),
                user.getEmail(),
                user.getName(),
                user.getPassword(),
                user.getPreference(),
                user.getProfile(),
                user.getWanttoread()
        );
    }
    public static entity mapToUser(dto userDto){
        return new entity(
                userDto.getId(),
                userDto.getBio(),
                userDto.getCompleted(),
                userDto.getEmail(),
                userDto.getName(),
                userDto.getPassword(),
                userDto.getPreference(),
                userDto.getProfile(),
                userDto.getWanttoread()
        );
    }
}