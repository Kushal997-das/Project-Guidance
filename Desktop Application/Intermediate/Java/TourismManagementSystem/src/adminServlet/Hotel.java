package adminServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connection.ConnectionString;
import java.sql.*;
/**
 * Servlet implementation class Hotel
 */
@WebServlet("/Hotel")
public class Hotel extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		PrintWriter out = response.getWriter();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select hotelName from hotel where hotelName ='"+hotelName +"'");
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()){
				out.println(""+ hotelName +" alredy exist. Please enter another hotel");
				
			}else if(hotelName.equals("")){
				out.println("Invalid details");
				
			}else{
				PreparedStatement p = con.prepareStatement("insert into hotel value(?)");
				p.setString(1, hotelName);
				p.executeUpdate();
				out.print("Hotel name "+hotelName+" Added Successfully");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
