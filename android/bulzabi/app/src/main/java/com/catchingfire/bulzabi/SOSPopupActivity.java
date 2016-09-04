package com.catchingfire.bulzabi;

import android.app.Activity;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.TextView;

/**
 * Created by harrykim on 2016. 9. 3..
 */
public class SOSPopupActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        final long time1 = System.currentTimeMillis ();
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
        layoutParams.flags = WindowManager.LayoutParams.FLAG_DIM_BEHIND;
        layoutParams.dimAmount = 0.7f;
        getWindow().setAttributes(layoutParams);
        setContentView(R.layout.activity_sos_popup);
        Button ok_button = (Button)findViewById(R.id.btn_ok);
        Button cancel_button = (Button)findViewById(R.id.btn_cancel);

        TextView location_text = (TextView)findViewById(R.id.tv_content);
        String lc_txt = "'" + getIntent().getExtras().getString("location") + "'"
                + " 긴급 상황 발생";
        location_text.setText(lc_txt);

        ok_button.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v){
                //Intent intent = new Intent(SOSPopupActivity.this, TmapActivity.class);
                Intent intent = new Intent(SOSPopupActivity.this, MapActivity.class);
                intent.putExtra("time", getIntent().getExtras().getString("time"));
                intent.putExtra("latlng", getIntent().getExtras().getString("latlng"));
                intent.putExtra("location", getIntent().getExtras().getString("location"));
                intent.putExtra("current_time", time1);
                startActivity(intent);
                if(Build.VERSION.SDK_INT >= 21) {
                    finishAndRemoveTask();
                }
            }
        });
        cancel_button.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v){
                if(Build.VERSION.SDK_INT >= 21) {
                    finishAndRemoveTask();
                }
            }
        });

    }

    @Override
    public void onDestroy()
    {
        super.onDestroy();
    }

}
