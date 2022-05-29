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
 * Servlet implementation class ModifyRoom
 */
@WebServlet("/ModifyRoom")
public class ModifyRoom extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		String roomType = request.getParameter("roomType");
		String roomSize = request.getParameter("roomSize");
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		HttpSession session = request.getSession();
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from bookroom where hotelName ='"+hotelName +"' and roomType='"+roomType+"'and roomSize='"+roomSize+"'and email='"+session.getAttribute("email")+"'and packagename='"+packagename+"'and place='"+place+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				
				session.setAttribute("hotelName1", rs.getString(1));
				session.setAttribute("roomType1", rs.getString(2));
				session.setAttribute("roomSize1", rs.getString(3));
				session.setAttribute("roomCost1", rs.getInt(4));
				session.setAttribute("roomDate1", rs.getString(5));
				session.setAttribute("packagename", rs.getString(7));
				session.setAttribute("place", rs.getString(8));

				response.sendRedirect("User/UpdateRoom.jsp");

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
