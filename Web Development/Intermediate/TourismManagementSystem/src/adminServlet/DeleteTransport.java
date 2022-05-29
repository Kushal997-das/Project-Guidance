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
 * Servlet implementation class DeleteTransport
 */
@WebServlet("/DeleteTransport")
public class DeleteTransport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String transportType = request.getParameter("transportType");
		String vehicleType = request.getParameter("vehicleType");
		String vehicleName = request.getParameter("vehicleName");
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("delete from transport where transportType='"+transportType+"'and vehicleType='"+vehicleType+"'and vehicleName='"+vehicleName+"'");
			ps.executeUpdate();
			response.sendRedirect("Admin/ModifyTransport.jsp");
			
			} catch (Exception e) {
			e.printStackTrace();
			}
	}

}
