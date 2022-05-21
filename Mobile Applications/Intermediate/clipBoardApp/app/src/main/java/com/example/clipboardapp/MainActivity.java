package com.example.clipboardapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ClipData;
import android.os.Bundle;
import android.content.ClipboardManager;


import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    ClipData cd;
    EditText e1,e2;
ClipboardManager cbm;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        e1=(EditText)findViewById(R.id.editTextTextPersonName);
        e2=(EditText)findViewById(R.id.editTextTextPersonName2);
        cbm= (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);


    }
    public void copy(View V){
       String text=e1.getText().toString();
       cd=ClipData.newPlainText("text",text);
       cbm.setPrimaryClip(cd);
    }

    public void paste(View V) {
        ClipData  cd2=cbm.getPrimaryClip();
        ClipData.Item item=cd2.getItemAt(0);
        String copied=item.getText().toString();
        e2.setText(copied);
        Toast.makeText(this, "msg is copied", Toast.LENGTH_SHORT).show();
    }
    }

