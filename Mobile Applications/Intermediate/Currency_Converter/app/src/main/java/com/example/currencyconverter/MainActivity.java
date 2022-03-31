package com.example.currencyconverter;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
  public void convertCurrency(View view) {
      Log.i("Info","Button pressed");

      EditText editText = (EditText) findViewById(R.id.editText);

      String amountInDollar = editText.getText().toString();
      Double amountInDollarDouble = Double.parseDouble(amountInDollar);

      double amountInPoundsDouble = amountInDollarDouble * 1.3;

      String amountInDollarsString = Double.toString(amountInDollarDouble);
      Log.i("Amount in Dollars", amountInDollarsString);

  }



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}