package userServlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import connection.ConnectionString;

/**
 * Servlet implementation class ModifyRoom1
 */
@WebServlet("/ModifyRoom1")
public class ModifyRoom1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String hotelName = request.getParameter("hotelName");
		String roomType = request.getParameter("roomType");
		String roomSize = request.getParameter("roomSize");
		String roomDate = request.getParameter("roomDate");
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		if(roomDate.equals("")){
			out.println("Please enter correct date");
		}else{
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("update bookroom set roomDate =? where packagename='"+packagename+"'and place='"+place+"' and hotelName='"+hotelName+"'and roomType='"+roomType+"'and roomSize='"+roomSize+"'and email='"+session.getAttribute("email")+"'");
			ps.setString(1,roomDate );
			ps.executeUpdate();
			
			out.println("Room "+hotelName+" modified Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
	}

}
