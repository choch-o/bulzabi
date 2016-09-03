package com.catchingfire.bulzabi;

import android.graphics.Color;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.RelativeLayout;

import com.skp.Tmap.TMapData;
import com.skp.Tmap.TMapPoint;
import com.skp.Tmap.TMapPolyLine;
import com.skp.Tmap.TMapView;

/**
 * Created by jeongsubin on 16. 9. 3..
 */
public class MapActivity extends AppCompatActivity {

    Location location; // Location
    double Latitude; // Latitude
    double Longitude; // Longitude

    // Declaring a Location Manager
    protected LocationManager locationManager;

    private RelativeLayout mMainRelativeLayout = null;
    private TMapView mMapView = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tmap);

        mMainRelativeLayout = (RelativeLayout) findViewById(R.id.mainRelativeLayout);


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

        Latitude = location.getLatitude();
        Longitude = location.getLongitude();

        LogManager.printLog("currentTMapPoint" + Latitude + " " + Longitude);

        mMapView = new TMapView(this); // TmapView생성
        mMapView.setLocationPoint(Longitude, Latitude);
        mMapView.setCenterPoint(Longitude, Latitude);



        mMainRelativeLayout.addView(mMapView);
        mMapView.setSKPMapApiKey("8881c9b4-0385-3156-aaed-f2040d0c0887"); //SDK 인증키입력


        //drawMapPath();
        drawPedestrianPath();

    }

    private void drawMapPath() {
        TMapPoint point1 = mMapView.getLocationPoint();
        TMapPoint point2 = randomTMapPoint();

        TMapData tmapdata = new TMapData();

        tmapdata.findPathData(point1, point2, new TMapData.FindPathDataListenerCallback() {

            @Override
            public void onFindPathData(TMapPolyLine polyLine) {
                mMapView.addTMapPath(polyLine);
            }
        });
    }

    private TMapPoint randomTMapPoint() {
        /*
        double latitude = ((double)Math.random() ) * (37.575113-37.483086) + 37.483086;
        double longitude = ((double)Math.random() ) * (127.027359-126.878357) + 126.878357;

        latitude = Math.min(37.575113, latitude);
        latitude = Math.max(37.483086, latitude);

        longitude = Math.min(127.027359, longitude);
        longitude = Math.max(126.878357, longitude);
        */

        double latitude = mMapView.getLocationPoint().getLatitude()-0.01;
        double longitude = mMapView.getLocationPoint().getLongitude()-0.01;


        LogManager.printLog("randomTMapPoint" + latitude + " " + longitude);

        TMapPoint point = new TMapPoint(latitude, longitude);

        return point;
    }

    public void drawPedestrianPath() {
        TMapPoint point1 = mMapView.getCenterPoint();
        TMapPoint point2 = randomTMapPoint();

        TMapData tmapdata = new TMapData();

        tmapdata.findPathDataWithType(TMapData.TMapPathType.PEDESTRIAN_PATH, point1, point2, new TMapData.FindPathDataListenerCallback() {
            @Override
            public void onFindPathData(TMapPolyLine polyLine) {
                polyLine.setLineColor(Color.BLUE);
                polyLine.setLineWidth(20);
                mMapView.addTMapPath(polyLine);
            }
        });
    }


}
