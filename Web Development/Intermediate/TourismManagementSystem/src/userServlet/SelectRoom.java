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
 * Servlet implementation class SelectRoom
 */
@WebServlet("/SelectRoom")
public class SelectRoom extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		HttpSession session =request.getSession();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select hotelName from room where hotelName= '"+hotelName+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
			rs.getString(1);
			session.setAttribute("hotelName", rs.getString(1));
			System.out.println(hotelName);
			}
		
	} catch (Exception e) {
		e.printStackTrace();
	}
	}

}
