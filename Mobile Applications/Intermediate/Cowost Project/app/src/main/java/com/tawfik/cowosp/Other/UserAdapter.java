package com.tawfik.cowosp.Other;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.firebase.ui.database.FirebaseRecyclerOptions;
import com.tawfik.cowosp.R;

public class UserAdapter extends FirebaseRecyclerAdapter<User, UserAdapter.UserViewHolder> {

    /**
     * Initialize a {@link RecyclerView.Adapter} that listens to a Firebase query. See
     * {@link FirebaseRecyclerOptions} for configuration options.
     *
     * @param options
     */
    public UserAdapter(@NonNull FirebaseRecyclerOptions<User> options) {
        super(options);
    }

    @Override
    protected void onBindViewHolder(@NonNull UserViewHolder holder, int position, @NonNull User model) {
        holder.textView.setText(model.getUserName());
        holder.email.setText(model.getUserEmail());
        holder.type.setText(model.getUserType());
        String uri = model.getUserImage();
        Glide.with(holder.itemView.getContext()).load(uri).into(holder.imageView);
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.user_card_design, parent, false);

        return new UserViewHolder(view);
    }

    class UserViewHolder extends RecyclerView.ViewHolder{
        TextView textView,type,email;
        ImageView imageView;
        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
            textView =itemView.findViewById(R.id.user_card_name);
            imageView =itemView.findViewById(R.id.profile_image_card);
            type=itemView.findViewById(R.id.user_card_type);
            email=itemView.findViewById(R.id.card_email);
        }
    }
}
