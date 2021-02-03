package com.tawfik.cowosp.Ui;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.tawfik.cowosp.InnerUi.AddPostActivity;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Registration.Login;
import com.tawfik.cowosp.Other.User;

import java.util.ArrayList;
import java.util.Objects;

import de.hdodenhof.circleimageview.CircleImageView;

public class MainActivity extends AppCompatActivity implements View.OnClickListener{

    // Definitions START *******************//
    private boolean connected = false;
    private FirebaseAuth mAuth;
    private DatabaseReference mDatabaseReference;
    private ArrayList<User> usersList;
    private String UType = "";
    private int number_of_users;
    private TextView mNoNet,mUserStatus,mNumber_of_users;
    private ImageView mImgVerification;
    private CircleImageView mMainImg,mProfileIcon;
    private TextView mMainName;
    private Button mImgAddPostIcon;
    private RelativeLayout mRelHome,mRelProfile,mRelUsers,mRelStart,mRelSettings,mRelInfo,mRelHelp,mRelLogout;
    // Definitions END *******************//

    @SuppressLint("RestrictedApi")
    @RequiresApi(api = Build.VERSION_CODES.N)

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /// System Data START ************************************************************///
        mAuth = FirebaseAuth.getInstance();
        mDatabaseReference = FirebaseDatabase.getInstance().getReference("UsersData");
        usersList = new ArrayList<>();
        /// System Data END ************************************************************///

