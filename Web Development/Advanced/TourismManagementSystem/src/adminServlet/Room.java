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

/**
 * Servlet implementation class Room
 */
@WebServlet("/Room")
public class Room extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		String roomType = request.getParameter("roomType");
		String roomSize = request.getParameter("roomSize");
		String roomCost = request.getParameter("roomCost");
		PrintWriter out = response.getWriter();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from room where hotelName ='"+hotelName +"' and roomType='"+roomType+"' and roomSize='"+roomSize+"'");
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()){
				out.println("Room alredy exist. Please enter another Room");
				
			}else if(hotelName.equals("")||roomType.equals("")||roomSize.equals("")||roomCost.equals("")){
				out.println("Invalid details");
				
			}else{
				PreparedStatement p = con.prepareStatement("insert into room value(?,?,?,?)");
				p.setString(1, hotelName);
				p.setString(2, roomType);
				p.setString(3, roomSize);
				p.setString(4, roomCost);
				p.executeUpdate();
				out.print("Room Added Successfully");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
