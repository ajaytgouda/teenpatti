package com.appswale.teenpatti.Activities;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.PowerManager;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.appswale.teenpatti.CommonCode.Constants;
import com.appswale.teenpatti.POJO.UserPojo;
import com.appswale.teenpatti.R;
import com.google.gson.Gson;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.Timer;
import java.util.TimerTask;

import de.hdodenhof.circleimageview.CircleImageView;
import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class TableActivity extends AppCompatActivity {

    CircleImageView user_one_image,user_two_image,user_three_image,user_four_image,user_five_image;
    ProgressBar user_one_progress,user_two_progress,user_three_progress,user_four_progress,user_five_progress;
    TextView user_one_name,user_two_name,user_three_name,user_four_name,user_five_name;
    TextView user_one_status,user_two_status,user_three_status,user_four_status,user_five_status;
    TextView user_one_card_status,user_two_card_status,user_three_card_status,user_four_card_status,user_five_card_status;
    ImageView user_one_card_one,user_one_card_two,user_one_card_three;
    ImageView user_two_card_one,user_two_card_two,user_two_card_three;
    ImageView user_three_card_one,user_three_card_two,user_three_card_three;
    ImageView user_four_card_one,user_four_card_two,user_four_card_three;
    ImageView user_five_card_one,user_five_card_two,user_five_card_three;
    LinearLayout pack_button,side_show,challLayout;
    TextView myPoints,challText,console;

    TextView maxCost,currentBet,currentCollection;

    LinearLayout segmentOne,segmentTwo;
    RelativeLayout segmentThree,segmentFour,segmentFive;

    ImageView addcoin,minuscoin;
    LinearLayout LayoutSee,tip_button;
    int chalCost=0;

    boolean hasSeen;

    int isChalCount=1;

    private Socket mSocket;
    {
        try
        {
            mSocket = IO.socket(Constants.MainURL);
           // mSocket.connect();
        }
        catch (URISyntaxException e)
        {
            e.printStackTrace();
        }
    }

    UserPojo userPojo;
    String TABLETYPE=null;
    boolean isLiveConnected=false;
    Timer timer =new Timer();

    MyCountDownTimer1 myCountDownTimer1;
    MyCountDownTimer2 myCountDownTimer2;
    MyCountDownTimer3 myCountDownTimer3;
    MyCountDownTimer4 myCountDownTimer4;
    MyCountDownTimer5 myCountDownTimer5;

    boolean isShowTobeSeen;

    private String AppIntent=Constants.MAINSCREEN;
    BroadcastReceiver receiver =new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            if(intent.getStringExtra("type").equalsIgnoreCase("TABLEUPDATE")){
                tableUpdate(intent.getStringExtra("value"));
            }else if(intent.getStringExtra("type").equalsIgnoreCase("START_OTHER_TURN")){
                if(intent.getStringExtra("value").equalsIgnoreCase("1")){
                    user_one_progress.setVisibility(View.VISIBLE);
                    myCountDownTimer1=new MyCountDownTimer1(20000,1000);
                    myCountDownTimer1.start();
                }else if(intent.getStringExtra("value").equalsIgnoreCase("2")){
                    user_two_progress.setVisibility(View.VISIBLE);
                    myCountDownTimer2=new MyCountDownTimer2(20000,1000);
                    myCountDownTimer2.start();
                }else if(intent.getStringExtra("value").equalsIgnoreCase("3")){
                    user_three_progress.setVisibility(View.VISIBLE);
                    myCountDownTimer3=new MyCountDownTimer3(20000,1000);
                    myCountDownTimer3.start();
                }else if(intent.getStringExtra("value").equalsIgnoreCase("4")){
                    user_four_progress.setVisibility(View.VISIBLE);
                    myCountDownTimer4=new MyCountDownTimer4(20000,1000);
                    myCountDownTimer4.start();
                }
            }else if(intent.getStringExtra("type").equalsIgnoreCase("STOP_OTHER_TURN")){
                if(intent.getStringExtra("value").equalsIgnoreCase("1")){
                    if(myCountDownTimer1!=null){
                        myCountDownTimer1.cancel();
                        user_one_progress.setVisibility(View.GONE);
                    }
                }else if(intent.getStringExtra("value").equalsIgnoreCase("2")){
                    if(myCountDownTimer2!=null){
                        myCountDownTimer2.cancel();
                        user_two_progress.setVisibility(View.GONE);
                    }
                }else if(intent.getStringExtra("value").equalsIgnoreCase("3")){
                    if(myCountDownTimer3!=null){
                        myCountDownTimer3.cancel();
                        user_three_progress.setVisibility(View.GONE);
                    }
                }else if(intent.getStringExtra("value").equalsIgnoreCase("4")){
                    if(myCountDownTimer4!=null){
                        myCountDownTimer4.cancel();
                        user_four_progress.setVisibility(View.GONE);
                    }
                }
            }else if(intent.getStringExtra("type").equalsIgnoreCase("START_SELF_TURN")){
                user_five_progress.setVisibility(View.VISIBLE);
                myCountDownTimer5=new MyCountDownTimer5(20000,1000);
                myCountDownTimer5.start();
                pack_button.setVisibility(View.VISIBLE);
                addcoin.setVisibility(View.VISIBLE);
                minuscoin.setVisibility(View.VISIBLE);
                challLayout.setVisibility(View.VISIBLE);
                if(isShowTobeSeen){
                    side_show.setVisibility(View.VISIBLE);
                }else{
                    side_show.setVisibility(View.GONE);
                }
            }else if(intent.getStringExtra("type").equalsIgnoreCase("STOP_SELF_TURN")){
                if(myCountDownTimer5!=null){
                    myCountDownTimer5.cancel();
                    user_five_progress.setVisibility(View.GONE);
                }
                pack_button.setVisibility(View.GONE);
                addcoin.setVisibility(View.GONE);
                minuscoin.setVisibility(View.GONE);
                challLayout.setVisibility(View.GONE);
                side_show.setVisibility(View.GONE);
            }else if(intent.getStringExtra("type").equalsIgnoreCase("TOAST")){
                console.setText(intent.getStringExtra("value"));
            }else if(intent.getStringExtra("type").equalsIgnoreCase("COST")){
                try {
                    JSONObject obj=new JSONObject(intent.getStringExtra("value"));
                    if(obj.has("minBetCost")){
                        chalCost=obj.getInt("minBetCost");
                        currentBet.setText("Current Bet: ₹"+obj.getInt("minBetCost"));
                        if(hasSeen){
                            int costOfSeen=chalCost+chalCost;
                            challText.setText("CHALL \n ₹ "+costOfSeen);
                        }else {
                            challText.setText("BLIND \n ₹ "+chalCost);
                        }
                    }
                    if(obj.has("currentTableCost")){
                        currentCollection.setText("Collection: ₹"+obj.getInt("currentTableCost"));
                    }
                    if(obj.has("maxTableCost")){
                        maxCost.setText("MaxBet: ₹"+obj.getInt("maxTableCost"));
                    }
                    if(obj.has("yourBet")){
                        myPoints.setText("₹"+obj.getInt("yourBet"));
                    }

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    protected PowerManager.WakeLock mWakeLock;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_table);
        //setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);


        final PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        this.mWakeLock = pm.newWakeLock(PowerManager.SCREEN_DIM_WAKE_LOCK, "TEENPATTI");
        this.mWakeLock.acquire();

        user_one_image=(CircleImageView)findViewById(R.id.user_one_image);
        user_two_image=(CircleImageView)findViewById(R.id.user_two_image);
        user_three_image=(CircleImageView)findViewById(R.id.user_three_image);
        user_four_image=(CircleImageView)findViewById(R.id.user_four_image);
        user_five_image=(CircleImageView)findViewById(R.id.user_five_image);

        user_one_progress=(ProgressBar)findViewById(R.id.user_one_progress);
        user_two_progress=(ProgressBar)findViewById(R.id.user_two_progress);
        user_three_progress=(ProgressBar)findViewById(R.id.user_three_progress);
        user_four_progress=(ProgressBar)findViewById(R.id.user_four_progress);
        user_five_progress=(ProgressBar)findViewById(R.id.user_five_progress);

        user_one_progress.setVisibility(View.GONE);
        user_two_progress.setVisibility(View.GONE);
        user_three_progress.setVisibility(View.GONE);
        user_four_progress.setVisibility(View.GONE);
        user_five_progress.setVisibility(View.GONE);


        user_one_name=(TextView)findViewById(R.id.user_one_name);
        user_two_name=(TextView)findViewById(R.id.user_two_name);
        user_three_name=(TextView)findViewById(R.id.user_three_name);
        user_four_name=(TextView)findViewById(R.id.user_four_name);
        user_five_name=(TextView)findViewById(R.id.user_five_name);

        user_one_status=(TextView)findViewById(R.id.user_one_status);
        user_two_status=(TextView)findViewById(R.id.user_two_status);
        user_three_status=(TextView)findViewById(R.id.user_three_status);
        user_four_status=(TextView)findViewById(R.id.user_four_status);
        user_five_status=(TextView)findViewById(R.id.user_five_status);

        user_one_card_status=(TextView)findViewById(R.id.user_one_card_status);
        user_two_card_status=(TextView)findViewById(R.id.user_two_card_status);
        user_three_card_status=(TextView)findViewById(R.id.user_three_card_status);
        user_four_card_status=(TextView)findViewById(R.id.user_four_card_status);
        user_five_card_status=(TextView)findViewById(R.id.user_five_card_status);

        user_one_card_one=(ImageView)findViewById(R.id.user_one_card_one);
        user_one_card_two=(ImageView)findViewById(R.id.user_one_card_two);
        user_one_card_three=(ImageView)findViewById(R.id.user_one_card_three);

        user_two_card_one=(ImageView)findViewById(R.id.user_two_card_one);
        user_two_card_two=(ImageView)findViewById(R.id.user_two_card_two);
        user_two_card_three=(ImageView)findViewById(R.id.user_two_card_three);

        user_three_card_one=(ImageView)findViewById(R.id.user_three_card_one);
        user_three_card_two=(ImageView)findViewById(R.id.user_three_card_two);
        user_three_card_three=(ImageView)findViewById(R.id.user_three_card_three);

        user_four_card_one=(ImageView)findViewById(R.id.user_four_card_one);
        user_four_card_two=(ImageView)findViewById(R.id.user_four_card_two);
        user_four_card_three=(ImageView)findViewById(R.id.user_four_card_three);

        user_five_card_one=(ImageView)findViewById(R.id.user_five_card_one);
        user_five_card_two=(ImageView)findViewById(R.id.user_five_card_two);
        user_five_card_three=(ImageView)findViewById(R.id.user_five_card_three);

        pack_button=(LinearLayout)findViewById(R.id.pack_button);
        side_show=(LinearLayout)findViewById(R.id.side_show);
        challLayout=(LinearLayout)findViewById(R.id.challLayout);
        tip_button=(LinearLayout)findViewById(R.id.tip_button);
        challText=(TextView)findViewById(R.id.challText);

        console=(TextView)findViewById(R.id.console);

        addcoin=(ImageView)findViewById(R.id.addcoin);
        minuscoin=(ImageView)findViewById(R.id.minuscoin);

        segmentOne=(LinearLayout)findViewById(R.id.segmentOne);
        segmentTwo=(LinearLayout)findViewById(R.id.segmentTwo);

        segmentThree=(RelativeLayout) findViewById(R.id.segmentThree);
        segmentFour=(RelativeLayout)findViewById(R.id.segmentFour);

        segmentFive=(RelativeLayout)findViewById(R.id.segmentFive);

        maxCost=(TextView)findViewById(R.id.maxCost);
        currentBet=(TextView)findViewById(R.id.currentBet);
        currentCollection=(TextView)findViewById(R.id.currentCollection);


        LayoutSee =(LinearLayout)findViewById(R.id.LayoutSee);


        myPoints=(TextView)findViewById(R.id.myPoints);

        segmentOne.setVisibility(View.GONE);
        segmentTwo.setVisibility(View.GONE);
        segmentThree.setVisibility(View.GONE);
        segmentFour.setVisibility(View.GONE);
        segmentFive.setVisibility(View.GONE);
        tip_button.setVisibility(View.GONE);

        console.setVisibility(View.VISIBLE);
        console.setText(" CONNECTING .... ");

        mSocket.connect();
        LocalBroadcastManager.getInstance(this).registerReceiver(receiver, new IntentFilter(AppIntent));

        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                if(isLiveConnected){
                    isLiveConnected=false;
                }else{
                    if(mSocket!=null&&!mSocket.connected()) {
                        mSocket.connect();
                    }
                }
            }
        },0,1800);

        if(getIntent().hasExtra(Constants.USERPOJO)) {
            userPojo = new Gson().fromJson(getIntent().getStringExtra(Constants.USERPOJO),UserPojo.class);
            if(userPojo!=null){

                segmentThree.setVisibility(View.VISIBLE);
                user_five_name.setText(userPojo.getName());
                Picasso.with(TableActivity.this).load(Constants.MainURL+userPojo.getProfileImage()).resize(80,80).placeholder(R.mipmap.user_icon).into(user_five_image);
                user_five_card_one.setVisibility(View.GONE);
                user_five_card_two.setVisibility(View.GONE);
                user_five_card_three.setVisibility(View.GONE);
                user_five_card_status.setVisibility(View.GONE);
                user_five_status.setVisibility(View.GONE);
            }else{
                Intent i=new Intent();
                i.putExtra(Constants.USERPOJO,new Gson().toJson(userPojo));
                setResult(Activity.RESULT_CANCELED);
                finish();
            }
            TABLETYPE=getIntent().getStringExtra(Constants.TABLETYPE);
        }else{
            Intent i=new Intent();
            i.putExtra(Constants.USERPOJO,new Gson().toJson(userPojo));
            setResult(Activity.RESULT_CANCELED);
            finish();
        }

        mSocket.on("connect", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
            if(userPojo!=null) {
                UserPojo user=new UserPojo();
                user.setEmail(userPojo.getEmail());
                user.setId(userPojo.getId());
                user.setProfileImage(userPojo.getProfileImage());
                user.setPoints(userPojo.getPoints());
                user.setName(userPojo.getName());
                user.setMobile(userPojo.getMobile());

                if (TABLETYPE.equalsIgnoreCase(Constants.BRONZE)) {
                    chalCost=5;
                    mSocket.emit("joinBronze", new Gson().toJson(user));
                    challText.setText("CHALL \n ₹ "+chalCost);
                } else if (TABLETYPE.equalsIgnoreCase(Constants.SILVER)) {
                    chalCost=10;
                    mSocket.emit("joinSilver", new Gson().toJson(user));
                    challText.setText("CHALL \n ₹ "+chalCost);
                } else if (TABLETYPE.equalsIgnoreCase(Constants.GOLD)) {
                    chalCost=15;
                    mSocket.emit("joinGold", new Gson().toJson(user));
                    challText.setText("CHALL \n ₹ "+chalCost);
                }
            }else{
                Intent i=new Intent();
                i.putExtra(Constants.USERPOJO,new Gson().toJson(userPojo));
                setResult(Activity.RESULT_CANCELED);
                finish();
            }
            }
        });

        mSocket.on("live", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
            isLiveConnected=true;
                if(mSocket!=null && mSocket.connected()) {
                    mSocket.emit("live", "");
                }
            }
        });

        mSocket.on("EXIT_GAME", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
            //Toast.makeText(TableActivity.this, ""+args[0].toString(), Toast.LENGTH_SHORT).show();
            Intent i=new Intent();
            i.putExtra(Constants.USERPOJO,new Gson().toJson(userPojo));
            setResult(Activity.RESULT_CANCELED);
            finish();
            }
        });
        mSocket.on("SCREEN_UPDATE", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
            //Log.d("AJ","SCREEN_UPDATE: "+args[0].toString());
            Intent intent = new Intent(Constants.MAINSCREEN);
            intent.putExtra("type","TABLEUPDATE");
            intent.putExtra("value",args[0].toString());
            LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("START_OTHER_TURN", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","START_OTHER_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","START_OTHER_TURN");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("STOP_OTHER_TURN", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","STOP_OTHER_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","STOP_OTHER_TURN");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("START_SELF_TURN", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","START_SELF_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","START_SELF_TURN");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("STOP_SELF_TURN", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","STOP_SELF_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","STOP_SELF_TURN");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("TOAST", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","STOP_SELF_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","TOAST");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        mSocket.on("COST", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                //Log.d("AJ","STOP_SELF_TURN: "+args[0].toString());
                Intent intent = new Intent(Constants.MAINSCREEN);
                intent.putExtra("type","COST");
                intent.putExtra("value",args[0].toString());
                LocalBroadcastManager.getInstance(TableActivity.this).sendBroadcast(intent);
            }
        });

        pack_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(mSocket.connected()){
                    mSocket.emit("PACK","");
                }
            }
        });

        tip_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(mSocket.connected()){
                    mSocket.emit("TIP","");
                }

            }
        });

        challLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(mSocket.connected()){
                    mSocket.emit("CHAL",""+isChalCount);
                    isChalCount=1;
                }
            }
        });

        addcoin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (TABLETYPE){
                    case Constants.BRONZE:
                        if(chalCost<500 && isChalCount<2) {
                            chalCost = chalCost /isChalCount;
                            isChalCount = isChalCount + 1;
                            chalCost = chalCost * isChalCount;
                            if (hasSeen) {
                                int costOfSeen = chalCost + chalCost;
                                challText.setText("CHALL \n ₹ " + costOfSeen);
                            } else {
                                challText.setText("BLIND \n ₹ " + chalCost);
                            }
                        }else{
                            Toast.makeText(TableActivity.this, "Can't increase more", Toast.LENGTH_SHORT).show();
                        }

                        break;
                    case Constants.SILVER:
                        if(chalCost<1000 && isChalCount<2) {
                            chalCost = chalCost /isChalCount;
                            isChalCount = isChalCount + 1;
                            chalCost = chalCost * isChalCount;
                            if (hasSeen) {
                                int costOfSeen = chalCost + chalCost;
                                challText.setText("CHALL \n ₹ " + costOfSeen);
                            } else {
                                challText.setText("BLIND \n ₹ " + chalCost);
                            }
                        }else{
                            Toast.makeText(TableActivity.this, "Can't Increase more", Toast.LENGTH_SHORT).show();
                        }
                        break;
                    case Constants.GOLD:
                        if(chalCost<1500 && isChalCount<2) {
                            chalCost = chalCost /isChalCount;
                            isChalCount = isChalCount + 1;
                            chalCost = chalCost * isChalCount;
                            if (hasSeen) {
                                int costOfSeen = chalCost + chalCost;
                                challText.setText("CHALL \n ₹ " + costOfSeen);
                            } else {
                                challText.setText("BLIND \n ₹ " + chalCost);
                            }
                        }else{
                            Toast.makeText(TableActivity.this, "Can't increase more", Toast.LENGTH_SHORT).show();
                        }
                        break;
                }
            }
        });

        minuscoin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (TABLETYPE){
                    case Constants.BRONZE:

                        if(isChalCount>1) {
                            chalCost = chalCost /isChalCount;
                            isChalCount=isChalCount-1;
                            chalCost=chalCost*isChalCount;
                            if(hasSeen){
                                int costOfSeen=chalCost+chalCost;
                                challText.setText("CHALL \n ₹ "+costOfSeen);
                            }else {
                                challText.setText("BLIND \n ₹ "+chalCost);
                            }
                            Log.d("AJ","isChalCount: "+isChalCount+", chalCost: "+chalCost+", hasSeen: "+hasSeen);
                        }else{
                            Toast.makeText(TableActivity.this, "Cannot reduce", Toast.LENGTH_SHORT).show();
                        }
                        break;
                    case Constants.SILVER:
                        if(isChalCount>1) {
                            chalCost = chalCost /isChalCount;
                            isChalCount=isChalCount-1;
                            chalCost=chalCost*isChalCount;
                            if(hasSeen){
                                int costOfSeen=chalCost+chalCost;
                                challText.setText("CHALL \n ₹ "+costOfSeen);
                            }else {
                                challText.setText("BLIND \n ₹ "+chalCost);
                            }
                        }else{
                            Toast.makeText(TableActivity.this, "Cannot reduce", Toast.LENGTH_SHORT).show();
                        }
                        break;
                    case Constants.GOLD:
                        if(isChalCount>1) {
                            chalCost = chalCost /isChalCount;
                            isChalCount=isChalCount-1;
                            chalCost=chalCost*isChalCount;
                            if(hasSeen){
                                int costOfSeen=chalCost+chalCost;
                                challText.setText("CHALL \n ₹ "+costOfSeen);
                            }else {
                                challText.setText("BLIND \n ₹ "+chalCost);
                            }
                        }else{
                            Toast.makeText(TableActivity.this, "Cannot reduce", Toast.LENGTH_SHORT).show();
                        }
                        break;
                }
            }
        });

