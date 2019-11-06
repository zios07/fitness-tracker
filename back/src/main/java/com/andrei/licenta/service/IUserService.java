package com.andrei.licenta.service;

import com.andrei.licenta.model.User;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    User banUser(UUID id);

    User findByUsername(String username);

    User updateUser(User user);

    List<User> findAll();

    void deleteUser(UUID id);

    User createUser(User user);

    User unbanUser(UUID id);

  User getConnectedUser();
}
