package com.andrei.licenta.model;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "USER")
public class User {
  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", columnDefinition = "BINARY(16)")
  private UUID id;

  @Column(name = "USERNAME", length = 50, unique = true)
  @NotNull
  @Size(min = 4, max = 50)
  private String username;

  @Column(name = "PASSWORD", length = 100)
  @NotNull
  @Size(min = 4, max = 100)
  private String password;

  @Column(name = "FIRSTNAME", length = 50)
  @NotNull
  @Size(min = 4, max = 50)
  private String firstname;

  @Column(name = "LASTNAME", length = 50)
  @NotNull
  @Size(min = 4, max = 50)
  private String lastname;

  @Column(name = "HEIGHT")
  @NotNull
  private double height;

  @Column(name = "WEIGHT")
  @NotNull
  private double weight;

  @Column(name = "BIRTHDAY")
  @NotNull
  private Date birthday;

  @Column(name = "EMAIL", length = 50)
  @NotNull
  @Size(min = 4, max = 50)
  private String email;

  @Column(name = "GENDER")
  @NotNull
  private String gender;

  @Column(name = "ENABLED")
  @NotNull
  private Boolean enabled;

  @Column(name = "LASTPASSWORDRESETDATE")
  @Temporal(TemporalType.TIMESTAMP)
  private Date lastPasswordResetDate;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(
          name = "USER_AUTHORITY",
          joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "ID")},
          inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID")})
  private List<Authority> authorities;

  public User() { }

  public User(@NotNull @Size(min = 4, max = 50) String username, @NotNull @Size(min = 4, max = 100) String password, @NotNull @Size(min = 4, max = 50) String firstname, @NotNull @Size(min = 4, max = 50) String lastname, @NotNull double height, @NotNull double weight, @NotNull Date birthday, @NotNull @Size(min = 4, max = 50) String email, @NotNull String gender, @NotNull Boolean enabled, Date lastPasswordResetDate, List<Authority> authorities) {
    this.username = username;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.height = height;
    this.weight = weight;
    this.birthday = birthday;
    this.email = email;
    this.gender = gender;
    this.enabled = enabled;
    this.lastPasswordResetDate = lastPasswordResetDate;
    this.authorities = authorities;
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

  public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }

    public Date getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Date lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  public Date getBirthday() {
    return birthday;
  }

  @DateTimeFormat(pattern="MM/dd/yyyy")
  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }
}
