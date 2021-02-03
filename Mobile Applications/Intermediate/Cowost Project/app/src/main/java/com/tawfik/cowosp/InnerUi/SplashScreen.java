package com.tawfik.cowosp.InnerUi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;

import com.airbnb.lottie.LottieAnimationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Registration.Login;
import com.tawfik.cowosp.Ui.MainActivity;

public class SplashScreen extends AppCompatActivity {

    private FirebaseAuth mAuth;
    private boolean connected = false;
    private LottieAnimationView mAnimSplash;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        mAuth = FirebaseAuth.getInstance();
        mAnimSplash=findViewById(R.id.splash_anim);
        mAnimSplash.playAnimation();
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if(isConnected()){
            if(user!=null){
                //user signed in
                splashFun();

            }else{
                // user logged out

                Intent loginIntent = new Intent(SplashScreen.this, Login.class);
                startActivity(loginIntent);
                finish();
            }
        }else{
                Intent gotonowifi = new Intent(SplashScreen.this, InternetConnection.class);
                startActivity(gotonowifi);
                finish();
        }

    }



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
    void splashFun(){
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mAnimSplash.cancelAnimation();
                Intent i = new Intent(SplashScreen.this, MainActivity.class);
                startActivity(i);
                finish();
            }
        }, 5000);
    }
}
