package adminServlet;

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
 * Servlet implementation class UpdateFood1
 */
@WebServlet("/UpdateFood1")
public class UpdateFood1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String foodType = request.getParameter("type");
		String foodName = request.getParameter("foodName");
		String foodCost = request.getParameter("foodCost");
		
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("update food set foodtype =?,foodname=?,foodcost=? where foodType='"+foodType+"'and foodName='"+foodName+"'");
			ps.setString(1,foodType );
			ps.setString(2,foodName );
			ps.setString(3,foodCost );
			System.out.println(foodCost);
			System.out.println(foodType);
			System.out.println(foodName);
			ps.executeUpdate();
			
			out.println("Food "+foodName+" modified Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
