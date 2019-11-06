package com.andrei.licenta.repository;

import com.andrei.licenta.model.Authority;
import com.andrei.licenta.model.AuthorityName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
  Authority findByName(AuthorityName authName);
}
