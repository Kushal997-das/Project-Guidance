package com.tawfik.cowosp.Other;

import android.provider.ContactsContract;

import java.sql.Timestamp;

public class Post {

    String AuthorId,AuthorName,PostImg,PostTitle,PostDesc;
    ContactsContract.Data timestamp;

    public Post() {
    }

    public ContactsContract.Data getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(ContactsContract.Data timestamp) {
        this.timestamp = timestamp;
    }

    public Post(String authorId, String authorName, String postImg, String postTitle, String postDesc, ContactsContract.Data timestamp) {
        AuthorId = authorId;
        AuthorName = authorName;
        PostImg = postImg;
        PostTitle = postTitle;
        PostDesc = postDesc;
        this.timestamp = timestamp;
    }

    public String getAuthorId() {
        return AuthorId;
    }

    public void setAuthorId(String authorId) {
        AuthorId = authorId;
    }

    public String getAuthorName() {
        return AuthorName;
    }

    public void setAuthorName(String authorName) {
        AuthorName = authorName;
    }

    public String getPostImg() {
        return PostImg;
    }

    public void setPostImg(String postImg) {
        PostImg = postImg;
    }

    public String getPostTitle() {
        return PostTitle;
    }

    public void setPostTitle(String postTitle) {
        PostTitle = postTitle;
    }

    public String getPostDesc() {
        return PostDesc;
    }

    public void setPostDesc(String postDesc) {
        PostDesc = postDesc;
    }


}

