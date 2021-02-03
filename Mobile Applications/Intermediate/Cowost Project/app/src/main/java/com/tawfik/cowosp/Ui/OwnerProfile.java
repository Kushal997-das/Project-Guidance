package com.tawfik.cowosp.Ui;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.tawfik.cowosp.InnerUi.EditProfile;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Other.User;

import de.hdodenhof.circleimageview.CircleImageView;
import jp.wasabeef.glide.transformations.BlurTransformation;

import static com.bumptech.glide.request.RequestOptions.bitmapTransform;

public class OwnerProfile extends AppCompatActivity {
    // Definitions START *******************//
    private ImageView mBackImg;
    private CircleImageView mVImage;
    private ImageView mEditProfile;
    private FirebaseAuth mAuth;
    private DatabaseReference mDatabaseReference;
    private String UType = "";
    private TextView mPName,mPEmail,mPType,mPGender,mPAddress,mPPhone,mPBirth,mPId,mPJob,mPNickName;
    // Definitions END *******************//

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_owner_profile);

        /// System Data START ************************************************************///
        mAuth = FirebaseAuth.getInstance();
        mDatabaseReference = FirebaseDatabase.getInstance().getReference("UsersData");
        /// System Data START ************************************************************///

        initViews();
        loadUserData();

        // setOnClickListener For edit profile layout
        mEditProfile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(OwnerProfile.this, EditProfile.class);

                startActivity(i);
            }
        });
    }

    // This function to initialize all definitions.
    private void initViews() {
        mBackImg=findViewById(R.id.backimg);
        mVImage=findViewById(R.id.visitor_profile_img);
        mPName=findViewById(R.id.prof_vis_name);
        mPEmail=findViewById(R.id.prof_vis_email);
        mPType=findViewById(R.id.type);
        mPGender =findViewById(R.id.prof_vis_gender);
        mPAddress =findViewById(R.id.prof_vis_address);
        mPBirth=findViewById(R.id.prof_vis_birth);
        mPId=findViewById(R.id.prof_vis_id);
        mPJob=findViewById(R.id.prof_vis_job);
        mPNickName=findViewById(R.id.prof_vis_nickname);
        mPPhone=findViewById(R.id.prof_vis_phone);
        mEditProfile=findViewById(R.id.edit_profile_layout_owner);

    }
    //END of initViews

    // This function to load and set the owner data in this profile.
    private void loadUserData() {
        Glide.with(this)
                .load(mAuth.getCurrentUser().getPhotoUrl())
                .apply(bitmapTransform(new BlurTransformation(5, 3)))
                .into(mBackImg);
        Glide.with(this)
                .load(mAuth.getCurrentUser().getPhotoUrl())
                .centerCrop()
                .into(mVImage);
        mPName.setText(mAuth.getCurrentUser().getDisplayName());
        mPEmail.setText(mAuth.getCurrentUser().getEmail());
        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                //usersList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    User user = snapshot.getValue(User.class);
                    //usersList.add(user);
                    //number_of_users =usersList.size();
                    //Log.d("Array", "onDataChange: "+number_of_users);
                    if (user != null) {
                        if (user.getUserId().equals(mAuth.getCurrentUser().getUid())) {
                            UType = user.getUserType();
                            if(UType.equals("Owner")){
                                mPType.setText("Co-Working Space Owner");
                            }
                            mPGender.setText(user.getUserGender());
                            mPAddress.setText(user.getUserAddress());
                            //mPBirth.setText(user.getUserBirthDate());
                            mPId.setText(mAuth.getCurrentUser().getUid());
                            mPJob.setText(user.getUserJob());
                            mPPhone.setText(user.getUserPhone());
                            mPNickName.setText(user.getUserNickName());
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
    //END of loadUserData


}
