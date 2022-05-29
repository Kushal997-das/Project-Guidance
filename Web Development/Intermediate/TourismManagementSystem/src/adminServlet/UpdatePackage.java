package adminServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import connection.ConnectionString;

/**
 * Servlet implementation class UpdatePackage
 */
@WebServlet("/UpdatePackage")
public class UpdatePackage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("package");
		String place = request.getParameter("place");
		String type=request.getParameter("type");
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from package where packagename ='"+packagename +"' and place='"+place+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				HttpSession session = request.getSession();
				session.setAttribute("packageName", rs.getString(2));
				session.setAttribute("placeName", rs.getString(3));
				session.setAttribute("cost", rs.getString(4));
				session.setAttribute("days", rs.getString(5));
				if(type.equals("update")){
					response.sendRedirect("Admin/UpdatePackage.jsp");
				}else{
					response.sendRedirect("User/BookPackage.jsp");
				}

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}
}


