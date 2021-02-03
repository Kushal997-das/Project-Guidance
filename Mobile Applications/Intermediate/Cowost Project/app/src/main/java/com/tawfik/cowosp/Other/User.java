package com.tawfik.cowosp.Other;

import com.google.firebase.database.IgnoreExtraProperties;

@IgnoreExtraProperties
public class User {

    // User parameters ******* START ******
    private String UserNickName,UserName
            ,UserId,UserEmail,UserType,UserImage
            ,UserAddress,UserGender,UserStatus,
            UserPhone,UserBirthDate,UserJob;
    // USER parameters ******* END ********


    //Empty Constructor
    public User(){}
    //END of User empty constructor

    //Parametrize constructor - to set the data
    public User(String userNickName, String userName, String userId, String userEmail, String userType, String userImage, String userAddress, String userGender, String userStatus, String userPhone, String userBirthDate, String userJob) {
        UserNickName = userNickName;
        UserName = userName;
        UserId = userId;
        UserEmail = userEmail;
        UserType = userType;
        UserImage = userImage;
        UserAddress = userAddress;
        UserGender = userGender;
        UserStatus = userStatus;
        UserPhone = userPhone;
        UserBirthDate = userBirthDate;
        UserJob = userJob;
    }
    //END of user parametrize constructor


    // All setters and getters *** START *************************

    public String getUserPhone() {
        return UserPhone;
    }

    public void setUserPhone(String userPhone) {
        UserPhone = userPhone;
    }

    public String getUserNickName() {
        return UserNickName;
    }

    public void setUserNickName(String userNickName) {
        UserNickName = userNickName;
    }

    public String getUserAddress() {
        return UserAddress;
    }

    public void setUserAddress(String userAddress) { UserAddress = userAddress; }

    public String getUserGender() {
        return UserGender;
    }

    public void setUserGender(String userGender) {
        UserGender = userGender;
    }

    public String getUserStatus() {
        return UserStatus;
    }

    public void setUserStatus(String userStatus) {
        UserStatus = userStatus;
    }

    public String getUserBirthDate() {
        return UserBirthDate;
    }

    public void setUserBirthDate(String userBirthDate) {
        UserBirthDate = userBirthDate;
    }

    public String getUserJob() {
        return UserJob;
    }

    public void setUserJob(String userJob) {
        UserJob = userJob;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getUserEmail() {
        return UserEmail;
    }

    public void setUserEmail(String userEmail) {
        UserEmail = userEmail;
    }

    public String getUserType() {
        return UserType;
    }

    public void setUserType(String userType) {
        UserType = userType;
    }

    public String getUserImage() {
        return UserImage;
    }

    public void setUserImage(String userImage) {
        UserImage = userImage;
    }

    // All setters and getters *** END *************************
}
