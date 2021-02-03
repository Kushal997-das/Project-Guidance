package com.tawfik.cowosp.Registration;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.snackbar.Snackbar;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Ui.MainActivity;


public class Login extends AppCompatActivity  implements View.OnClickListener{

    // Definitions START *******************//
    private EditText mEmailLogin,mPasswordLogin;
    private Button mLoginBtn,mDontHave;
    private FirebaseAuth mAuth;
    private ProgressBar mLoginProgress;
    // Definitions END *******************//

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        /// System Data START ************************************************************///
        mAuth = FirebaseAuth.getInstance();
        /// System Data END ************************************************************///

        initViews();

    }

    // This function to initialize all definitions.
    private void initViews() {
        mEmailLogin=findViewById(R.id.et_email_login);
        mPasswordLogin=findViewById(R.id.et_password_login);
        mLoginBtn=findViewById(R.id.login_btn);
        mLoginBtn.setOnClickListener(this);
        mLoginProgress =findViewById(R.id.progressBar);
        mDontHave=findViewById(R.id.donthave_btn);
        mDontHave.setOnClickListener(this);
    }
    //END of initViews

    // This function to detect if user logged in or not when application starts.
    @Override
    protected void onStart() {
        super.onStart();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if(currentUser!=null){
            //user already login
            sendToMainActivity();
        }else{
            //user not login
        }
    }
    //END of onStart

    // This function to go to main activity
    private void sendToMainActivity() {
        Intent mainIntent = new Intent(Login.this,MainActivity.class);
        startActivity(mainIntent);
        finish();
    }
    //END of sendToMainActivity

    // This function to handle views clicks.
    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.login_btn:
                String LoginEmail = mEmailLogin.getText().toString();
                String LoginPass = mPasswordLogin.getText().toString();
                if (!TextUtils.isEmpty(LoginEmail) && !TextUtils.isEmpty(LoginPass)) {
                    mLoginProgress.setVisibility(View.VISIBLE);
                    mAuth.signInWithEmailAndPassword(LoginEmail,LoginPass).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if(task.isSuccessful()){
                                sendToMainActivity();
                            }else{
                                String errorMessage = task.getException().getMessage();
                                Toast.makeText(Login.this, "Error: "+errorMessage, Toast.LENGTH_SHORT).show();
                            }
                            mLoginProgress.setVisibility(View.INVISIBLE);
                        }
                    });
                }else{
                    Snackbar.make(findViewById(android.R.id.content),"Fields can not be empty!",Snackbar.LENGTH_LONG)
                            .setBackgroundTint(getResources().getColor(R.color.red))
                            .setTextColor(getResources().getColor(R.color.white))
                            .setAnimationMode(BaseTransientBottomBar.ANIMATION_MODE_SLIDE).show();
                }
                break;
            case R.id.donthave_btn:
                Intent toSignIntent = new Intent(Login.this,SignUp.class);
                startActivity(toSignIntent);
                finish();
                break;
        }
    }
    //END of onClick

}
