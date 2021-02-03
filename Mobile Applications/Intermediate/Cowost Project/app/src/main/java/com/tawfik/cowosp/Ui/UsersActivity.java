package com.tawfik.cowosp.Ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.blogspot.atifsoftwares.animatoolib.Animatoo;
import com.firebase.ui.database.FirebaseRecyclerOptions;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.FirebaseDatabase;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Other.User;
import com.tawfik.cowosp.Other.UserAdapter;

import java.util.ArrayList;

public class UsersActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener{

    // Definitions START *******************//
    private RecyclerView mRecView;
    private ArrayList<User> mArrList;
    private FirebaseAuth mAuth;
    private UserAdapter userAdapter;
    private SwipeRefreshLayout swipeRefreshLayout;
    //private FloatingActionButton mFabToMain;
    // Definitions END *******************//

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_users);

        /// System Data START ************************************************************///
        mAuth=FirebaseAuth.getInstance();
        mArrList =new ArrayList<>();
        /// System Data START ************************************************************///

        initViews();
        loadAllUsers();

        /*
        // setOnClickListener on FAB
        mFabToMain.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(UsersActivity.this,MainActivity.class));
            }
        });
        */
    }

    // This function to load all users for the database to recycler view.
    private void loadAllUsers(){
        mRecView.setLayoutManager(new LinearLayoutManager(this));
        FirebaseRecyclerOptions<User> options =
                new FirebaseRecyclerOptions.Builder<User>()
                        .setQuery(FirebaseDatabase.getInstance().getReference().child("UsersData"), User.class)
                        .build();
        userAdapter = new UserAdapter(options);
        mRecView.setAdapter(userAdapter);
    }
    //END of loadAllUsers

    // This function to initialize all definitions.
    private void initViews() {
        swipeRefreshLayout = findViewById(R.id.refresh);
        swipeRefreshLayout.setOnRefreshListener(this);
        mRecView = findViewById(R.id.recycler);
        //mFabToMain=findViewById(R.id.fab);
    }
    //END of initViews

    // This function to handle refresh ball.
    @Override
    public void onRefresh() {
        swipeRefreshLayout.setRefreshing(true);
        refreshList();
    }
    //END of onRefresh

    // This function to refresh the adapter.
    void refreshList(){
        userAdapter.notifyDataSetChanged();
        swipeRefreshLayout.setRefreshing(false);
    }
    //END of refreshList

    // This function to start get data.
    @Override
    public void onStart() {
        super.onStart();
        userAdapter.startListening();
    }
    //END of onStart

    //This function to stop get data.
    @Override
    public void onStop() {
        super.onStop();
        userAdapter.stopListening();
    }
    //ENd of onStop


}
