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
 * Servlet implementation class BookTransport
 */
@WebServlet("/BookTransport")
public class BookTransport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String transportType = request.getParameter("transportType");
		String vehicleType = request.getParameter("vehicleType");
		String vehicleName = request.getParameter("vehicleName");
		int vehicleCost = Integer.parseInt(request.getParameter("vehicleCost"));
		String vehicleDate = request.getParameter("vehicleDate");
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		HttpSession session = request.getSession();
		String email =(String) session.getAttribute("email");
		PrintWriter out = response.getWriter();
		
		if(packagename.equals("select")||place.equals("select")||vehicleDate.equals("")){
			out.println("Please enter correct details");
		}else{
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement p = con.prepareStatement("insert into booktransport value(?,?,?,?,?,?,?,?)");
				p.setString(1, transportType);
				p.setString(2, vehicleType);
				p.setString(3, vehicleName);
				p.setInt(4, vehicleCost);
				p.setString(5, vehicleDate);
				p.setString(6, email);
				p.setString(7, packagename);
				p.setString(8, place);
				p.executeUpdate();
				System.out.println(vehicleType);
				out.print("Vehicle name "+vehicleName+" Booked Successfully");
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		}
	}

}
