package com.catchingfire.bulzabi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;

/**
 * Created by harrykim on 2016. 9. 3..
 */
public class SOSPopupActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        WindowManager.LayoutParams layoutParams = new WindowManager.LayoutParams();
        layoutParams.flags = WindowManager.LayoutParams.FLAG_DIM_BEHIND;
        layoutParams.dimAmount = 0.7f;
        getWindow().setAttributes(layoutParams);
        setContentView(R.layout.activity_sos_popup);
        Button ok_button = (Button)findViewById(R.id.btn_ok);
        Button cancel_button = (Button)findViewById(R.id.btn_cancel);

        ok_button.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v){
                Intent intent = new Intent(SOSPopupActivity.this, AccidentActivity.class);
                startActivity(intent);
            }
        });
        cancel_button.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v){
                finish();
            }
        });

    }
}
