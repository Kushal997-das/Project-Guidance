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
 * Servlet implementation class Discount
 */
@WebServlet("/Discount")
public class Discount extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("packagename");
		String discount = request.getParameter("discount");
		PrintWriter out = response.getWriter();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from discount where packagename='"+packagename+"'");
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()){
				out.println("Discount alredy exist.");
				
			}else if(packagename.equals("")||discount.equals("")){
				out.println("Invalid details");
				
			}else{
				PreparedStatement p = con.prepareStatement("insert into discount value(?,?)");
				p.setString(1, packagename);
				p.setString(2, discount);
				p.executeUpdate();
				out.print("Discount Added Successfully");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
