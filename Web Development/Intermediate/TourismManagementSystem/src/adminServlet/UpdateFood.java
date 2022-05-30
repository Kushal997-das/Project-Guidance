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
 * Servlet implementation class UpdateFood
 */
@WebServlet("/UpdateFood")
public class UpdateFood extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String foodType = request.getParameter("foodType");
		String foodName = request.getParameter("foodName");
		String type= request.getParameter("type");
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from food where foodType ='"+foodType +"' and foodName='"+foodName+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				HttpSession session = request.getSession();
				session.setAttribute("foodType", rs.getString(1));
				session.setAttribute("foodName", rs.getString(2));
				session.setAttribute("foodCost", rs.getString(3));
				
				if(type.equals("update")){
				response.sendRedirect("Admin/UpdateFood.jsp");
				}else{
					response.sendRedirect("User/BookFood.jsp");
				}

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
