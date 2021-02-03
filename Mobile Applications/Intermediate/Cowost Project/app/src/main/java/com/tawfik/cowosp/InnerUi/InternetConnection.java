package com.tawfik.cowosp.InnerUi;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.tawfik.cowosp.R;

public class InternetConnection extends AppCompatActivity {

    Button mRetry;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_internt_connection);
        mRetry=findViewById(R.id.retry_btn);
        mRetry.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
                Intent gotosplash = new Intent(InternetConnection.this,SplashScreen.class);
                startActivity(gotosplash);
            }
        });
    }
}
