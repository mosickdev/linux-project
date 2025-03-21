package model;

public class User {
  private String username;
  private String email;
  private String password;
  private String name;
  private String phone;

  public User(String username, String email, String password, String name, String phone) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.name = name;
    this.phone = phone;
  }

  public String getUsername() {
    return username;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getName() {
    return name;
  }

  public String getPhone() {
    return phone;
  }
}
