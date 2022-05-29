package adminServlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connection.ConnectionString;

/**
 * Servlet implementation class DeletePackage
 */
@WebServlet("/DeletePackage")
public class DeletePackage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("package");
		String place = request.getParameter("place");
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("delete from package where packagename='"+packagename+"'and place='"+place+"'");
			ps.executeUpdate();
			response.sendRedirect("Admin/ModifyPackage.jsp");
			
			} catch (Exception e) {
			e.printStackTrace();
			}
	}

}
