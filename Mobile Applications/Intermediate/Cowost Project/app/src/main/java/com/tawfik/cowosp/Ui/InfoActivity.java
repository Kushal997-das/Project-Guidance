package com.tawfik.cowosp.Ui;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.tawfik.cowosp.R;

public class InfoActivity extends AppCompatActivity {
    ImageView mLinkedIn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_activity);
        mLinkedIn=findViewById(R.id.linkedin_logo);
        mLinkedIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // open developer profile
                String url = "https://www.linkedin.com/in/tawfikyasser/";
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setData(Uri.parse(url));
                startActivity(i);
            }
        });
    }
}
