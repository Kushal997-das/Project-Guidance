package com.example.texttospeechapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {
    TextToSpeech t1;
    EditText e1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        e1=(EditText)findViewById(R.id.editTextTextPersonName);
        t1=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
               if(status!=TextToSpeech.ERROR) {
                   t1.setLanguage(Locale.UK);

               }
            }
        });
    }
    public void convert(View view){
        String tospeak=e1.getText().toString();
        Toast.makeText(getBaseContext(),tospeak,Toast.LENGTH_LONG).show();
        t1.speak(tospeak,TextToSpeech.QUEUE_FLUSH,null);
    }
}