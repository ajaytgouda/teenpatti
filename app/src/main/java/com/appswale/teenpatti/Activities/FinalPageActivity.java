package com.appswale.teenpatti.Activities;

import android.app.Dialog;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;

import com.appswale.teenpatti.R;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by AjayGouda on 11/11/17.
 */

public class FinalPageActivity extends AppCompatActivity {

    Button login,register;
    CircleImageView profile_image;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.final_page);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }
}
