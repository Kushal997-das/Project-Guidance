package userServlet;

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
 * Servlet implementation class ModifyFood
 */
@WebServlet("/ModifyFood")
public class ModifyFood extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String foodType = request.getParameter("foodType");
		String foodName = request.getParameter("foodName");
		String packagename = request.getParameter("packagename");
		String place = request.getParameter("place");
		HttpSession session = request.getSession();
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select * from bookfood where type ='"+foodType +"' and foodName='"+foodName+"'and email='"+session.getAttribute("email")+"'and packagename='"+packagename+"'and place='"+place+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
				session.setAttribute("foodType1", rs.getString(1));
				session.setAttribute("foodName1", rs.getString(2));
				session.setAttribute("foodCost1", rs.getString(3));
				session.setAttribute("quantity", rs.getString(4));
				session.setAttribute("totalCost", rs.getInt(5));
				session.setAttribute("packagename", rs.getString(7));
				session.setAttribute("place", rs.getString(8));
				

					response.sendRedirect("User/UpdateFood.jsp");

			}
		} catch (Exception e) {
		e.printStackTrace();
		}
	}

}
