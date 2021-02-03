package com.tawfik.cowosp.Other;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;

public class ApplicationFile {
    private static final String FILE_NAME= "COWOSTFile";
    public static final String KEY_STATUS = "user_status";
    SharedPreferences mSharedPreferences;
    SharedPreferences.Editor mEditor;
    Context mContext;

    @SuppressLint("CommitPrefEdits")
    public ApplicationFile(Context mContext) {
        this.mContext = mContext;
        mSharedPreferences = mContext.getSharedPreferences(FILE_NAME,Context.MODE_PRIVATE);
        mEditor=mSharedPreferences.edit();
    }

    public void saveUserStatus(String uStatus){
        mEditor.putString(KEY_STATUS,uStatus);
        mEditor.apply();
    }

    public String getUserStatus(){
        return mSharedPreferences.getString(KEY_STATUS,"Status: click to change!");
    }
}
