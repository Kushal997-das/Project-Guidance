/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package impl;

import bInterface.BookInterface;
import entity.BookEntity;
import entity.Issue;
import entity.LoginEntity;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import util.DbConnection;

/**
 *
 * @author surbh
 */
public class Impl implements BookInterface {

    DbConnection db = new DbConnection();

    @Override
    public boolean update(String bookid,int total) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("update add_book set no_of_books=? where id=?");

            ps.setInt(1, total);
            ps.setString(2, bookid);
            int i = ps.executeUpdate();
            if (i > 0) {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public BookEntity search(String id) {
        BookEntity be = null;
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from add_book where id=?");
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                be = new BookEntity(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return be;
    }

    @Override
    public boolean insert(BookEntity be) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("insert into add_book values(?,?,?,?,?,?)");
            ps.setString(1, be.getId());
            ps.setString(2, be.getName());
            ps.setString(3, be.getAuthor());
            ps.setString(4, be.getFaculty());
            ps.setString(5, be.getDescription());
            ps.setInt(6, be.getNoOfBooks());
            int i = ps.executeUpdate();
            if (i > 0) {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public BookEntity check(String id) {
        BookEntity be = null;
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from add_book where id=?");
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            {
                be = new BookEntity(id, rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return be;
    }

    @Override
    public boolean checkstatus(int stid, String status) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from issue_book where studentid=? and status=?");
            ps.setInt(1, stid);
            ps.setString(2, status);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public boolean issuebook(Issue is) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("insert into issue_book values(?,?,?,?,?,?,?,?,?,?,?)");
            ps.setInt(1,is.getStudentid());
            ps.setString(2,is.getName());
            ps.setString(3,is.getAddress());
            ps.setString(4,is.getFaculty());
            ps.setString(5,is.getGender());
            ps.setString(6,is.getPhone());
            ps.setString(7,is.getBookid());
            ps.setString(8,is.getBookname());
            ps.setString(9,is.getIssue_date());
            ps.setString(10,is.getReturn_date());
            ps.setString(11,is.getStatus());
            int i = ps.executeUpdate();
            if(i>0)
            {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public Issue get(int id, String status) {
        Issue ie = null;
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from issue_book where studentid=? and status=?");
            ps.setInt(1, id);
            ps.setString(2, status);
            ResultSet rs = ps.executeQuery();
            if(rs.next())
            {
                ie = new Issue(id, rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ie;
    }

    @Override
    public boolean updateIssue(int id, String date, String status) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("update issue_book set returndate=?,status=? where studentid=?");
            ps.setString(1, date);
            ps.setString(2, status);
            ps.setInt(3, id);
            int i =ps.executeUpdate();
            if(i>0)
            {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public List<BookEntity> getAll() {
        List<BookEntity> li = new ArrayList<>();
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from add_book");
            ResultSet rs = ps.executeQuery();
            while(rs.next())
            {
                li.add(new BookEntity(rs.getString(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getInt(6)));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return li;
    }

    @Override
    public List<Issue> getAl() {
        List<Issue> li = new ArrayList<>();
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from issue_Book");
            ResultSet rs = ps.executeQuery();
            while(rs.next())
            {
                li.add(new Issue(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getString(7), rs.getString(8), rs.getString(9), rs.getString(10), rs.getString(11)));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return li;
    }

    @Override
    public boolean login(String username) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("select * from login where username =?");
            ps.setString(1,username);
            ResultSet rs= ps.executeQuery();
            if(rs.next())
            {
                temp = false;
            }
            else
            {
                temp = true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }

    @Override
    public LoginEntity getById(String username, String password) {
        LoginEntity le=null;
        try{
            PreparedStatement ps = db.cn.prepareStatement("SELECT * FROM login WHERE username=? and password=?");
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet res = ps.executeQuery();
            if(res.next())
            {
                    le = new LoginEntity(res.getInt(1),res.getString(2),res.getString(3));
            }
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return le;
    }

    @Override
    public boolean insertUser(LoginEntity le) {
        boolean temp = false;
        try {
            PreparedStatement ps = db.cn.prepareStatement("insert into register values(null,?,?,?,?)");
            ps.setString(1,le.getName());
            ps.setString(2,le.getEmail());
            ps.setString(3,le.getPhone_no());
            ps.setString(4,le.getGender());
            int i = ps.executeUpdate();
            if(i>0)
            {
                PreparedStatement pss = db.cn.prepareStatement("insert into login values(null,?,?)");
                pss.setString(1,le.getUsername());
                pss.setString(2,le.getPassword());
                int j = pss.executeUpdate();
                if(j>0)
                {
                    temp = true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return temp;
    }
}
