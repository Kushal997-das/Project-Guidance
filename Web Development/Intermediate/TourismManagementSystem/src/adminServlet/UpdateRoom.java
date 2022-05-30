package adminServlet;

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
 * Servlet implementation class UpdateRoom
 */
@WebServlet("/UpdateRoom")
public class UpdateRoom extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		String roomType = request.getParameter("roomType");
		String roomSize = request.getParameter("roomSize");
		String type = request.getParameter("type");
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from room where hotelName ='"+hotelName +"' and roomType='"+roomType+"'and roomSize='"+roomSize+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				HttpSession session = request.getSession();
				session.setAttribute("hotelName", rs.getString(1));
				session.setAttribute("roomType", rs.getString(2));
				session.setAttribute("roomSize", rs.getString(3));
				session.setAttribute("roomCost", rs.getString(4));

				if(type.equals("update")){
				response.sendRedirect("Admin/UpdateRoom.jsp");
				}else{
					response.sendRedirect("User/BookRoom.jsp");
				}

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
