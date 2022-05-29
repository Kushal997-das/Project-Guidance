package adminServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.sql.*;
import connection.ConnectionString;

/**
 * Servlet implementation class UpdatePackage1
 */
@WebServlet("/UpdatePackage1")
public class UpdatePackage1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		String days = request.getParameter("days");
		String packageCost = request.getParameter("packageCost");
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("update package set packagename =?,place=?,cost=?,days=? where packagename='"+packagename+"'and place='"+session.getAttribute("placeName")+"'");
			ps.setString(1,packagename );
			ps.setString(2,place );
			ps.setString(3,packageCost );
			ps.setString(4,days );
			ps.executeUpdate();
			
			out.println("Package "+packagename+" modified Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
