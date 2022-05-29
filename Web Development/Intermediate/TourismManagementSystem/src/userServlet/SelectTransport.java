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
 * Servlet implementation class SelectTransport
 */
@WebServlet("/SelectTransport")
public class SelectTransport extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String transportType = request.getParameter("transportType");
		HttpSession session =request.getSession();
		
		try{
			Connection con=ConnectionString.getCon();//getting db connection
			PreparedStatement ps = con.prepareStatement("select transportType from transport where transportType= '"+transportType+"'");
			ResultSet rs = ps.executeQuery();
			if(rs.next()){
			rs.getString(1);
			session.setAttribute("transportType", rs.getString(1));
			System.out.println(transportType);
			}
		
	} catch (Exception e) {
		e.printStackTrace();
	}
	}

}
