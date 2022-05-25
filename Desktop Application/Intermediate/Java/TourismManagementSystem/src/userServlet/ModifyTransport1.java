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
 * Servlet implementation class ModifyTransport1
 */
@WebServlet("/ModifyTransport1")
public class ModifyTransport1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String transportType = request.getParameter("transportType");
		String vehicleType = request.getParameter("vehicleType");
		String vehicleName = request.getParameter("vehicleName");
		String vehicleDate = request.getParameter("vehicleDate");
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		
		if(vehicleDate.equals("")){
			out.println("Please enter correct date");
		}else{
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("update booktransport set vehicleDate =? where transportType='"+transportType+"'and vehicleType='"+vehicleType+"'and vehicleName='"+vehicleName+"' and packagename='"+packagename+"'and place='"+place+"'and email='"+session.getAttribute("email")+"'");
			ps.setString(1,vehicleDate );
			ps.executeUpdate();
			
			out.println("vehicle "+vehicleName+" modified Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
	}

}
