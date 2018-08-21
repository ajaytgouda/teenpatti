package com.appswale.teenpatti.Activities;

import android.Manifest;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.appswale.teenpatti.CommonCode.CommonCode;
import com.appswale.teenpatti.CommonCode.Constants;
import com.appswale.teenpatti.CommonCode.HttpHandler;
import com.appswale.teenpatti.CommonCode.SessionData;
import com.appswale.teenpatti.POJO.UserPojo;
import com.appswale.teenpatti.R;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;

import cz.msebera.android.httpclient.HttpEntity;
import cz.msebera.android.httpclient.HttpResponse;
import cz.msebera.android.httpclient.client.HttpClient;
import cz.msebera.android.httpclient.client.methods.HttpPost;
import cz.msebera.android.httpclient.entity.mime.HttpMultipartMode;
import cz.msebera.android.httpclient.entity.mime.MultipartEntityBuilder;
import cz.msebera.android.httpclient.entity.mime.content.FileBody;
import cz.msebera.android.httpclient.impl.client.HttpClientBuilder;
import cz.msebera.android.httpclient.util.EntityUtils;
import de.hdodenhof.circleimageview.CircleImageView;

public class LoginActivity extends AppCompatActivity {

    Button login,register;
    LinearLayout progress,loginTab;
    Dialog loginDialog,registerDialog;
    String imageLink;
    CircleImageView profile_image;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
        login=(Button)findViewById(R.id.login);
        register=(Button)findViewById(R.id.register);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loginDialog();
            }
        });
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                registerDialog();
            }
        });
        progress=(LinearLayout)findViewById(R.id.progress);
        loginTab=(LinearLayout)findViewById(R.id.loginTab);

        SessionData sessionData=new SessionData(LoginActivity.this);
        if(sessionData.isPresent(Constants.USERPOJO)){
            UserPojo userPojo=new Gson().fromJson(sessionData.getObjectAsString(Constants.USERPOJO),UserPojo.class);
            if(userPojo!=null){
                new LoginService(userPojo,LoginActivity.this).execute();
            }
        }

    }

    public void loginDialog()
    {
        loginDialog = new Dialog(LoginActivity.this);
        loginDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        loginDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        loginDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        loginDialog.setCancelable(false);
        loginDialog.setContentView(R.layout.login_dialog);
//        Window window = loginDialog.getWindow();
//        window.setLayout(1200, 800);
        //window.setLayout(WindowManager.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT);

        loginDialog.setCancelable(true);
        final EditText email,password;
        email=(EditText)loginDialog.findViewById(R.id.email);
        password=(EditText)loginDialog.findViewById(R.id.password);
        Button submit;
        submit=(Button)loginDialog.findViewById(R.id.submit);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int error=0;
                UserPojo userPojo=new UserPojo();
                if(email.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    email.setError("Enter value");
                }else{
                    userPojo.setEmail(email.getText().toString());
                }
                if(password.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    password.setError("Enter value");
                }else{
                    userPojo.setPassword(password.getText().toString());
                }
                if(error==0){
                    new LoginService(userPojo,LoginActivity.this).execute();
                    loginDialog.dismiss();
                }else{
                    Toast.makeText(LoginActivity.this, "Enter Data", Toast.LENGTH_SHORT).show();
                }
            }
        });
        loginDialog.show();


    }

    public void registerDialog()
    {
        registerDialog = new Dialog(LoginActivity.this);
        registerDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
        registerDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        registerDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        registerDialog.setCancelable(false);
        registerDialog.setContentView(R.layout.register_layout);
//        Window window = registerDialog.getWindow();
//        //window.setLayout(1200, 800);
//        window.setLayout(.LayoutParams.WRAP_CONTENT, WindowManager.LayoutParams.WRAP_CONTENT);

        registerDialog.setCancelable(true);
        final EditText email,password,name,number;
        //CircleImageView profile_image;
        name=(EditText)registerDialog.findViewById(R.id.name);
        email=(EditText)registerDialog.findViewById(R.id.email);
        number=(EditText)registerDialog.findViewById(R.id.number);
        password=(EditText)registerDialog.findViewById(R.id.password);
        profile_image=(CircleImageView)registerDialog.findViewById(R.id.profile_image);
        Button submit;
        submit=(Button)registerDialog.findViewById(R.id.submit);
        submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int error=0;
                UserPojo userPojo=new UserPojo();
                if(name.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    name.setError("Enter value");
                }else{
                    userPojo.setName(name.getText().toString());
                }
                if(email.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    email.setError("Enter value");
                }else{
                    userPojo.setEmail(email.getText().toString());
                }
                if(number.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    number.setError("Enter value");
                }else{
                    userPojo.setMobile(number.getText().toString());
                }
                if(password.getText().toString().equalsIgnoreCase("")){
                    error=error+1;
                    password.setError("Enter value");
                }else{
                    userPojo.setPassword(password.getText().toString());

                }



                if(error==0){
                    registerDialog.dismiss();
                    if(imageLink!=null){
                        userPojo.setProfileImage(imageLink);
                        new UploadImage(LoginActivity.this,userPojo).execute();
                    }else{
                        userPojo.setProfileImage("");
                        new RegisterService(userPojo,LoginActivity.this).execute();
                    }
                }else{
                    Toast.makeText(LoginActivity.this, "Enter Data", Toast.LENGTH_SHORT).show();
                }
            }
        });
        profile_image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (ContextCompat.checkSelfPermission(LoginActivity.this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(LoginActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                    if (Build.VERSION.SDK_INT >= 23) {
                        requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE,
                                Manifest.permission.WRITE_EXTERNAL_STORAGE}, 100);
                    }
                    return;
                }
                CropImage.activity()
                        .setGuidelines(CropImageView.Guidelines.ON)
                        .setAspectRatio(1,1)
                        .start(LoginActivity.this);
            }
        });
        registerDialog.show();


    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode==100){
            for (int i = 0; i < permissions.length; i++) {
                String permission = permissions[i];
                int grantResult = grantResults[i];

                if (permission.equals(Manifest.permission.READ_EXTERNAL_STORAGE)) {
                    if (grantResult == PackageManager.PERMISSION_GRANTED) {
                        CropImage.activity()
                                .setGuidelines(CropImageView.Guidelines.ON)
                                .setAspectRatio(1,1)
                                .start(LoginActivity.this);
                    } else {
                        //requestPermissions(new String[]{Manifest.permission.SEND_SMS}, PERMISSIONS_CODE);
                        if (Build.VERSION.SDK_INT >= 23) {
                            requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE,
                                    Manifest.permission.WRITE_EXTERNAL_STORAGE}, 100);
                        }
                    }
                }
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {
                Uri resultUri = result.getUri();
                imageLink=resultUri.getPath();
                Picasso.with(LoginActivity.this).load(new File(imageLink)).placeholder(R.mipmap.user_icon).into(profile_image);

            } else if (resultCode == CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
                Exception error = result.getError();
            }
        }
    }

    class LoginService extends AsyncTask<Void,Void,Void> {

        UserPojo userPojo;
        Context mContext;
        String jsonResponse;
        ProgressDialog progressDialog;

        public LoginService(UserPojo userPojo, Context mContext) {
            this.userPojo = userPojo;
            this.mContext = mContext;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progress.setVisibility(View.VISIBLE);
            loginTab.setVisibility(View.GONE);
        }

        @Override
        protected Void doInBackground(Void... voids) {
            try {

                HttpHandler handler=new HttpHandler();
                CommonCode.logWritter("Service: "+ Constants.LOGIN);

                CommonCode.logWritter("User Post: " + new Gson().toJson(userPojo));
                jsonResponse = handler.postServiceCall(Constants.MainURL+Constants.LOGIN,new Gson().toJson(userPojo),"");
                CommonCode.logWritter("User Response: " + jsonResponse);

            }catch (Exception e){
                e.printStackTrace();
            }


            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            progress.setVisibility(View.GONE);
            loginTab.setVisibility(View.VISIBLE);
            if(jsonResponse!=null){

                try{
                    JSONObject response=new JSONObject(jsonResponse);
                    if(response.getInt("isSuccess")==1){
                        UserPojo user=new Gson().fromJson(response.getJSONObject("response").toString(),UserPojo.class);
                        user.setPassword(userPojo.getPassword());
                        new SessionData(mContext).setObjectAsString(Constants.USERPOJO,new Gson().toJson(user));

                        Intent i=new Intent(mContext,Choose_Table.class);
                        startActivity(i);
                        finish();
                    }else{
                        if(new SessionData(mContext).isPresent(Constants.USERPOJO)){
                            new SessionData(mContext).removeObject(Constants.USERPOJO);
                        }
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


    class RegisterService extends AsyncTask<Void,Void,Void> {

        UserPojo userPojo;
        Context mContext;
        String jsonResponse;
        ProgressDialog progressDialog;

        public RegisterService(UserPojo userPojo, Context mContext) {
            this.userPojo = userPojo;
            this.mContext = mContext;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progress.setVisibility(View.VISIBLE);
            loginTab.setVisibility(View.GONE);
        }

        @Override
        protected Void doInBackground(Void... voids) {
            try {

                HttpHandler handler=new HttpHandler();
                CommonCode.logWritter("Service: "+ Constants.REGISTER);

                CommonCode.logWritter("User Post: " + new Gson().toJson(userPojo));
                jsonResponse = handler.postServiceCall(Constants.MainURL+Constants.REGISTER,new Gson().toJson(userPojo),"");
                CommonCode.logWritter("User Response: " + jsonResponse);

            }catch (Exception e){
                e.printStackTrace();
            }


            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            progress.setVisibility(View.GONE);
            loginTab.setVisibility(View.VISIBLE);
            if(jsonResponse!=null){

                try{
                    JSONObject response=new JSONObject(jsonResponse);
                    if(response.getInt("isSuccess")==1){
                        Toast.makeText(mContext, "Successfully Registered", Toast.LENGTH_SHORT).show();
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


    class UploadImage extends AsyncTask<Void,Void,Void>{

        JSONObject jsonObject;
        Context context;
        UserPojo userPojo;
        ProgressDialog progress;

        public UploadImage(Context context, UserPojo userPojo) {
            this.context = context;
            this.userPojo = userPojo;
        }

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            progress=new ProgressDialog(context);
            progress.setMessage("Uploading...");
            progress.setCancelable(false);
            progress.show();
        }

        @Override
        protected Void doInBackground(Void... params) {
            HttpClient clientLogin = HttpClientBuilder.create().build();
            String URLLogin = Constants.MainURL+Constants.UPLOAD;
            HttpPost postLogin = new HttpPost(URLLogin);
            try {


                MultipartEntityBuilder builder = MultipartEntityBuilder.create();

                //example for setting a HttpMultipartMode

                builder.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);

                if (userPojo.getProfileImage() != null && !userPojo.getProfileImage().equalsIgnoreCase("")) {
                    FileBody fileBody = new FileBody(new File(userPojo.getProfileImage()));
                    builder.addPart("file", fileBody);
                }

                HttpEntity entity = builder.build();
                postLogin.setEntity(entity);
                CommonCode.logWritter("entity: " + entity.toString());


                HttpResponse responseLogin;
                responseLogin = clientLogin.execute(postLogin);
                String resFromServerLogin = EntityUtils.toString(responseLogin.getEntity());


                CommonCode.logWritter("Response " + resFromServerLogin.toString());
                jsonObject = new JSONObject(resFromServerLogin);
            }catch (Exception e){
                e.printStackTrace();
            }
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);
            if(progress!=null){
                if(progress.isShowing()){
                    progress.dismiss();
                }
            }

            if(jsonObject!=null){
                try {
                    if (jsonObject.getInt("isSuccess") == 1) {
                        userPojo.setProfileImage(jsonObject.getString("response"));
                        new RegisterService(userPojo,context).execute();
                    }else{
                        Toast.makeText(context, ""+jsonObject.getString("message"), Toast.LENGTH_SHORT).show();
                    }
                }catch (JSONException e){
                    e.printStackTrace();
                }
            }
        }
    }

}
