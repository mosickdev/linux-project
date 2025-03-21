package dao;

import model.User;
import java.sql.*;

public class UserDAO {
  private Connection conn;

  public UserDAO() throws SQLException {
    String url = "jdbc:mysql://localhost:3306/mydb";
    String user = "root";
    String password = "rootpassword";
    conn = DriverManager.getConnection(url, user, password);
  }

  public boolean insertUser(User user) {
    String query = "INSERT INTO users (username, email, password, name, phone) VALUES (?, ?, ?, ?, ?)";
    try (PreparedStatement pstmt = conn.prepareStatement(query)) {
      pstmt.setString(1, user.getUsername());
      pstmt.setString(2, user.getEmail());
      pstmt.setString(3, user.getPassword()); // 비밀번호 해싱 후 저장
      pstmt.setString(4, user.getName());
      pstmt.setString(5, user.getPhone());
      return pstmt.executeUpdate() > 0;
    } catch (SQLException e) {
      e.printStackTrace();
      return false;
    }
  }
}
