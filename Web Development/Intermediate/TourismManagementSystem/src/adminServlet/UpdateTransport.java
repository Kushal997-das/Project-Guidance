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
 * Servlet implementation class UpdateTransport
 */
@WebServlet("/UpdateTransport")
public class UpdateTransport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String transportType = request.getParameter("transportType");
		String vehicleType = request.getParameter("vehicleType");
		String vehicleName = request.getParameter("vehicleName");
		String type = request.getParameter("type");
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from transport where transportType ='"+transportType +"' and vehicleType='"+vehicleType+"'and vehicleName='"+vehicleName+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				HttpSession session = request.getSession();
				session.setAttribute("transportType", rs.getString(1));
				session.setAttribute("vehicleType", rs.getString(2));
				session.setAttribute("vehicleName", rs.getString(3));
				session.setAttribute("vehicleCost", rs.getString(4));
				
				if(type.equals("update")){
				response.sendRedirect("Admin/UpdateTransport.jsp");
				}else{
					response.sendRedirect("User/BookTransport.jsp");
				}

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