// SEE CARD ONCLICK
        LayoutSee.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Log.d("AJ","SEE: "+"EMIT");
                mSocket.emit("cardStatus","");
            }
        });

        side_show.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pack_button.setVisibility(View.GONE);
                addcoin.setVisibility(View.GONE);
                minuscoin.setVisibility(View.GONE);
                challLayout.setVisibility(View.GONE);
                side_show.setVisibility(View.GONE);
                mSocket.emit("SHOW","");
            }
        });



    }

    public class MyCountDownTimer1 extends CountDownTimer {


        public MyCountDownTimer1(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {

            int progress = (int) (millisUntilFinished / 1000);

            user_one_progress.setProgress(user_one_progress.getMax() - progress);
            //timer.setText("" + progress);
        }

        @Override
        public void onFinish() {

            user_one_progress.setVisibility(View.GONE);

        }
    }

    public class MyCountDownTimer2 extends CountDownTimer {


        public MyCountDownTimer2(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {

            int progress = (int) (millisUntilFinished / 1000);

            user_two_progress.setProgress(user_two_progress.getMax() - progress);
            //timer.setText("" + progress);
        }

        @Override
        public void onFinish() {

            user_two_progress.setVisibility(View.GONE);

        }
    }

    public class MyCountDownTimer3 extends CountDownTimer {


        public MyCountDownTimer3(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {

            int progress = (int) (millisUntilFinished / 1000);

            user_three_progress.setProgress(user_three_progress.getMax() - progress);
            //timer.setText("" + progress);
        }

        @Override
        public void onFinish() {

            user_three_progress.setVisibility(View.GONE);

        }
    }

    public class MyCountDownTimer4 extends CountDownTimer {


        public MyCountDownTimer4(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {

            int progress = (int) (millisUntilFinished / 1000);

            user_four_progress.setProgress(user_four_progress.getMax() - progress);
            //timer.setText("" + progress);
        }

        @Override
        public void onFinish() {

            user_four_progress.setVisibility(View.GONE);

        }
    }

    public class MyCountDownTimer5 extends CountDownTimer {


        public MyCountDownTimer5(long millisInFuture, long countDownInterval) {
            super(millisInFuture, countDownInterval);
        }

        @Override
        public void onTick(long millisUntilFinished) {

            int progress = (int) (millisUntilFinished / 1000);

            user_five_progress.setProgress(user_five_progress.getMax() - progress);
            //timer.setText("" + progress);
        }

        @Override
        public void onFinish() {

            user_five_progress.setVisibility(View.GONE);

        }
    }


    private void tableUpdate (String data){
        try {
            segmentOne.setVisibility(View.VISIBLE);
            segmentTwo.setVisibility(View.VISIBLE);
            segmentThree.setVisibility(View.VISIBLE);
            JSONArray tableList = new JSONArray(data);
            //Log.d("AJ","Data: "+data);
            if(tableList.get(0)!=null && !tableList.get(0).toString().equals("null")){
                JSONObject obj=new JSONObject(tableList.get(0).toString());
                if(obj.has("name")){
                    user_one_name.setText(obj.getString("name"));
                }
                if(obj.has("status")){
                    user_one_status.setText(obj.getString("status"));
                }else{
                    user_one_status.setText("");
                }
                if(obj.has("profileImage")){
                    Picasso.with(TableActivity.this).load(Constants.MainURL+obj.getString("profileImage")).resize(80,80).placeholder(R.mipmap.user_icon).into(user_one_image);
                }
                if(obj.has("cards") && obj.getJSONArray("cards").length()>0){

                    if(obj.has("isShowCard") && obj.getBoolean("isShowCard")){
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_one_card_one.setVisibility(View.VISIBLE);
                        setCardImage(cardOne.getString("id"),user_one_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_one_card_two.setVisibility(View.VISIBLE);
                        setCardImage(cardTwo.getString("id"),user_one_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_one_card_three.setVisibility(View.VISIBLE);
                        setCardImage(cardThree.getString("id"),user_one_card_three);
                    }else{
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_one_card_one.setVisibility(View.VISIBLE);
                        setCardImage("",user_one_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_one_card_two.setVisibility(View.VISIBLE);
                        setCardImage("",user_one_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_one_card_three.setVisibility(View.VISIBLE);
                        setCardImage("",user_one_card_three);
                    }
                }else{
                    user_one_card_one.setVisibility(View.GONE);
                    user_one_card_two.setVisibility(View.GONE);
                    user_one_card_three.setVisibility(View.GONE);
                }
                if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                    user_one_card_status.setVisibility(View.VISIBLE);
                    user_one_card_status.setText(obj.getString("cardStatus"));
                }else{
                    user_one_card_status.setVisibility(View.GONE);
                }
            }else{
                user_one_name.setText("No User");
                user_one_status.setText("");
                user_one_card_status.setText("");
                user_one_card_status.setVisibility(View.GONE);
                user_one_card_one.setVisibility(View.GONE);
                user_one_card_two.setVisibility(View.GONE);
                user_one_card_three.setVisibility(View.GONE);
                user_one_image.setImageResource(R.mipmap.user_icon);
            }
            if(tableList.get(1)!=null && !tableList.get(1).toString().equals("null")){
                JSONObject obj=new JSONObject(tableList.get(1).toString());
                if(obj.has("name")){
                    user_two_name.setText(obj.getString("name"));
                }
                if(obj.has("status")){
                    user_two_status.setText(obj.getString("status"));
                }else{
                    user_two_status.setText("");
                }
                if(obj.has("profileImage")){
                    Picasso.with(TableActivity.this).load(Constants.MainURL+obj.getString("profileImage")).resize(80,80).placeholder(R.mipmap.user_icon).into(user_two_image);
                }
                if(obj.has("cards") && obj.getJSONArray("cards").length()>0){

                    if(obj.has("isShowCard") && obj.getBoolean("isShowCard")){
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_two_card_one.setVisibility(View.VISIBLE);
                        setCardImage(cardOne.getString("id"),user_two_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_two_card_two.setVisibility(View.VISIBLE);
                        setCardImage(cardTwo.getString("id"),user_two_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_two_card_three.setVisibility(View.VISIBLE);
                        setCardImage(cardThree.getString("id"),user_two_card_three);
                    }else{
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_two_card_one.setVisibility(View.VISIBLE);
                        setCardImage("",user_two_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_two_card_two.setVisibility(View.VISIBLE);
                        setCardImage("",user_two_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_two_card_three.setVisibility(View.VISIBLE);
                        setCardImage("",user_two_card_three);
                    }
                }else{
                    user_two_card_one.setVisibility(View.GONE);
                    user_two_card_two.setVisibility(View.GONE);
                    user_two_card_three.setVisibility(View.GONE);
                }
                if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                    user_two_card_status.setVisibility(View.VISIBLE);
                    user_two_card_status.setText(obj.getString("cardStatus"));
                }else{
                    user_two_card_status.setVisibility(View.GONE);
                }
            }else{
                user_two_name.setText("No User");
                user_two_status.setText("");
                user_two_card_status.setText("");
                user_two_card_status.setVisibility(View.GONE);
                user_two_card_one.setVisibility(View.GONE);
                user_two_card_two.setVisibility(View.GONE);
                user_two_card_three.setVisibility(View.GONE);
                user_two_image.setImageResource(R.mipmap.user_icon);
            }
            if(tableList.get(2)!=null && !tableList.get(2).toString().equals("null")){
                JSONObject obj=new JSONObject(tableList.get(2).toString());
                if(obj.has("name")){
                    user_three_name.setText(obj.getString("name"));
                }
                if(obj.has("status")){
                    user_three_status.setText(obj.getString("status"));
                }else{
                    user_three_status.setText("");
                }
                if(obj.has("profileImage")){
                    Picasso.with(TableActivity.this).load(Constants.MainURL+obj.getString("profileImage")).resize(80,80).placeholder(R.mipmap.user_icon).into(user_three_image);
                }
                if(obj.has("cards") && obj.getJSONArray("cards").length()>0){

                    if(obj.has("isShowCard") && obj.getBoolean("isShowCard")){
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_three_card_one.setVisibility(View.VISIBLE);
                        setCardImage(cardOne.getString("id"),user_three_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_three_card_two.setVisibility(View.VISIBLE);
                        setCardImage(cardTwo.getString("id"),user_three_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_three_card_three.setVisibility(View.VISIBLE);
                        setCardImage(cardThree.getString("id"),user_three_card_three);
                    }else{
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_three_card_one.setVisibility(View.VISIBLE);
                        setCardImage("",user_three_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_three_card_two.setVisibility(View.VISIBLE);
                        setCardImage("",user_three_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_three_card_three.setVisibility(View.VISIBLE);
                        setCardImage("",user_three_card_three);
                    }
                }else{
                    user_three_card_one.setVisibility(View.GONE);
                    user_three_card_two.setVisibility(View.GONE);
                    user_three_card_three.setVisibility(View.GONE);
                }
                if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                    user_three_card_status.setVisibility(View.VISIBLE);
                    user_three_card_status.setText(obj.getString("cardStatus"));
                }else{
                    user_three_card_status.setVisibility(View.GONE);
                }
            }else{
                user_three_name.setText("No User");
                user_three_status.setText("");
                user_three_card_status.setText("");
                user_three_card_status.setVisibility(View.GONE);
                user_three_card_one.setVisibility(View.GONE);
                user_three_card_two.setVisibility(View.GONE);
                user_three_card_three.setVisibility(View.GONE);
                user_three_image.setImageResource(R.mipmap.user_icon);
            }
            if(tableList.get(3)!=null && !tableList.get(3).toString().equals("null")){
                JSONObject obj=new JSONObject(tableList.get(3).toString());
                if(obj.has("name")){
                    user_four_name.setText(obj.getString("name"));
                }else{
                    user_four_name.setText("");
                }
                if(obj.has("status")){
                    user_four_status.setText(obj.getString("status"));
                }
                if(obj.has("profileImage")){
                    Picasso.with(TableActivity.this).load(Constants.MainURL+obj.getString("profileImage")).resize(80,80).placeholder(R.mipmap.user_icon).into(user_four_image);
                }
                if(obj.has("cards") && obj.getJSONArray("cards").length()>0){

                    if(obj.has("isShowCard") && obj.getBoolean("isShowCard")) {
                        JSONArray cardArray=obj.getJSONArray("cards");
                        JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                        user_four_card_one.setVisibility(View.VISIBLE);
                        setCardImage(cardOne.getString("id"),user_four_card_one);
                        JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                        user_four_card_two.setVisibility(View.VISIBLE);
                        setCardImage(cardTwo.getString("id"),user_four_card_two);
                        JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                        user_four_card_three.setVisibility(View.VISIBLE);
                        setCardImage(cardThree.getString("id"),user_four_card_three);
                    }else {
                        JSONArray cardArray = obj.getJSONArray("cards");
                        JSONObject cardOne = new JSONObject(cardArray.get(0).toString());
                        user_four_card_one.setVisibility(View.VISIBLE);
                        setCardImage("", user_four_card_one);
                        JSONObject cardTwo = new JSONObject(cardArray.get(1).toString());
                        user_four_card_two.setVisibility(View.VISIBLE);
                        setCardImage("", user_four_card_two);
                        JSONObject cardThree = new JSONObject(cardArray.get(2).toString());
                        user_four_card_three.setVisibility(View.VISIBLE);
                        setCardImage("", user_four_card_three);
                    }
                }else{
                    user_four_card_one.setVisibility(View.GONE);
                    user_four_card_two.setVisibility(View.GONE);
                    user_four_card_three.setVisibility(View.GONE);
                }
                if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                    user_four_card_status.setVisibility(View.VISIBLE);
                    user_four_card_status.setText(obj.getString("cardStatus"));
                }else{
                    user_four_card_status.setVisibility(View.GONE);
                }
            }else{
                user_four_name.setText("No User");
                user_four_status.setText("");
                user_four_card_status.setText("");
                user_four_card_status.setVisibility(View.GONE);
                user_four_card_one.setVisibility(View.GONE);
                user_four_card_two.setVisibility(View.GONE);
                user_four_card_three.setVisibility(View.GONE);
                user_four_image.setImageResource(R.mipmap.user_icon);
            }
            if(tableList.get(4)!=null && !tableList.get(4).toString().equals("null")){
                JSONObject obj=new JSONObject(tableList.get(4).toString());
                if(obj.has("name")){
                    user_five_name.setText(obj.getString("name"));
                }
                if(obj.has("status")){
                    user_five_status.setText(obj.getString("status"));
                }
                if(obj.has("profileImage")){
                    Picasso.with(TableActivity.this).load(Constants.MainURL+obj.getString("profileImage")).resize(80,80).placeholder(R.mipmap.user_icon).into(user_five_image);
                }
                if(obj.has("points")){
                    myPoints.setText("₹"+obj.getInt("points"));
                }
                if(obj.has("cards") && obj.getJSONArray("cards").length()>0){
                    tip_button.setVisibility(View.VISIBLE);
                    if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                        user_five_card_status.setVisibility(View.VISIBLE);
                        //user_five_card_status.setText(obj.getString("cardStatus"));
                        if(obj.getString("cardStatus").equalsIgnoreCase("SEEN")){
                            JSONArray cardArray=obj.getJSONArray("cards");
                            JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                            user_five_card_one.setVisibility(View.VISIBLE);
                            setCardImage(cardOne.getString("id"),user_five_card_one);
                            JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                            user_five_card_two.setVisibility(View.VISIBLE);
                            setCardImage(cardTwo.getString("id"),user_five_card_two);
                            JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                            user_five_card_three.setVisibility(View.VISIBLE);
                            setCardImage(cardThree.getString("id"),user_five_card_three);
                            hasSeen=true;
                        }else{
                            JSONArray cardArray=obj.getJSONArray("cards");
                            JSONObject cardOne=new JSONObject(cardArray.get(0).toString());
                            user_five_card_one.setVisibility(View.VISIBLE);
                            setCardImage("",user_five_card_one);
                            JSONObject cardTwo=new JSONObject(cardArray.get(1).toString());
                            user_five_card_two.setVisibility(View.VISIBLE);
                            setCardImage("",user_five_card_two);
                            JSONObject cardThree=new JSONObject(cardArray.get(2).toString());
                            user_five_card_three.setVisibility(View.VISIBLE);
                            setCardImage("",user_five_card_three);
                            if(obj.has("isShowCard") && obj.getBoolean("isShowCard")) {
                                JSONArray cardArray2=obj.getJSONArray("cards");
                                JSONObject cardOne2=new JSONObject(cardArray2.get(0).toString());
                                user_five_card_one.setVisibility(View.VISIBLE);
                                setCardImage(cardOne2.getString("id"),user_five_card_one);
                                JSONObject cardTwo2=new JSONObject(cardArray2.get(1).toString());
                                user_five_card_two.setVisibility(View.VISIBLE);
                                setCardImage(cardTwo2.getString("id"),user_five_card_two);
                                JSONObject cardThree2=new JSONObject(cardArray2.get(2).toString());
                                user_five_card_three.setVisibility(View.VISIBLE);
                                setCardImage(cardThree2.getString("id"),user_five_card_three);
                            }else{
                                JSONArray cardArray3=obj.getJSONArray("cards");
                                JSONObject cardOne3=new JSONObject(cardArray3.get(0).toString());
                                user_five_card_one.setVisibility(View.VISIBLE);
                                setCardImage("",user_five_card_one);
                                JSONObject cardTwo3=new JSONObject(cardArray3.get(1).toString());
                                user_five_card_two.setVisibility(View.VISIBLE);
                                setCardImage("",user_five_card_two);
                                JSONObject cardThree3=new JSONObject(cardArray3.get(2).toString());
                                user_five_card_three.setVisibility(View.VISIBLE);
                                setCardImage("",user_five_card_three);
                            }
                            hasSeen=false;
                        }

                        segmentFour.setVisibility(View.VISIBLE);
                        segmentFive.setVisibility(View.VISIBLE);
                        myPoints.setVisibility(View.VISIBLE);

                        //Log.d("AJ","VISIBle: "+user_five_progress.getVisibility());
                        //Log.d("AJ","VISIBle result: "+View.VISIBLE);

                        if(user_five_progress.getVisibility()==View.VISIBLE){
                            pack_button.setVisibility(View.VISIBLE);
                            addcoin.setVisibility(View.VISIBLE);
                            minuscoin.setVisibility(View.VISIBLE);
                            challLayout.setVisibility(View.VISIBLE);
                            if(obj.has("players") && obj.getInt("players")==2){
                                side_show.setVisibility(View.VISIBLE);
                                isShowTobeSeen=true;
                            }else{
                                side_show.setVisibility(View.GONE);
                                isShowTobeSeen=false;
                            }
                        }else{
                            pack_button.setVisibility(View.GONE);
                            addcoin.setVisibility(View.GONE);
                            minuscoin.setVisibility(View.GONE);
                            challLayout.setVisibility(View.GONE);
                            side_show.setVisibility(View.GONE);
                        }
                        if(obj.has("players") && obj.getInt("players")==2){
                            isShowTobeSeen=true;
                        }else{
                            isShowTobeSeen=false;
                        }
                        if(obj.has("minBetCost")){
                            currentBet.setVisibility(View.VISIBLE);
                            chalCost=obj.getInt("minBetCost");
                            currentBet.setText("Current Bet: ₹"+obj.getInt("minBetCost"));
                            if(hasSeen){
                                int costOfSeen=chalCost+chalCost;
                                challText.setText("CHALL \n ₹ "+costOfSeen);
                            }else {
                                challText.setText("BLIND \n ₹ "+chalCost);
                            }
                        }else{
                            currentBet.setVisibility(View.GONE);
                        }
                        if(obj.has("maxTableCost")){
                            maxCost.setVisibility(View.VISIBLE);
                            maxCost.setText("MaxCost: ₹"+obj.getInt("maxTableCost"));
                        }else{
                            maxCost.setVisibility(View.GONE);
                        }
                        if(obj.has("currentTableCost")){
                            currentCollection.setVisibility(View.VISIBLE);
                            currentCollection.setText("Collection: ₹"+obj.getInt("currentTableCost"));
                        }else{
                            currentCollection.setVisibility(View.GONE);
                        }
                    }else{
                        user_five_card_status.setVisibility(View.GONE);
                        segmentFour.setVisibility(View.GONE);
                        segmentFive.setVisibility(View.GONE);
                        console.setText("GAME WILL START");
                    }
                }else{
                    user_five_card_one.setVisibility(View.GONE);
                    user_five_card_two.setVisibility(View.GONE);
                    user_five_card_three.setVisibility(View.GONE);
                    tip_button.setVisibility(View.GONE);
                }
                if(obj.has("cardStatus") && !obj.getString("cardStatus").equalsIgnoreCase("null")){
                    user_five_card_status.setVisibility(View.VISIBLE);
                    if(obj.getString("cardStatus").equalsIgnoreCase("PACKED")){
                        user_five_card_status.setText(obj.getString("cardStatus"));
                    }else{
                        user_five_card_status.setText("SEE");
                    }
                }else{
                    user_five_card_status.setVisibility(View.GONE);
                }
                if(hasSeen){
                    int hasSeenCost=chalCost+chalCost;
                    challText.setText("CHALL \n ₹ "+hasSeenCost);
                }else{
                    challText.setText("BLIND \n ₹ "+chalCost);
                }
            }else{

            }

        }catch (JSONException e){
            e.printStackTrace();
        }
    }

    public void setCardImage(String cardId, ImageView image) {
        if (cardId.equalsIgnoreCase("C_8")) {
            image.setImageResource(R.drawable.club_eight);
        } else if (cardId.equalsIgnoreCase("C_3")) {
            image.setImageResource(R.drawable.club_three);
        } else if (cardId.equalsIgnoreCase("C_2")) {
            image.setImageResource(R.drawable.club_two);
        } else if (cardId.equalsIgnoreCase("C_A")) {
            image.setImageResource(R.drawable.clube_a);
        }else if (cardId.equalsIgnoreCase("C_5")) {
            image.setImageResource(R.drawable.club_five);
        } else if (cardId.equalsIgnoreCase("C_4")) {
            image.setImageResource(R.drawable.club_four);
        } else if (cardId.equalsIgnoreCase("C_J")) {
            image.setImageResource(R.drawable.club_j);
        } else if (cardId.equalsIgnoreCase("C_K")) {
            image.setImageResource(R.drawable.club_k);
        } else if (cardId.equalsIgnoreCase("C_9")) {
            image.setImageResource(R.drawable.club_nine);
        } else if (cardId.equalsIgnoreCase("C_Q")) {
            image.setImageResource(R.drawable.club_q);
        } else if (cardId.equalsIgnoreCase("C_7")) {
            image.setImageResource(R.drawable.club_seven);
        } else if (cardId.equalsIgnoreCase("C_6")) {
            image.setImageResource(R.drawable.club_six);
        } else if (cardId.equalsIgnoreCase("C_10")) {
            image.setImageResource(R.drawable.club_ten);
        } else if (cardId.equalsIgnoreCase("D_A")) {
            image.setImageResource(R.drawable.d_a);
        } else if (cardId.equalsIgnoreCase("D_8")) {
            image.setImageResource(R.drawable.d_eight);
        } else if (cardId.equalsIgnoreCase("D_5")) {
            image.setImageResource(R.drawable.d_five);
        } else if (cardId.equalsIgnoreCase("D_4")) {
            image.setImageResource(R.drawable.d_four);
        } else if (cardId.equalsIgnoreCase("D_J")) {
            image.setImageResource(R.drawable.d_j);
        } else if (cardId.equalsIgnoreCase("D_K")) {
            image.setImageResource(R.drawable.d_k);
        } else if (cardId.equalsIgnoreCase("D_9")) {
            image.setImageResource(R.drawable.d_nine);
        } else if (cardId.equalsIgnoreCase("D_Q")) {
            image.setImageResource(R.drawable.d_q);
        } else if (cardId.equalsIgnoreCase("D_7")) {
            image.setImageResource(R.drawable.d_seven);
        } else if (cardId.equalsIgnoreCase("D_6")) {
            image.setImageResource(R.drawable.d_six);
        } else if (cardId.equalsIgnoreCase("D_10")) {
            image.setImageResource(R.drawable.d_ten);
        } else if (cardId.equalsIgnoreCase("D_3")) {
            image.setImageResource(R.drawable.d_three);
        } else if (cardId.equalsIgnoreCase("D_2")) {
            image.setImageResource(R.drawable.d_two);
        } else if (cardId.equalsIgnoreCase("H_A")) {
            image.setImageResource(R.drawable.h_a);
        } else if (cardId.equalsIgnoreCase("H_8")) {
            image.setImageResource(R.drawable.h_eight);
        } else if (cardId.equalsIgnoreCase("H_5")) {
            image.setImageResource(R.drawable.h_five);
        } else if (cardId.equalsIgnoreCase("H_4")) {
            image.setImageResource(R.drawable.h_four);
        } else if (cardId.equalsIgnoreCase("H_J")) {
            image.setImageResource(R.drawable.h_j);
        } else if (cardId.equalsIgnoreCase("H_K")) {
            image.setImageResource(R.drawable.h_k);
        } else if (cardId.equalsIgnoreCase("H_9")) {
            image.setImageResource(R.drawable.h_nine);
        } else if (cardId.equalsIgnoreCase("H_Q")) {
            image.setImageResource(R.drawable.h_q);
        } else if (cardId.equalsIgnoreCase("H_7")) {
            image.setImageResource(R.drawable.h_seven);
        } else if (cardId.equalsIgnoreCase("H_6")) {
            image.setImageResource(R.drawable.h_six);
        } else if (cardId.equalsIgnoreCase("H_10")) {
            image.setImageResource(R.drawable.h_ten);
        } else if (cardId.equalsIgnoreCase("H_3")) {
            image.setImageResource(R.drawable.h_three);
        } else if (cardId.equalsIgnoreCase("H_2")) {
            image.setImageResource(R.drawable.h_two);
        } else if (cardId.equalsIgnoreCase("S_A")) {
            image.setImageResource(R.drawable.s_a);
        } else if (cardId.equalsIgnoreCase("S_8")) {
            image.setImageResource(R.drawable.s_eight);
        } else if (cardId.equalsIgnoreCase("S_5")) {
            image.setImageResource(R.drawable.s_five);
        } else if (cardId.equalsIgnoreCase("S_4")) {
            image.setImageResource(R.drawable.s_four);
        } else if (cardId.equalsIgnoreCase("S_J")) {
            image.setImageResource(R.drawable.s_j);
        } else if (cardId.equalsIgnoreCase("S_K")) {
            image.setImageResource(R.drawable.s_k);
        } else if (cardId.equalsIgnoreCase("S_9")) {
            image.setImageResource(R.drawable.s_nine);
        } else if (cardId.equalsIgnoreCase("S_Q")) {
            image.setImageResource(R.drawable.s_q);
        } else if (cardId.equalsIgnoreCase("S_7")) {
            image.setImageResource(R.drawable.s_seven);
        } else if (cardId.equalsIgnoreCase("S_6")) {
            image.setImageResource(R.drawable.s_six);
        } else if (cardId.equalsIgnoreCase("S_10")) {
            image.setImageResource(R.drawable.s_ten);
        } else if (cardId.equalsIgnoreCase("S_3")) {
            image.setImageResource(R.drawable.s_three);
        } else if (cardId.equalsIgnoreCase("S_2")) {
            image.setImageResource(R.drawable.s_two);
        } else {
            image.setImageResource(R.drawable.joker);
        }
    }

        @Override
    public void onBackPressed() {
            super.onBackPressed();
        /*Intent i=new Intent();
        i.putExtra(Constants.USERPOJO,new Gson().toJson(userPojo));
        setResult(Activity.RESULT_CANCELED);*/
        finish();

    }

    @Override
    protected void onDestroy() {
        ////Log.d("AJ","OnDestroy");
        this.mWakeLock.release();
        try {
            LocalBroadcastManager.getInstance(this).unregisterReceiver(receiver);
        }catch (Exception e){
            e.printStackTrace();
        }
        try{
            timer.cancel();
            mSocket.disconnect();
            mSocket=null;
        }catch (Exception e){
            e.printStackTrace();
        }
        super.onDestroy();
    }
}
