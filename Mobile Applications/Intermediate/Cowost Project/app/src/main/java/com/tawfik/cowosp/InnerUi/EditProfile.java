package com.tawfik.cowosp.InnerUi;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Other.User;

public class EditProfile extends AppCompatActivity {

    // Definitions START *******************//
    private Button mSave;
    private FirebaseAuth mAuth;
    private DatabaseReference mDatabaseReference;
    private EditText mEDNickName,mEDPhone,mEDAddress,mEDGender,mEDJob,mEDStatus;
    private String FormProfile, value_V,value_O;
    // Definitions END *******************//

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);

        /// System Data START ************************************************************///
        mAuth = FirebaseAuth.getInstance();
        mDatabaseReference = FirebaseDatabase.getInstance().getReference("UsersData");
        /// System Data START ************************************************************///


        retrieveUserData();
        initViews();

        // setOnClickListener to save the edited data to the database
        mSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //saving data to firebase and go back
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userGender").setValue(mEDGender.getText().toString());
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userNickName").setValue(mEDNickName.getText().toString());
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userPhone").setValue(mEDPhone.getText().toString());
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userAddress").setValue(mEDAddress.getText().toString());
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userJob").setValue(mEDJob.getText().toString());
                mDatabaseReference.child(mAuth.getCurrentUser().getUid()).child("userStatus").setValue(mEDStatus.getText().toString());
                Toast.makeText(EditProfile.this, "Data Saved Successfully!", Toast.LENGTH_SHORT).show();
                finish();
            }
        });

    }

    // This function to initialize all definitions.
    private void initViews() {
        mSave=findViewById(R.id.save_edit_profile_btn);
        mEDAddress=findViewById(R.id.et_address_profile);
        mEDGender=findViewById(R.id.et_gender_profile);
        mEDJob=findViewById(R.id.et_job_profile);
        mEDNickName=findViewById(R.id.et_nickname_profile);
        mEDPhone=findViewById(R.id.et_phone_profile);
        mEDStatus=findViewById(R.id.et_status_profile);
    }
    //END of initViews

    // This function to retrieve the data and set it to editTexts.
    void retrieveUserData(){
        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                //usersList.clear();
                for(DataSnapshot Ds: dataSnapshot.getChildren()){
                    User userData = Ds.getValue(User.class);
                    //usersList.add(userData);
                    if (userData != null) {
                        if (userData.getUserId().equals(mAuth.getCurrentUser().getUid())) {
                            //here
                            mEDNickName.setText(userData.getUserNickName());
                            mEDPhone.setText(userData.getUserPhone());
                            mEDAddress.setText(userData.getUserAddress());
                            mEDGender.setText(userData.getUserGender());
                            mEDStatus.setText(userData.getUserStatus());
                            mEDJob.setText(userData.getUserJob());
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

}
