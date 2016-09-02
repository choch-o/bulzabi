package com.catchingfire.bulzabi;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by jeongsubin on 16. 9. 3..
 */
public class MapActivity extends AppCompatActivity {
    double lat = 127.0276368;
    double lon = 37.4979502;
    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.map_activity);

        WebView webView = (WebView)findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setWebViewClient(new WebViewClient());


        /*webView.loadUrl("https://m.map.naver.com/route.nhn?menu=route&sy=" +
                lat +
                "&sx=" +
                lon +
                "&esy=&esx=&sname=" +
                "현재내위치" +
                "&sdid=&ey=" +
                "37.4979502" +
                "&ex=" +
                "127.0276368" +
                "&eey=&eex=&ename=" +
                "불난곳" +
                "&edid=&pathType=0&dtPathType=&idx=#/drive/detail/" +
                "현재내위치" +
                "," +
                lat +
                "," +
                lon +
                ",,,false,/" +
                "불난곳" +
                "," +
                "127.0276368" +
                "," +
                "37.4979502" +
                ",,,false,/2/0/map/1");*/
        webView.loadUrl("https://m.map.naver.com/route.nhn?menu=route&sy=37.4830969&sx=126.8966655&esy=&esx=&sname=코딩=&ey=37.4979502&ex=127.0276368&eey=&eex=&ename=안재영=&pathType=0&dtPathType=&idx=#/drive/detail/코딩해라,126.8966655,37.4830969,,,false,/안재영,127.0276368,37.4979502,,,false,/2/0/map/1");
    }

}
