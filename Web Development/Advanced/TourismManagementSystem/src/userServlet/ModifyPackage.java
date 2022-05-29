package userServlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import connection.ConnectionString;

/**
 * Servlet implementation class ModifyPackage
 */
@WebServlet("/ModifyPackage")
public class ModifyPackage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("package");
		String place = request.getParameter("place");
		HttpSession session = request.getSession();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from bookpackage where packagename ='"+packagename +"' and place='"+place+"'and email='"+session.getAttribute("email")+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				session.setAttribute("packageName1", rs.getString(1));
				session.setAttribute("placeName1", rs.getString(2));
				session.setAttribute("cost1", rs.getString(3));
				session.setAttribute("days1", rs.getString(4));
				session.setAttribute("persons1", rs.getString(5));
				session.setAttribute("totalCost1", rs.getInt(6));
				response.sendRedirect("User/UpdatePackage.jsp");

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
