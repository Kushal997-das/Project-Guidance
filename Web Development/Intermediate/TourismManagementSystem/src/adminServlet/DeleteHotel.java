package adminServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;

import connection.ConnectionString;

/**
 * Servlet implementation class DeleteHotel
 */
@WebServlet("/DeleteHotel")
public class DeleteHotel extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		PrintWriter out = response.getWriter();
		
		try {
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("Delete from hotel where hotelName='"+hotelName+"'");
			ps.executeUpdate();

			PreparedStatement p = con.prepareStatement("Delete from room where hotelName='"+hotelName+"'");
			p.executeUpdate();
			
			out.println("Hotel "+hotelName+" deleted Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
