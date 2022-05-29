package userServlet;

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
import javax.servlet.http.HttpSession;

import connection.ConnectionString;

/**
 * Servlet implementation class BookPackage
 */
@WebServlet("/BookPackage")
public class BookPackage extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		String days = request.getParameter("days");
		String packageCost = request.getParameter("packageCost");
		String noofPersons = request.getParameter("noofPersons");
		int totalcost = Integer.parseInt(request.getParameter("totalcost"));
		HttpSession session = request.getSession();
		String email =(String) session.getAttribute("email");
		PrintWriter out = response.getWriter();
		
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select packagename from bookpackage where packagename='"+packagename+"' and place='"+place+"' and email='"+email+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				out.println("Package already booked");
				
			}else if(noofPersons.equals("")||noofPersons.equals("0")){
				out.println("Please enter no of persons");
				
			}else{
				PreparedStatement p = con.prepareStatement("insert into bookpackage(packagename,place,packageCost,days,noofPersons,totalCost,email) value(?,?,?,?,?,?,?)");
				p.setString(1, packagename);
				p.setString(2, place);
				p.setString(3, packageCost);
				p.setString(4, days);
				p.setString(5, noofPersons);
				p.setInt(6, totalcost);
				p.setString(7, email);
				p.executeUpdate();
				out.print("Package name "+packagename+" Booked Successfully");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
