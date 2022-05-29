

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connection.ConnectionString;
import java.sql.*;

/**
 * Servlet implementation class Recover
 */
@WebServlet("/Recover")
public class Recover extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		String email = request.getParameter("email");
		String password = request.getParameter("password");
		
		try {
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement p = con.prepareStatement("select email from register where email='"+email+"'");
			ResultSet rs =p.executeQuery();
			
			if(rs.next()){
			PreparedStatement ps = con.prepareStatement("update register set password =? where email='"+email+"'");
			ps.setString(1, password);
			ps.executeUpdate();
			out.print("Password Reset Successful");
			}else{
				out.println("please enter valid email id");
			}
		
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}

}
