package com.catchingfire.bulzabi;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

/**
 * Created by harrykim on 2016. 9. 3..
 */
public class MyInstanceIDListenerService extends FirebaseInstanceIdService {
    @Override
    public void onTokenRefresh() {
        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        // 이 token을 서버에 전달 한다.
    }
}
