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

import connection.ConnectionString;

/**
 * Servlet implementation class Payment
 */
@WebServlet("/Payment")
public class Payment extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
		
		String packagename = request.getParameter("packagename");
		String due = request.getParameter("due");
		String place = request.getParameter("place");
		String email = request.getParameter("email");
		String cardname = request.getParameter("cardname");
		String cardnumber = request.getParameter("cardnumber");
		String cvv = request.getParameter("cvv");
		
			try{
				Connection con=ConnectionString.getCon();//getting db connection
				PreparedStatement ps = con.prepareStatement("select packagename from payment where packagename='"+packagename+"' and place='"+place+"' and email='"+email+"'");
				ResultSet rs = ps.executeQuery();
				if(rs.next()){
					out.println("Already Paid");
				}else if(cvv.equals("")||cardnumber.equals("")||cardname.equals("")){
					out.println("Invalid details");
				}else{
					PreparedStatement p = con.prepareStatement("insert into payment value(?,?,?,?,?,?,?)");
					p.setString(1, packagename);
					p.setString(2, place);
					p.setString(3, due);
					p.setString(4, email);
					p.setString(5, cardname);
					p.setString(6, cardnumber);
					p.setString(7, cvv);
					p.executeUpdate();
					out.print("Payment Successfull");
				}
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
