package servlet;

import dao.UserDAO;
import model.User;
import org.mindrot.jbcrypt.BCrypt;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import org.json.JSONObject;

@WebServlet("/signup")
public class SignupServlet extends HttpServlet {
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    response.setContentType("application/json");
    PrintWriter out = response.getWriter();
    JSONObject jsonResponse = new JSONObject();

    String username = request.getParameter("username");
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    String name = request.getParameter("name");
    String phone = request.getParameter("phone");

    if (username == null || email == null || password == null || name == null || phone == null) {
      jsonResponse.put("success", false);
      jsonResponse.put("message", "모든 필드를 입력하세요.");
      out.print(jsonResponse.toString());
      return;
    }

    // 비밀번호 해싱
    String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

    try {
      UserDAO userDAO = new UserDAO();
      User newUser = new User(username, email, hashedPassword, name, phone);
      boolean success = userDAO.insertUser(newUser);

      if (success) {
        jsonResponse.put("success", true);
        jsonResponse.put("message", "회원가입이 완료되었습니다.");
      } else {
        jsonResponse.put("success", false);
        jsonResponse.put("message", "회원가입에 실패했습니다.");
      }
    } catch (Exception e) {
      jsonResponse.put("success", false);
      jsonResponse.put("message", "서버 오류: " + e.getMessage());
    }

    out.print(jsonResponse.toString());
  }
}
