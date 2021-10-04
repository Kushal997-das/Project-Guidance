/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bInterface;

import entity.BookEntity;
import entity.Issue;
import entity.LoginEntity;
import java.util.List;

/**
 *
 * @author surbh
 */
public interface BookInterface {
    public BookEntity search(String id);
    boolean update (String bookid,int total);
    boolean insert(BookEntity be);
    public BookEntity check(String id);
    boolean checkstatus(int stid,String status);
    public boolean issuebook(Issue is);
    public Issue get(int id,String status);
    boolean updateIssue(int id,String date,String status);
    List<BookEntity> getAll();
    List<Issue> getAl();
    boolean login(String username);
    public LoginEntity getById(String username,String password);
    boolean insertUser(LoginEntity le);
}
