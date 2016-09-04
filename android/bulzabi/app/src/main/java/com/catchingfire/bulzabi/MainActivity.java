package com.catchingfire.bulzabi;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.telephony.TelephonyManager;
import android.text.InputType;
import android.text.method.KeyListener;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.messaging.FirebaseMessaging;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {


    EditText profile_name;
    EditText profile_short_bio;
    EditText profile_job;
    EditText profile_loc1;
    EditText profile_loc2;
    EditText profile_loc3;
    EditText profile_rescue_count;
    ImageButton profile_edit_button;
    boolean edit_enable = false;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        FirebaseMessaging.getInstance().subscribeToTopic("notice");

        profile_name = (EditText)findViewById(R.id.user_profile_name);
        profile_short_bio = (EditText)findViewById(R.id.user_profile_short_bio);
        profile_job = (EditText) findViewById(R.id.profile_job_text);
        profile_loc1 = (EditText)findViewById(R.id.profile_region_text);
        profile_loc2 = (EditText)findViewById(R.id.profile_region_text1);
        profile_loc3 = (EditText)findViewById(R.id.profile_region_text2);
        profile_rescue_count = (EditText)findViewById(R.id.profile_rescue_count);
        profile_edit_button = (ImageButton)findViewById(R.id.profile_edit_button);

        setAllUneditable();

        profile_edit_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(edit_enable == false) {
                    edit_enable = true;
                    setAllEditable();
                } else {
                    edit_enable = false;
                    setAllUneditable();
                }
            }
        });

    }

    public void setAllUneditable() {
        setUneditable(profile_name);
        setUneditable(profile_short_bio);
        setUneditable(profile_job);
        setUneditable(profile_loc1);
        setUneditable(profile_loc2);
        setUneditable(profile_loc3);
        setUneditable(profile_rescue_count);
    }

    public void setAllEditable() {
        setEditable(profile_name);
        setEditable(profile_short_bio);
        setEditable(profile_job);
        setEditable(profile_loc1);
        setEditable(profile_loc2);
        setEditable(profile_loc3);
        setEditable(profile_rescue_count);
    }

    public void setUneditable(EditText et) {
        et.setTextIsSelectable(false);
        et.setFocusable(false);
        et.setInputType(InputType.TYPE_NULL);
        et.setClickable(false);
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(et.getWindowToken(),0);
    }

    public void setEditable(EditText et) {
        et.setTextIsSelectable(true);
        et.setFocusable(true);
        et.setClickable(true);
        et.setCursorVisible(true);
        et.setRawInputType(InputType.TYPE_CLASS_TEXT);
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.showSoftInput(et, InputMethodManager.SHOW_IMPLICIT);

    }

    public class UrlThread extends Thread {
        private Thread connectThread;
        private String url = "http://192.168.1.191:3001/refresh";
        private HttpURLConnection connection;
        private String phone;
        private String refreshedToken;

        public UrlThread(String phoneNumber, String token) {
            phone = phoneNumber;
            refreshedToken = token;
        }
        @Override
        public void run() {
            try {
                URL urlForm = new URL(url);
                HttpURLConnection connection = (HttpURLConnection)urlForm.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("PHONE-NUMBER",phone);
                connection.setRequestProperty("TOKEN",refreshedToken);
                int responseCode = connection.getResponseCode();
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
