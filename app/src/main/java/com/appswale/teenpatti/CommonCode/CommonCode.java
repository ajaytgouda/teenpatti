package com.appswale.teenpatti.CommonCode;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.text.format.DateUtils;
import android.util.Log;
import android.view.Window;


import com.appswale.teenpatti.R;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static android.text.format.DateUtils.getRelativeTimeSpanString;


/**
 * Created by ayg7 on 08-12-2015.
 */
public class CommonCode {
    public static Dialog pDialog;



    public static boolean isEmailValid(String email) {
        boolean isValid = false;

        String expression = "^[\\w\\.-]+@([\\w\\-]+\\.)+[A-Z]{2,4}$";
        CharSequence inputStr = email;

        Pattern pattern = Pattern.compile(expression, Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(inputStr);
        if (matcher.matches()) {
            isValid = true;
        }
        return isValid;
    }

    public static String getAndroidVersion() {
        String release = Build.VERSION.RELEASE;
        int sdkVersion = Build.VERSION.SDK_INT;
        return "" + sdkVersion;
    }

    public static String getMD5(String input) {
        byte[] source;
        try {
            //Get byte according by specified coding.
            source = input.getBytes("UTF-8");
        } catch (UnsupportedEncodingException e) {
            source = input.getBytes();
        }
        String result = null;
        char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(source);
            //The result should be one 128 integer
            byte temp[] = md.digest();
            char str[] = new char[16 * 2];
            int k = 0;
            for (int i = 0; i < 16; i++) {
                byte byte0 = temp[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            result = new String(str);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getRoundFigureRating(String rate) {

        try {
            Double temp = Double.parseDouble(rate);
            temp = temp * 100;
            Long newtemp = Math.round(temp);
            System.out.println("LoudST" + "Rate: " + Long.toString(newtemp / 100));
            return Long.toString(newtemp / 100);
        } catch (Exception e) {
            return "0.0";
        }


    }

    public static Date parseStringToDate(String date, String pattern) {
        Date date2 = null;
        try {
            date2 = new SimpleDateFormat(pattern).parse(date);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return date2;
    }

    public static String parseDateToString(Date date, String pattern) {
        String dateString = null;
        if (date != null) {
            dateString = new SimpleDateFormat(pattern).format(date);
        }
        return dateString;
    }

    public static boolean isNull(Object object) {
        boolean isValid = false;
        try {
            if (object == null) {
                isValid = true;
            } else {
                if (object.equals("")) {
                    isValid = true;
                }
            }
        } catch (Exception e) {
            System.err.println("Error in isNull:" + e.getMessage());
        }
        return isValid;
    }

    public static void logWritter(String text) {
        Log.d("LoudST", text);
    }

    public static String dateToStatement(String dateFrom, String dateTo, String pattern) {

        String dateStart = dateFrom;
        String dateStop = dateTo;

        //HH converts hour in 24 hours format (0-23), day calculation
        SimpleDateFormat format = new SimpleDateFormat(pattern);

        Date d1 = null;
        Date d2 = null;

        try {
            d1 = format.parse(dateStart);
            d2 = format.parse(dateStop);

            //in milliseconds
            long diff = d2.getTime() - d1.getTime();

            //long diffSeconds = diff / 1000 % 60;
            long diffMinutes = diff / (60 * 1000) % 60;
            long diffHours = diff / (60 * 60 * 1000) % 24;
            long diffDays = diff / (24 * 60 * 60 * 1000);

            System.out.print(diffDays + " days, ");
            System.out.print(diffHours + " hours, ");
            System.out.print(diffMinutes + " minutes, ");
            //System.out.print(diffSeconds + " seconds.");


            //return diffDays+" Days,"+diffHours+" Hours,"+diffMinutes+" Mins ago";
            if (diffDays >= 365) {
                return "Posted a Year ago";
            } else if (diffDays < 365) {
                if (diffDays == 0) {
                    if (diffHours != 0) {
                        return "Posted " + diffHours + " hour ago";
                    } else {
                        if (diffMinutes != 0) {
                            return "Posted " + diffMinutes + " mins ago";
                        } else {
                            return "Posted now";
                        }

                    }

                } else if (diffDays == 1) {
                    return "Posted " + diffDays + " Day ago";
                } else {
                    return "Posted " + diffDays + " Days ago";
                }
            } else {
                return "Posted a " + diffDays + " Days ago";
            }


        } catch (Exception e) {
            e.printStackTrace();
        }


        return " ";
    }

    public static String dateConvertion(String date) {

        try {
            SimpleDateFormat sourceFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            sourceFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
            Date parsed = sourceFormat.parse(date);
            TimeZone tz = TimeZone.getTimeZone("Asia/Calcutta");
            SimpleDateFormat destFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            destFormat.setTimeZone(tz);

            String result = destFormat.format(parsed);
            return result;
        } catch (ParseException e) {
            e.printStackTrace();
            return date;
        }


    }

    static final String AB = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static String randomString(int len, SecureRandom rnd) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        return sb.toString();
    }

    static final String ABC = "0123456789987654321";

    public static String randomInteger(int len, SecureRandom rnd) {
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++)
            sb.append(ABC.charAt(rnd.nextInt(ABC.length())));
        return sb.toString();
    }

    public static int closestInteger(int a, int b) {
        int c1 = a - (a % b);
        int c2 = (a + b) - (a % b);
        if (a - c1 > c2 - a) {
            return c2;
        } else {
            return c1;
        }
    }

//    public static void ShowDialog(Context context) {
//        pDialog = new Dialog(context);
//        pDialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
//        pDialog.setContentView(R.layout.prgressbar_layout);
//        pDialog.setCancelable(true);
//        pDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
//        pDialog.show();
//    }
//
//    public static void HideDialog() {
//        pDialog.dismiss();
//    }
//
//    public static LoudstApi getRetrofitInterface_NoHeader() {
//
//
//        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
//        // add your other interceptors …
//
//        // add logging as last interceptor
//        httpClient.addInterceptor(getHttpLoggingInterceptor());  // <-- this is the important line!
//
//        Retrofit retrofit = new Retrofit.Builder()
//                //.baseUrl("http://192.168.1.124:3000/api/v1/")
//                .baseUrl(Constants.MainURL)
//                .addConverterFactory(GsonConverterFactory.create())
//                .client(httpClient.build())
//                .build();
//
//        // prepare call in Retrofit 2.0
//        LoudstApi loudstAPI = retrofit.create(LoudstApi.class);
//
//        return loudstAPI;
//    }
//
//    public static LoudstApi getRetrofitInterface_Header(Context context) {
//        final LoginResponse authToken = getAuthToken(context);
//
//
//        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
//        httpClient.addInterceptor(new Interceptor() {
//            @Override
//            public Response intercept(Chain chain) throws IOException {
//                Request original = chain.request();
//
//
//                Request request = original.newBuilder()
//                        .addHeader("Content-Type:", "application/json")
//                        .method(original.method(), original.body())
//                        .build();
//
//                return chain.proceed(request);
//
//            }
//        });
//
//        OkHttpClient client = httpClient
//                .connectTimeout(5, TimeUnit.MINUTES)
//                .readTimeout(5, TimeUnit.MINUTES)
//                .addInterceptor(getHttpLoggingInterceptor())
//                .build();
//
//       /* GsonBuilder gsonBuilder = new GsonBuilder();
//        gsonBuilder.registerTypeAdapter(Long.class, new LongConverter());
//        Gson mgson = gsonBuilder.create();
//*/
//        Retrofit retrofit = new Retrofit.Builder()
//                //.baseUrl("http://192.168.1.124:3000/api/v1/")
//                .baseUrl(AppConstant.MAIN_URL)
//                //.addConverterFactory(GsonConverterFactory.create(mgson))
//                .addConverterFactory(GsonConverterFactory.create())
//                .client(client)
//                .build();
//
//        LoudstApi loudstAPI = retrofit.create(LoudstApi.class);
//
//        return loudstAPI;
//    }
//
//    public static LoudstApi getRetrofitInterface_Header_Image(Context context) {
//        final LoginResponse authToken = getAuthToken(context);
//
//
//        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
//        httpClient.addInterceptor(new Interceptor() {
//            @Override
//            public Response intercept(Chain chain) throws IOException {
//                Request original = chain.request();
//
//
//                Request request = original.newBuilder()
//                        .method(original.method(), original.body())
//                        .build();
//
//                return chain.proceed(request);
//
//            }
//        });
//
//        OkHttpClient client = httpClient
//                .connectTimeout(5, TimeUnit.MINUTES)
//                .readTimeout(5, TimeUnit.MINUTES)
//                .addInterceptor(getHttpLoggingInterceptor())
//                .build();
//
//       /* GsonBuilder gsonBuilder = new GsonBuilder();
//        gsonBuilder.registerTypeAdapter(Long.class, new LongConverter());
//        Gson mgson = gsonBuilder.create();
//*/
//        Retrofit retrofit = new Retrofit.Builder()
//                //.baseUrl("http://192.168.1.124:3000/api/v1/")
//                .baseUrl(Constants.MainURL)
//                //.addConverterFactory(GsonConverterFactory.create(mgson))
//                .addConverterFactory(GsonConverterFactory.create())
//                .client(client)
//                .build();
//
//        LoudstApi loudstAPI = retrofit.create(LoudstApi.class);
//
//        return loudstAPI;
//    }
//
//
//    public static HttpLoggingInterceptor getHttpLoggingInterceptor() {
//        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
//        // set your desired log level
//        logging.setLevel(HttpLoggingInterceptor.Level.BODY);
//        return logging;
//    }
//
//    public static LoginResponse getAuthToken(Context context) {
//        Gson gson;
//        SessionData sessionData;
//        final LoginResponse userPojo;
//        gson = new Gson();
//        sessionData = new SessionData(context.getApplicationContext());
//
//        userPojo = gson.fromJson(sessionData.getObjectAsString(AppConstant.USERPOJO), LoginResponse.class);
//        return userPojo;
//    }

    public static void showNetworkErrorDialog(Context contex) {
        final AlertDialog alertDialog = new AlertDialog.Builder(contex).create();
        alertDialog.setTitle("Could not connect to the server.");
        alertDialog.setMessage("The Internet connection appears to be offline.");
        alertDialog.setCancelable(false);
        alertDialog.setButton(DialogInterface.BUTTON_NEUTRAL, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });
        alertDialog.show();
    }

    public static void showServiceErrorDialog(String message, Context context) {
        final AlertDialog alertDialog = new AlertDialog.Builder(context).create();
        alertDialog.setMessage(message);
        alertDialog.setCancelable(false);
        alertDialog.setButton(DialogInterface.BUTTON_NEUTRAL, "OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                alertDialog.dismiss();
            }
        });
        alertDialog.show();
    }


