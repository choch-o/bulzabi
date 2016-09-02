package com.catchingfire.bulzabi;

import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.RelativeLayout;

import com.skp.Tmap.TMapView;

/**
 * Created by jeongsubin on 16. 9. 3..
 */
public class MapActivity extends AppCompatActivity {

    Location location; // Location
    double latitude; // Latitude
    double longitude; // Longitude

    // Declaring a Location Manager
    protected LocationManager locationManager;

    private RelativeLayout mMainRelativeLayout = null;
    private TMapView mMapView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tmap);

        mMainRelativeLayout = (RelativeLayout) findViewById(R.id.mainRelativeLayout);
        mMapView = new TMapView(this); // TmapView생성
        mMainRelativeLayout.addView(mMapView);
        mMapView.setSKPMapApiKey("8881c9b4-0385-3156-aaed-f2040d0c0887"); //SDK 인증키입력

        latitude = location.getLatitude();
        longitude = location.getLongitude();

        try {
            locationManager = (LocationManager) this
                    .getSystemService(LOCATION_SERVICE);

            if (locationManager != null) {

                location = locationManager
                        .getLastKnownLocation(LocationManager.NETWORK_PROVIDER);

            }
        } catch(SecurityException e) {
            e.printStackTrace();
        }

        mMapView.setLocationPoint(longitude, latitude);

        /*

        WebView webView = (WebView)findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setWebViewClient(new WebViewClient());


        webView.loadUrl("https://m.map.naver.com/route.nhn?menu=route&sy=" +
                longitude +"&sx="+latitude+"&esy=&esx=&sname=코딩=&ey=37.4979502&ex=127.0276368&eey=&eex=&ename=안재영=&pathType=0&dtPathType=&idx=#/drive/detail/코딩해라,126.8966655,37.4830969,,,false,/안재영,127.0276368,37.4979502,,,false,/2/0/map/1");
    */
    }


}