        initViews();
        loadingHomeData();
        retrieveUserData();

    }

    // This function to load the data form fire base database for home activity.
    void loadingHomeData(){
        if(isConnected()){
            //check if user login or not?
            FirebaseUser currentUser = FirebaseAuth.getInstance().getCurrentUser();
            if (currentUser == null) {
                //user need to login
                sendToLogin();
            } else {
                //user logged in already
                if(Objects.equals(currentUser.getEmail(), "tawfekyassertawfek@gmail.com")){
                    mImgVerification.setVisibility(View.VISIBLE);
                }
                //mDatabaseReference.child(currentUser.getUid()).child("userGender").setValue("M");
                Glide.with(this)
                        .load(currentUser.getPhotoUrl())
                        .centerCrop()
                        .into(mMainImg);
                Glide.with(this)
                        .load(currentUser.getPhotoUrl())
                        .centerCrop()
                        .into(mProfileIcon);
                mMainName.setText(currentUser.getDisplayName());
            }
        }else{
            mNoNet.setVisibility(View.VISIBLE);
        }

    }
    //END of loadingHomeData

    // This function to initialize all definitions.
    void initViews()
    {
        mNumber_of_users=findViewById(R.id.number_users);
        mNumber_of_users.setOnClickListener(this);
        mImgAddPostIcon=findViewById(R.id.add_post_icon_btn);
        mNoNet=findViewById(R.id.nointernet);
        mRelHome=findViewById(R.id.home_click);
        mRelProfile=findViewById(R.id.profile_click);
        mRelUsers=findViewById(R.id.users_click);
        mRelStart=findViewById(R.id.start_click);
        mRelSettings=findViewById(R.id.settings_click);
        mRelInfo=findViewById(R.id.info_click);
        mRelHelp=findViewById(R.id.help_click);
        mRelLogout=findViewById(R.id.logout_click);
        mMainImg=findViewById(R.id.user_img_main_page);
        mProfileIcon=findViewById(R.id.profile_icon);
        mImgVerification=findViewById(R.id.verification_icon);
        mUserStatus=findViewById(R.id.user_status);
        mImgAddPostIcon.setOnClickListener(this);
        mUserStatus.setOnClickListener(this);
        mImgVerification.setOnClickListener(this);
        mRelHome.setOnClickListener(this);
        mRelProfile.setOnClickListener(this);
        mRelUsers.setOnClickListener(this);
        mRelStart.setOnClickListener(this);
        mRelSettings.setOnClickListener(this);
        mRelInfo.setOnClickListener(this);
        mRelHelp.setOnClickListener(this);
        mRelLogout.setOnClickListener(this);
        mMainName=findViewById(R.id.mainName);
    }
    //END of initViews

    // This function to get user data to determine the user type.
    private void getUser() {
        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                usersList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    User user = snapshot.getValue(User.class);
                    usersList.add(user);
                    number_of_users =usersList.size();
                    Log.d("Array", "onDataChange: "+number_of_users);
                    if (user != null) {
                        if (user.getUserId().equals(mAuth.getCurrentUser().getUid())) {
                            UType = user.getUserType();
                            mUserStatus.setText(user.getUserStatus());
                            if (UType.equals("Owner")) {
                                startActivity(new Intent(MainActivity.this,OwnerProfile.class));
                            } else if(UType.equals("Visitor")){
                                startActivity(new Intent(MainActivity.this,VisitorProfile.class));
                            }
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    //END of getUser

    // This function to handle views clicks.
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.home_click:
                startActivity(new Intent(MainActivity.this,Timeline.class));
                /*Snackbar.make(findViewById(android.R.id.content),"Coming Soon!",Snackbar.LENGTH_LONG)
                .setBackgroundTint(getResources().getColor(R.color.colorPrimaryDark))
                .setTextColor(getResources().getColor(R.color.white))
                .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();**/
                break;
            case R.id.profile_click:
                getUser();
                break;
            case R.id.start_click:
                startActivity(new Intent(MainActivity.this,StartActivity.class));
                /*Snackbar.make(findViewById(android.R.id.content),"Start",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.colorPrimaryDark))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();*/
                break;
            case R.id.settings_click:
                Snackbar.make(findViewById(android.R.id.content),"Settings Coming Soon!",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.colorPrimaryDark))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                break;
            case R.id.info_click:
                startActivity(new Intent(MainActivity.this,InfoActivity.class));

                /*Snackbar.make(findViewById(android.R.id.content),"Info. Coming Soon!",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.colorPrimaryDark))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();*/

                break;
            case R.id.help_click:
                Snackbar.make(findViewById(android.R.id.content),"Help Coming Soon!",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.colorPrimaryDark))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                break;
            case R.id.users_click:
                startActivity(new Intent(MainActivity.this,UsersActivity.class));
                break;
            case R.id.logout_click:
                logOut();
                break;
            case R.id.verification_icon:
                Snackbar.make(findViewById(android.R.id.content),"Verified User",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.appGreen))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                break;
            case R.id.add_post_icon_btn:
                startActivity(new Intent(MainActivity.this, AddPostActivity.class));
                break;
            case R.id.number_users:
                Snackbar.make(findViewById(android.R.id.content),"Number of users registered in Cowost",Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getResources().getColor(R.color.appGreen))
                        .setTextColor(getResources().getColor(R.color.white))
                        .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                break;
        }
    }
    //END of onClick

    // This function have intent to go to Login Activity when user click on logout.
    void sendToLogin() {
        Intent loginIntent = new Intent(MainActivity.this, Login.class);
        startActivity(loginIntent);
        finish();
    }
    //END of sendToLogin

    // This function to display a dialog when user click on logout.
    private void logOut() {
        Dialog();
    }
    //END of logOut

    // This onStart function.
    @Override
    protected void onStart() {
        super.onStart();
    }
    //END of onStart

    // This function to display logout dialog to ask user for logging out.
    void Dialog() {
        AlertDialog.Builder builder1 = new AlertDialog.Builder(this);
        builder1.setMessage("Are your want to logout?");
        builder1.setCancelable(true);
        builder1.setPositiveButton(
                "Yes",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                        mAuth.signOut();
                        sendToLogin();
                        finish();
                    }
                });

        builder1.setNegativeButton(
                "No",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });

        AlertDialog alert11 = builder1.create();
        alert11.show();
    }
    //END of Dialog

    // This function to check internet connection.
    boolean isConnected(){

        ConnectivityManager connectivityManager = (ConnectivityManager)getSystemService(this.CONNECTIVITY_SERVICE);
        if(connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE).getState() == NetworkInfo.State.CONNECTED ||
                connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI).getState() == NetworkInfo.State.CONNECTED) {
            //we are connected to a network
            connected = true;
        }
        else
            connected = false;

        return connected;
    }
    //END of isConnected

    //This function to get user status
    void retrieveUserData(){
        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                usersList.clear();
                for(DataSnapshot Ds: dataSnapshot.getChildren()){
                    User userData = Ds.getValue(User.class);
                    usersList.add(userData);
                    mNumber_of_users.setText(String.valueOf(usersList.size()));
                    if (userData != null) {
                        if (userData.getUserId().equals(mAuth.getCurrentUser().getUid())) {
                                mUserStatus.setText(userData.getUserStatus());
                                //number of users here
                        }
                    }
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    //END of retrieveUserData


    //**************************** Unused until now ****************************************
    //can be used in another place
    //Unused function
    void changeStatusDialog(){

        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        LayoutInflater layoutInflater = getLayoutInflater();
        View customView = layoutInflater.inflate(R.layout.change_status,null);
        builder.setCancelable(false);
        builder.setView(customView);
        builder.setTitle("Add Status");
        final EditText mEtStatus = customView.findViewById(R.id.change_status);
        builder.setPositiveButton("Save", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
                mUserStatus.setText(mEtStatus.getText().toString());
                //save to  shared preferences
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userStatus").setValue(mEtStatus.getText().toString());
            }
        });
        builder.setNeutralButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

}
