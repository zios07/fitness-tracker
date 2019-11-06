package com.andrei.licenta.controller;

import com.andrei.licenta.exception.ResourceNotFoundException;
import com.andrei.licenta.model.User;
import com.andrei.licenta.security.JwtTokenUtil;
import com.andrei.licenta.service.IUserService;
import org.jsondoc.core.annotation.ApiPathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/users")
public class UserController {
  @Value("${jwt.header}")
  private String tokenHeader;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @Autowired
  @Qualifier("jwtUserDetailsService")
  private UserDetailsService userDetailsService;

  @Autowired
  private IUserService userService;

  @GetMapping("/authenticated")
  public User getAuthenticatedUser(HttpServletRequest request) {
    String token = request.getHeader(tokenHeader).substring(7);
    String username = jwtTokenUtil.getUsernameFromToken(token);
    User user = userService.findByUsername(username);

    return user;
  }

  @GetMapping("")
  public List<User> getAllUsers() {
    return userService.findAll().stream().map(user -> {
      user.setPassword(null);
      return user;
    }).collect(Collectors.toList());
  }

  @GetMapping("/ban/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> banUser(@PathVariable UUID id) {
    return ResponseEntity.ok(userService.banUser(id));
  }

  @GetMapping("/unban/{id}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> unbanUser(@PathVariable UUID id) {
    return ResponseEntity.ok(userService.unbanUser(id));
  }

  @GetMapping("/username/{username}")
  public ResponseEntity<?> findUserByUsername(@ApiPathParam(name = "username") @PathVariable(value = "username") String username) {
    return ResponseEntity.ok(userService.findByUsername(username));
  }

  @PutMapping("")
  public ResponseEntity<?> updateUser(@RequestBody User user) {
    return ResponseEntity.ok(userService.updateUser(user));
  }

  @PostMapping("")
  public ResponseEntity<?> createUser(@RequestBody User user) {
    return ResponseEntity.ok(userService.createUser(user)); }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteUser(@PathVariable UUID id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }
}
