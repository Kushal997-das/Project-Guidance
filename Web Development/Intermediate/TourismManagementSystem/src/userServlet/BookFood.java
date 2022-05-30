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
 * Servlet implementation class BookFood
 */
@WebServlet("/BookFood")
public class BookFood extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String type = request.getParameter("type");
		String foodName = request.getParameter("foodName");
		String foodCost = request.getParameter("foodCost");
		String quantity = request.getParameter("quantity");
		int totalCost = Integer.parseInt(request.getParameter("totalCost"));
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		HttpSession session = request.getSession();
		String email =(String) session.getAttribute("email");
		PrintWriter out = response.getWriter();
		
		if(packagename.equals("select")||place.equals("select")||quantity.equals("")||quantity.equals("0")){
			out.println("Please enter correct details");
		}else{
		try{
			Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement p = con.prepareStatement("insert into bookfood value(?,?,?,?,?,?,?,?)");
				p.setString(1, type);
				p.setString(2, foodName);
				p.setString(3, foodCost);
				p.setString(4, quantity);
				p.setInt(5, totalCost);
				p.setString(6, email);
				p.setString(7, packagename);
				p.setString(8, place);
				p.executeUpdate();
				out.print("Food name "+foodName+" Booked Successfully");
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		}
	}

}
