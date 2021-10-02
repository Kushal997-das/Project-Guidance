/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

/**
 *
 * @author surbh
 */
public class BookEntity {
    private String id;
    private String name;
    private String author;
    private String faculty;
    private String description;
    private int NoOfBooks;

    public BookEntity(String id, String name, String author, String faculty, String description, int NoOfBooks) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.faculty = faculty;
        this.description = description;
        this.NoOfBooks = NoOfBooks;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNoOfBooks() {
        return NoOfBooks;
    }

    public void setNoOfBooks(int NoOfBooks) {
        this.NoOfBooks = NoOfBooks;
    }
    
}
