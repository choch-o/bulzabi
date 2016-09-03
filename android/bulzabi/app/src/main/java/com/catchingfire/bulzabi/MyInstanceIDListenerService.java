package com.catchingfire.bulzabi;

import android.content.Context;
import android.os.Handler;
import android.telephony.TelephonyManager;
import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

/**
 * Created by harrykim on 2016. 9. 3..
 */
public class MyInstanceIDListenerService extends FirebaseInstanceIdService {
    @Override
    public void onTokenRefresh() {
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        TelephonyManager t = (TelephonyManager)getApplicationContext().getSystemService(Context.TELEPHONY_SERVICE);
        String mPhoneNumber = t.getLine1Number();
        // 이 token을 서버에 전달 한다.
        new UrlThread(mPhoneNumber,refreshedToken);
    }


    public class UrlThread extends Thread {
        private Thread connectThread;
        private String url = "http://192.168.1.191:3000/refresh";
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
