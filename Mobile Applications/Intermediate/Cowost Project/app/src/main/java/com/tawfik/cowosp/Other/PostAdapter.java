package com.tawfik.cowosp.Other;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.tawfik.cowosp.R;

import java.util.List;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.ViewHolder> {
    private List<Post> List_posts;
    private DatabaseReference mDatabaseReference;
    public PostAdapter(List<Post> list_posts) {
        List_posts = list_posts;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.post_design,parent,false);

        return new ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        String post_title = List_posts.get(position).getPostTitle();
        holder.mPostTitle.setText(post_title);
        String post_desc = List_posts.get(position).getPostDesc();
        holder.mPostDesc.setText(post_desc);
        mDatabaseReference = FirebaseDatabase.getInstance().getReference("UsersData");
        final String user_id = List_posts.get(position).getAuthorId();

        mDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                for(DataSnapshot Ds: dataSnapshot.getChildren()){
                    User userData = Ds.getValue(User.class);
                    if (userData != null) {
                        if (userData.getUserId().equals(user_id)) {
                            holder.mAuthorName.setText(userData.getUserName());
                            String uri_a = userData.getUserImage();
                            Glide.with(holder.itemView.getContext()).load(uri_a).into(holder.mPostAuthor);
                        }
                    }
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

        String uri = List_posts.get(position).getPostImg();
        Glide.with(holder.itemView.getContext()).load(uri).into(holder.mPostImg);
    }

    @Override
    public int getItemCount() {
        return List_posts.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{
        TextView mAuthorName,mTime,mPostTitle,mPostDesc;
        ImageView mPostImg,mPostAuthor;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mAuthorName = itemView.findViewById(R.id.author_name_post);
            mTime = itemView.findViewById(R.id.post_time);
            mPostTitle=itemView.findViewById(R.id.post_title_card);
            mPostDesc=itemView.findViewById(R.id.post_desc_card);
            mPostImg=itemView.findViewById(R.id.post_img_card);
            mPostAuthor=itemView.findViewById(R.id.post_image_card_user);
        }
    }
}
