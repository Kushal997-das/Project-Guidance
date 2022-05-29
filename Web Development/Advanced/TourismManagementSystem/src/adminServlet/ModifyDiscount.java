package adminServlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import connection.ConnectionString;
import java.sql.*;

/**
 * Servlet implementation class ModifyDiscount
 */
@WebServlet("/ModifyDiscount")
public class ModifyDiscount extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String packagename = request.getParameter("packagename");
		String type = request.getParameter("type");
		String discount = request.getParameter("discount");
		PrintWriter out = response.getWriter();
		
		if(type.equals("modify")){
			try{
				Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement ps = con.prepareStatement("select discount from discount where packagename ='"+packagename+"'");
				ResultSet rs = ps.executeQuery();
				if(rs.next()){
				out.println(rs.getString(1));
				}
			
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else if(type.equals("update")){
			try{
				Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement ps = con.prepareStatement("update discount set discount=? where packagename ='"+packagename+"'");
				ps.setString(1, discount);
				ps.executeUpdate();
				out.println("Discount updated successfully");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}else if(type.equals("deleteDiscount")){
			try{
				Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement ps = con.prepareStatement("delete from discount where packagename ='"+packagename+"'");

				ps.executeUpdate();
				out.println(packagename+" discount deleted successfully");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

}
