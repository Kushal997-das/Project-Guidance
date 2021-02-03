package com.tawfik.cowosp.Ui;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.tawfik.cowosp.Other.Post;
import com.tawfik.cowosp.Other.PostAdapter;
import com.tawfik.cowosp.R;

import java.util.ArrayList;
import java.util.List;

public class Timeline extends AppCompatActivity {
    private List<Post> postList;
    private RecyclerView mRecyclerView;
    private DatabaseReference mDatabaseReference;
    private PostAdapter postAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_timeline);
        mDatabaseReference= FirebaseDatabase.getInstance().getReference().child("Posts");
        postList = new ArrayList<>();
        mRecyclerView = findViewById(R.id.rec_post);
        postAdapter = new PostAdapter(postList);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.setAdapter(postAdapter);
        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                postList.clear();
                for(DataSnapshot DS:dataSnapshot.getChildren()){
                    Post post = DS.getValue(Post.class);
                    postList.add(post);
                    postAdapter = new PostAdapter(postList);
                    mRecyclerView.setAdapter(postAdapter);
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
}
