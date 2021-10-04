/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author surbh
 */
public class DbConnection {
    public Connection cn = null;
    public DbConnection()
    {
        try
        {
            Class.forName("com.mysql.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost:3306/book_library","root","");
        }catch(Exception e)
        {
            e.printStackTrace();
        }
    }
}
