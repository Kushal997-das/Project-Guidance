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
 * Servlet implementation class ModifyFood1
 */
@WebServlet("/ModifyFood1")
public class ModifyFood1 extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String foodType = request.getParameter("type");
		String foodName = request.getParameter("foodName");
		String foodCost = request.getParameter("foodCost");
		String quantity = request.getParameter("quantity");
		int totalCost = Integer.parseInt(request.getParameter("totalCost"));
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		
		PrintWriter out = response.getWriter();
		
		HttpSession session = request.getSession();
		
		if(quantity.equals("")||quantity.equals("0")){
			out.println("Please enter correct details");
		}else{
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("update bookfood set quantity =?,totalCost=? where type='"+foodType+"'and foodName='"+foodName+"' and packagename='"+packagename+"'and place='"+place+"'and email='"+session.getAttribute("email")+"'");
			ps.setString(1,quantity );
			ps.setInt(2,totalCost );
			ps.executeUpdate();
			
			out.println("Food "+foodName+" modified Successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
	}

}
