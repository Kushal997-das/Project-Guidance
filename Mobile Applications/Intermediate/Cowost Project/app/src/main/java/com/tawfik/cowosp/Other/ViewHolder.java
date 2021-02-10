package com.tawfik.cowosp.Other;

import android.content.Context;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.squareup.picasso.Picasso;
import com.tawfik.cowosp.R;

public class ViewHolder extends RecyclerView.ViewHolder {
    View view;
    public ViewHolder(@NonNull View itemView) {
        super(itemView);
        view=itemView;
    }
        //to set data to rec view
    public void setUserData (Context context,String name,String image){
        TextView textView =view.findViewById(R.id.user_card_name);
        ImageView imageView =view.findViewById(R.id.profile_image_card);
        //set data to views
        textView.setText(name);
        Picasso.get().load(image).into(imageView);
    }
}
