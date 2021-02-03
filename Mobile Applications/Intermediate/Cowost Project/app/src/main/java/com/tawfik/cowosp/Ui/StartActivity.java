package com.tawfik.cowosp.Ui;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import com.airbnb.lottie.LottieAnimationView;
import com.tawfik.cowosp.R;

public class StartActivity extends AppCompatActivity implements View.OnClickListener {
    private LottieAnimationView mTimerLottie;
    private Button mStartTimer,mEndTimer;
    private Spinner mTimerSpinner;
    private String mTime;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);
        initViews();
        mEndTimer.setEnabled(false);
    }

    private void initViews() {
        mStartTimer =findViewById(R.id.start_btn);
        mStartTimer.setOnClickListener(this);
        mEndTimer=findViewById(R.id.end_btn);
        mEndTimer.setOnClickListener(this);
        mTimerLottie=findViewById(R.id.lottie_anim_timer);
        mTimerSpinner =findViewById(R.id.time_spin);
        ArrayAdapter<CharSequence> arrayAdapter = ArrayAdapter.createFromResource(this,R.array.timeslots,R.layout.support_simple_spinner_dropdown_item);
        mTimerSpinner.setAdapter(arrayAdapter);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()){
            case R.id.start_btn:
                    startTime();
                break;
            case R.id.end_btn:
                endTime();
                break;
        }
    }



    private void startTime(){
        mTimerLottie.playAnimation();
        mStartTimer.setEnabled(false);
        mEndTimer.setEnabled(true);
        mTime = mTimerSpinner.getSelectedItem().toString();
        Toast.makeText(this, "Timer Started! for "+mTime, Toast.LENGTH_SHORT).show();

    }

    private void endTime(){

        mTimerLottie.cancelAnimation();
        mEndTimer.setEnabled(false);
        mStartTimer.setEnabled(true);
        Toast.makeText(this, "Timer Ended!", Toast.LENGTH_SHORT).show();

    }

}
