package com.tawfik.cowosp.InnerUi;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ProgressBar;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.FieldValue;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.tawfik.cowosp.R;
import com.tawfik.cowosp.Ui.MainActivity;
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;

import java.util.Objects;

public class AddPostActivity extends AppCompatActivity {
    EditText mEDPostTitle,mEDPostDesc;
    Button mPostBtn;
    ImageButton mAddPhotoPost;
    private Uri mPostPhotoUri = null;
    private StorageReference mStorageReference;
    private DatabaseReference mDatabaseReference;
    private FirebaseAuth mAuth;
    private ImageView imageView;
    private ProgressBar mProgressBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_post);

        mAuth=FirebaseAuth.getInstance();
        mStorageReference = FirebaseStorage.getInstance().getReference();
        mDatabaseReference= FirebaseDatabase.getInstance().getReference().child("Posts");

        mEDPostTitle = findViewById(R.id.et_post_title);
        mEDPostDesc =findViewById(R.id.et_post_desc);
        mPostBtn = findViewById(R.id.post_btn);
        mAddPhotoPost = findViewById(R.id.add_photo_post_btn);
        imageView = findViewById(R.id.post_img);
        mProgressBar=findViewById(R.id.prog_bar);

        mAddPhotoPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CropImage.activity()
                        .setGuidelines(CropImageView.Guidelines.ON)
                        .setAspectRatio(1,1)
                        .setMinCropResultSize(512,512)
                        .start(AddPostActivity.this);
            }
        });



        mPostBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mProgressBar.setVisibility(View.VISIBLE);
                final String TitleP = mEDPostTitle.getText().toString();
                final String DescP = mEDPostDesc.getText().toString();
                String rendomName = FieldValue.serverTimestamp().toString();
                final StorageReference filePath = mStorageReference.child("PostImages").child(Objects.requireNonNull(mPostPhotoUri.getLastPathSegment()));
                filePath.putFile(mPostPhotoUri).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        filePath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                            @Override
                            public void onSuccess(Uri uri) {
                                String PostKey = mDatabaseReference.push().getKey();
                                mDatabaseReference.child(PostKey).child("postAuthorId").setValue(mAuth.getCurrentUser().getUid());
                                mDatabaseReference.child(PostKey).child("postImg").setValue(uri.toString());
                                mDatabaseReference.child(PostKey).child("postTitle").setValue(TitleP);
                                mDatabaseReference.child(PostKey).child("postDesc").setValue(DescP);
                                mDatabaseReference.child(PostKey).child("postTime").setValue(FieldValue.serverTimestamp().toString());
                                mDatabaseReference.child(PostKey).child("postAuthorName").setValue(mAuth.getCurrentUser().getDisplayName());
                                mProgressBar.setVisibility(View.INVISIBLE);
                                startActivity(new Intent(AddPostActivity.this, MainActivity.class));
                            }
                        });
                    }
                });

                //go to main
            }
        });
    }

    // This function to choose and crop the image.
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode,resultCode,data);
        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == Activity.RESULT_OK) {
                //image chosed ok and croped then get it as uri
                mPostPhotoUri = result.getUri();
                //to set the image to the image (image.setImageUri(mPostPhotoUri))
                imageView.setImageURI(mPostPhotoUri);
            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
                Exception error = result.getError();
            }
        }
    }

    //END of onActivityResult
}
