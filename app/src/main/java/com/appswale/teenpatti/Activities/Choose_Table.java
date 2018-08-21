package com.appswale.teenpatti.Activities;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.AsyncTask;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.appswale.teenpatti.CommonCode.CommonCode;
import com.appswale.teenpatti.CommonCode.Constants;
import com.appswale.teenpatti.CommonCode.HttpHandler;
import com.appswale.teenpatti.CommonCode.SessionData;
import com.appswale.teenpatti.POJO.UserPojo;
import com.appswale.teenpatti.R;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import de.hdodenhof.circleimageview.CircleImageView;

public class Choose_Table extends AppCompatActivity {

    TextView playerName,playerPoints;
    ImageView logout,setting,bronze,silver,gold;
    UserPojo userPojo;
    CircleImageView playerImage;
    ProgressBar pointsProgress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_choose_table);
        //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        playerName=(TextView)findViewById(R.id.playerName);
        playerPoints=(TextView)findViewById(R.id.playerPoints);
        logout=(ImageView)findViewById(R.id.logout);
        setting=(ImageView)findViewById(R.id.setting);
        bronze=(ImageView)findViewById(R.id.bronze);
        silver=(ImageView)findViewById(R.id.silver);
        gold=(ImageView)findViewById(R.id.gold);
        playerImage=(CircleImageView)findViewById(R.id.playerImage);
        pointsProgress=(ProgressBar)findViewById(R.id.pointsProgress);
        SessionData sessionData=new SessionData(Choose_Table.this);
        if(sessionData.isPresent(Constants.USERPOJO)){
            userPojo= new Gson().fromJson(sessionData.getObjectAsString(Constants.USERPOJO),UserPojo.class);
            if(userPojo==null){
                Intent i = new Intent(Choose_Table.this, LoginActivity.class);
                startActivity(i);
                finish();
            }else{
                playerName.setText(userPojo.getName());
                playerPoints.setText(String.valueOf(userPojo.getPoints()));
                Picasso.with(Choose_Table.this).load(Constants.MainURL+userPojo.getProfileImage()).placeholder(R.mipmap.user_icon).into(playerImage);
            }
        }else{
            Intent i = new Intent(Choose_Table.this, LoginActivity.class);
            startActivity(i);
            finish();
        }

        bronze.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(userPojo!=null && userPojo.getPoints()>100) {
                    Intent i = new Intent(Choose_Table.this, TableActivity.class);
                    i.putExtra(Constants.USERPOJO, new Gson().toJson(userPojo));
                    i.putExtra(Constants.TABLETYPE, Constants.BRONZE);
                    startActivityForResult(i, 100);
                }else{
                    Toast.makeText(Choose_Table.this, "Not Allowed", Toast.LENGTH_SHORT).show();
                }
            }
        });
        silver.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(userPojo!=null && userPojo.getPoints()>300) {
                    Intent i = new Intent(Choose_Table.this, TableActivity.class);
                    i.putExtra(Constants.USERPOJO, new Gson().toJson(userPojo));
                    i.putExtra(Constants.TABLETYPE, Constants.SILVER);
                    startActivityForResult(i, 300);
                }else{
                    Toast.makeText(Choose_Table.this, "Not Allowed", Toast.LENGTH_SHORT).show();
                }
            }
        });
        gold.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(userPojo!=null && userPojo.getPoints()>500) {
                    Intent i = new Intent(Choose_Table.this, TableActivity.class);
                    i.putExtra(Constants.USERPOJO, new Gson().toJson(userPojo));
                    i.putExtra(Constants.TABLETYPE, Constants.GOLD);
                    startActivityForResult(i, 500);
                }else{
                    Toast.makeText(Choose_Table.this, "Not Allowed", Toast.LENGTH_SHORT).show();
                }
            }
        });
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new SessionData(Choose_Table.this).removeObject(Constants.USERPOJO);
                Intent i = new Intent(Choose_Table.this, LoginActivity.class);
                startActivity(i);
                finish();
            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();
        pointsProgress.setVisibility(View.VISIBLE);
        playerPoints.setVisibility(View.GONE);
        new Handler().postDelayed(new Runnable(){
            @Override
            public void run() {
                pointsProgress.setVisibility(View.GONE);
                playerPoints.setVisibility(View.VISIBLE);
                new GetPointsAPI(userPojo.getId()+"",Choose_Table.this).execute();
            }
        }, 2000);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if(requestCode==100){
            if(resultCode== Activity.RESULT_OK){
                Log.d("AJ","Played: 100");
            }else if(resultCode== Activity.RESULT_CANCELED){
                Log.d("AJ","Fail: 100");
            }
        }else if(requestCode==300){
            if(resultCode== Activity.RESULT_OK){
                Log.d("AJ","Played: 300");
            }else if(resultCode== Activity.RESULT_CANCELED){
                Log.d("AJ","Fail: 300");
            }
        }else if(requestCode==500){
            if(resultCode== Activity.RESULT_OK){
                Log.d("AJ","Played: 500");
            }else if(resultCode== Activity.RESULT_CANCELED){
                Log.d("AJ","Fail: 500");
            }
        }

        //new GetPointsAPI(userPojo.getId()+"",Choose_Table.this).execute();
//        UserPojo userPojo=new Gson().fromJson(data.getStringExtra(Constants.USERPOJO),UserPojo.class);
//        playerName.setText(userPojo.getName());
//        playerPoints.setText(String.valueOf(userPojo.getPoints()));
//        Picasso.with(Choose_Table.this).load(Constants.MainURL+userPojo.getProfileImage()).placeholder(R.mipmap.user_icon).into(playerImage);
    }

    class GetPointsAPI extends AsyncTask<Void,Void,Void> {

        String userId;
        Context mContext;
        String jsonResponse;
        ProgressDialog progressDialog;

        public GetPointsAPI(String userId, Context mContext) {
            this.userId = userId;
            this.mContext = mContext;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
        }

        @Override
        protected Void doInBackground(Void... voids) {
            try {

                HttpHandler handler=new HttpHandler();
                CommonCode.logWritter("Service: "+ Constants.GETPOINTS);
                UserPojo userPojo=new UserPojo();
                userPojo.setId(Integer.parseInt(userId));
                CommonCode.logWritter("User Post: " + new Gson().toJson(userPojo));
                jsonResponse = handler.postServiceCall(Constants.MainURL+Constants.GETPOINTS,new Gson().toJson(userPojo),"");
                CommonCode.logWritter("User Response: " + jsonResponse);

            }catch (Exception e){
                e.printStackTrace();
            }


            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            if(jsonResponse!=null){

                try{
                    JSONObject response=new JSONObject(jsonResponse);
                    if(response.getInt("isSuccess")==1){
                        if(response.has("response")){
                            playerPoints.setText(""+response.getInt("response"));
                        }
                    }else{
                        Toast.makeText(mContext, ""+response.getString("message"), Toast.LENGTH_SHORT).show();
                    }

                }catch (JSONException e){
                    e.printStackTrace();
                    //if(userPojo.getLoginType()!=0){
                    Toast.makeText(mContext, "Parse Issue", Toast.LENGTH_SHORT).show();
                    //}
                }

            }else{
                //if(userPojo.getLoginType()!=0){
                Toast.makeText(mContext, "No Response", Toast.LENGTH_SHORT).show();
//                    emailId.setText("");
//                    password.setText("");
//                }
            }

        }
    }

}
