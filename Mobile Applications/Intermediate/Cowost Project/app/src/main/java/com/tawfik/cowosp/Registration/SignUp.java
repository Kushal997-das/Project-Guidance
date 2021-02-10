package com.tawfik.cowosp.Registration;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.UserProfileChangeRequest;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Ui.MainActivity;
import com.tawfik.cowosp.Other.User;
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;


import android.Manifest;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import de.hdodenhof.circleimageview.CircleImageView;

public class SignUp extends AppCompatActivity implements View.OnClickListener {

    // Definitions START *******************//
    private EditText mUsernameEt,mEmailEt,mPasswordEt;
    private Button mSignUpBtn,mAlreadyHave;
    private FirebaseAuth mAuth;
    private CircleImageView mProfileSetupImg;
    private Uri mainImageUri = null;
    private DatabaseReference mDatabaseReference;
    private StorageReference mStorageReference;
    private ProgressDialog progressDialog;
    private String UTypeSpin;
    private Spinner mSpinner;
    // Definitions END *******************//

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        /// System Data START ************************************************************///
        mAuth=FirebaseAuth.getInstance();
        mDatabaseReference= FirebaseDatabase.getInstance().getReference().child("UsersData");
        mStorageReference=FirebaseStorage.getInstance().getReference();
        /// System Data START ************************************************************///

        initView();

    }

    // This function to initialize all definitions.
    private void initView() {
        mSpinner=findViewById(R.id.spin);
        ArrayAdapter<CharSequence> arrayAdapter = ArrayAdapter.createFromResource(this,R.array.usertype,R.layout.support_simple_spinner_dropdown_item);
        mSpinner.setAdapter(arrayAdapter);
        mUsernameEt=findViewById(R.id.et_username_signup);
        mEmailEt=findViewById(R.id.et_email_signup);
        mPasswordEt=findViewById(R.id.et_password_signup);
        mSignUpBtn=findViewById(R.id.signup_btn);
        mAlreadyHave=findViewById(R.id.alreadyhave_btn);
        mSignUpBtn.setOnClickListener(this);
        mAlreadyHave.setOnClickListener(this);
        mProfileSetupImg=findViewById(R.id.profile_image_setup);
        mProfileSetupImg.setOnClickListener(this);
        progressDialog = new ProgressDialog(this);
    }
    //END of initViews

    // This function to handle views clicks.
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.signup_btn:
                String username = mUsernameEt.getText().toString();
                String email = mEmailEt.getText().toString();
                String password = mPasswordEt.getText().toString();
                if(!TextUtils.isEmpty(username) && !TextUtils.isEmpty(email) && !TextUtils.isEmpty(password) ){
                    createNewAccount(email,password,username);
                }else{
                    Snackbar.make(findViewById(android.R.id.content),"Fields can not be empty!",Snackbar.LENGTH_LONG)
                            .setBackgroundTint(getResources().getColor(R.color.red))
                            .setTextColor(getResources().getColor(R.color.white))
                            .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                }
                break;
            case R.id.alreadyhave_btn:
                Intent toLoginIntent = new Intent(SignUp.this,Login.class);
                startActivity(toLoginIntent);
                finish();
                break;
            case R.id.profile_image_setup:
                //select image process
                if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.M){
                    //check the permission
                    if(ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED){
                        //Toast.makeText(this, "Permission denied!", Toast.LENGTH_SHORT).show();
                        ActivityCompat.requestPermissions(SignUp.this,new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},1);
                    }else{
                        //Toast.makeText(this, "Permission ok!", Toast.LENGTH_SHORT).show();
                        CropImage.activity()
                                .setGuidelines(CropImageView.Guidelines.ON)
                                .setAspectRatio(1,1)
                                .start(SignUp.this);
                    }
                }
                break;
        }
    }
    //END of onClick

    // This function to create new account, (calling updateUserInfo to create the account).
    private void createNewAccount(String email,String password,final String username) {
        mAuth.createUserWithEmailAndPassword(email,password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
            @Override
            public void onComplete(@NonNull Task<AuthResult> task) {
                if(task.isSuccessful()){
                    // Sign in success, update UI with the signed-in user's information
                    FirebaseUser user = mAuth.getCurrentUser();
                    //after creation we need to update profile with username and img
                    updateUserInfo(username,user);
                }else{
                    String errorMsg = task.getException().getMessage();
                    Toast.makeText(SignUp.this, "Error: "+errorMsg, Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
    //END of createNewAccount

    // This function to upload the image and user data to firebase and go to main activity.
    private void updateUserInfo(final String username,final FirebaseUser user) {
        progressDialog.setMessage("Welcome "+username+", please wait while registration...");
        progressDialog.show();
        final String cUserEmail= user.getEmail();
        final String cUserId = user.getUid();
        final StorageReference filepath = mStorageReference.child("UserImages").child(mainImageUri.getLastPathSegment());
        filepath.putFile(mainImageUri).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
            @Override
            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                filepath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {

                    @Override
                    public void onSuccess(Uri uri) {
                        UserProfileChangeRequest userProfileChangeRequest =new UserProfileChangeRequest.Builder()
                                .setDisplayName(username).setPhotoUri(uri).build();
                        UTypeSpin =mSpinner.getSelectedItem().toString();
                        DatabaseReference databaseReference =mDatabaseReference.child(cUserId);
                        User user1 = new User("",username,cUserId,cUserEmail,UTypeSpin,uri.toString(),"","","","","","");
                        databaseReference.setValue(user1);
                        user.updateProfile(userProfileChangeRequest).addOnCompleteListener(new OnCompleteListener<Void>() {
                            @Override
                            public void onComplete(@NonNull Task<Void> task) {
                                if(task.isSuccessful()){
                                    //user info updated
                                    sendToMain();
                                    progressDialog.dismiss();
                                }else{
                                    //something wrong
                                    Snackbar.make(findViewById(android.R.id.content),"Something wrong, try again!",Snackbar.LENGTH_LONG)
                                            .setBackgroundTint(getResources().getColor(R.color.red))
                                            .setTextColor(getResources().getColor(R.color.white))
                                            .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                                }
                            }
                        });
                    }
                });
            }

        });
    }
    //END of updateUserInfo

    // This function to choose and crop the image.
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode,resultCode,data);
        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {
                //image chosed ok and croped then get it as uri
                mainImageUri = result.getUri();
                mProfileSetupImg.setImageURI(mainImageUri);
            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
                Exception error = result.getError();
            }
        }
    }
    //END of onActivityResult

    // This function to detect if user logged in or not when application starts.
    @Override
    protected void onStart() {
        super.onStart();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if(currentUser!=null){
            //already logged in
            sendToMain();
        }else{
            //not log in
        }

    }
    //END of onStart

    // This function to go to main activity
    void sendToMain(){
        Intent mainIntent = new Intent(SignUp.this,MainActivity.class);
        startActivity(mainIntent);
        finish();
    }
    //END of sendToMain

}