    public static String convertTimeZone(String date, String pattern) {

        Date date2 = null;
        long epoch = 0;
        String receiveDate=null;
        String timePassedString=null;
        try {
            Log.d("AJ","Date:"+date.substring(0,date.length()-1)+date.substring(date.length()-1,date.length()).replace("Z","-0000"));
            date2 = new SimpleDateFormat(pattern).parse(date.substring(0,date.length()-1)+date.substring(date.length()-1,date.length()).replace("Z","-0000"));
            SimpleDateFormat sdf=new SimpleDateFormat();
            epoch = date2.getTime();
            sdf.setTimeZone(TimeZone.getDefault());
             timePassedString = getRelativeTimeSpanString (epoch, System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS).toString();
            receiveDate=sdf.format(date2);
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return timePassedString;
        /*if(receiveDate!=null){
            return receiveDate;
        }else{
            return date;
        }*/
    }

//    public static void noAliasDialog(final SwitchButton isAlias, Context context)
//    {
//        android.support.v7.app.AlertDialog.Builder builder;
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//            builder = new android.support.v7.app.AlertDialog.Builder(context);
//        } else {
//            builder = new android.support.v7.app.AlertDialog.Builder(context);
//        }
//        builder.setTitle("ALIAS NOT FOUND")
//                .setMessage("Go to the profile settings page to add alias")
//                .setCancelable(false)
//                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
//                    public void onClick(DialogInterface dialog, int which) {
//                        isAlias.setChecked(false);
//                        dialog.dismiss();
//                    }
//                })
//
//
//                .show();
//    }


    public static void showLogIn(final Context context)
    {

    }


    public static void showAlaisTaken(Context context)
    {
        android.support.v7.app.AlertDialog.Builder builder;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            builder = new android.support.v7.app.AlertDialog.Builder(context);
        } else {
            builder = new android.support.v7.app.AlertDialog.Builder(context);
        }
        builder.setTitle("Alias name taken")
                .setMessage("This alias name is already in use")
                .setCancelable(false)
                .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {

                        dialog.dismiss();
                    }
                })


                .show();
    }


    public static long getDateInMillis(String srcDate) {
        SimpleDateFormat desiredFormat = new SimpleDateFormat(
                "d MMMM yyyy, hh:mm aa");

        long dateInMillis = 0;
        try {
            Date date = desiredFormat.parse(srcDate);
            dateInMillis = date.getTime();
            return dateInMillis;
        } catch (ParseException e) {
            //Log.d("Exception while parsing date. " + e.getMessage());
            e.printStackTrace();
        }

        return 0;
    }



    public static  String minuteAgoTime(String dateAgo)
    {
        SimpleDateFormat df = new SimpleDateFormat("MM-dd-yyyy HH:mm");
        Date date1 = null;long epoch = 0;
        
        try {
            date1 = df.parse(dateAgo);
            epoch = date1.getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        

        String timePassedString = getRelativeTimeSpanString (epoch, System.currentTimeMillis(), DateUtils.SECOND_IN_MILLIS).toString();
        return timePassedString;
    }
}
