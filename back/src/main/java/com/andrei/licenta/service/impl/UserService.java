package com.andrei.licenta.service.impl;

import com.andrei.licenta.model.Authority;
import com.andrei.licenta.model.AuthorityName;
import com.andrei.licenta.model.User;
import com.andrei.licenta.repository.AuthorityRepository;
import com.andrei.licenta.repository.UserRepository;
import com.andrei.licenta.security.JwtUser;
import com.andrei.licenta.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public User banUser(UUID id) {
        User user = userRepository.getOne(id);
        if (user != null) {
            user.setEnabled(false);
            user = userRepository.save(user);
        }
        return user;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        user.setPassword(null);
        return user;
    }

    @Override
    public User updateUser(User user) {
        User originalUser = userRepository.findById(user.getId()).get();
        if (user.getPassword() == null) {
            user.setPassword(originalUser.getPassword());
        } else {
            user.setLastPasswordResetDate(new Date());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if (user.getEnabled() == null) user.setEnabled(originalUser.getEnabled());
        if (user.getBirthday() == null) user.setBirthday(originalUser.getBirthday());
        user.setUsername(originalUser.getUsername());
//        user.setAuthorities(originalUser.getAuthorities());
        user = userRepository.save(user);
        user.setPassword(null);
        return user;
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public void deleteUser(UUID id) {
        this.userRepository.deleteById(id);
    }

    @Override
    public User createUser(User user) {
        Authority userAuthority = this.authorityRepository.findByName(AuthorityName.ROLE_USER);
        user.setAuthorities(Arrays.asList(userAuthority));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(true);
        return this.userRepository.save(user);
    }

    @Override
    public User unbanUser(UUID id) {
        User user = userRepository.getOne(id);
        if (user != null) {
            user.setEnabled(true);
            user = userRepository.save(user);
        }
        return user;
    }



    @Override
    public User getConnectedUser() {
      JwtUser jwtUser = (JwtUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      return userRepository.findById(jwtUser.getId()).get();
    }
}
