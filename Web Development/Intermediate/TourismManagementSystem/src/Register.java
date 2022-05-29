

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import connection.ConnectionString;
import java.sql.*;
/**
 * Servlet implementation class Register
 */
@WebServlet("/Register")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String mobile = request.getParameter("mobile");
		HttpSession session = request.getSession();
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement p = con.prepareStatement("select email from register where email=?");
			p.setString(1, email);
			ResultSet rs = p.executeQuery();
			if(rs.next()){
				response.sendRedirect("home/Register.jsp");
				session.setAttribute("errormess","Username already existed, Please try another");
				out.println("Username already existed, Please try another");
			}else{
			PreparedStatement ps=con.prepareStatement("insert into register values(?,?,?,?)");//creating statment to run query
			ps.setString(1,name);		
			ps.setString(2,email);	
			ps.setString(3,password);		
			ps.setString(4,mobile);		
			ps.executeUpdate();
			session.setAttribute("SuccessMess","Successfully registered");
			out.println("Successfully registered");
			response.sendRedirect("home/Register.jsp");
			}
		}catch(Exception e){
			e.printStackTrace();
		}
	}

}
