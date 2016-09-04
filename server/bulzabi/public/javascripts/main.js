$('document').ready(function() {
  $('body').html(`
    <nav class="row nav-wrapper">
      <div class="col s2 brand-logo">
        <a href="#!" class="breadcrumb">Catching Fire</a>
        <a href="/" class="breadcrumb">Main page</a>
      </div>
    </nav>

    <div class="row valign-wrapper">
      <div class="col s10 input-field">
        <!--<textarea class="materialize-textarea" id="textAddress" placeholder="사고 현장 주소를 입력하세요" type="text" style="margin-top:10px;"></textarea>-->
        <input class="validate" type="text" id="textAddress" placeholder="사고 현장 주소를 입력하세요" type="text" style="margin-top:10px;"></input>
        <label for="textAddress">Address</label>
      </div>
      <div class="col s2 valign">
        <a class="wave-effect waves-light btn" id="submitBtn" onclick="onSubmit()">호출</a>
      </div>
    </div>

    <div class="row">
      <div id="div_mapholder" class="col s9 row">
        <section id="mapholder" class="col s12" style="height:65vh;"></section>
      </div>
      <div class="col s3 right center">
        <ul id="staggered-before">
          <li>
            <h5 class="center">의용 소방대원 목록</h5>
          </li>
          <li>
            <img src="images/profile1.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">박수영<br><br>010-1930-9284</h6>
          </li>
          <li>
            <img src="images/profile2.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">류호빈<br><br>010-9374-1342</h6>
          </li>
          <li>
            <img src="images/profile3.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">이재서<br><br>010-3827-3954</h6>
          </li>
          <li>
            <img src="images/profile4.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">안재영<br><br>010-1823-2039</h6>
          </li>
          <li>
            <img src="images/profile5.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">김형석<br><br>010-1040-9000</h6>
          </li>
          <li>
            <img src="images/profile6.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">정수빈<br><br>010-3990-2213</h6>
          </li>
          <li>
            <img src="images/profile7.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">조현성<br><br>010-9829-4909</h6>
          </li>
        </ul>

        <ul id="staggered-after" style="opacity:0;">
           <li>
            <h5 class="center">호출된 의용 소방대원 목록</h5>
          </li>
          <li>
            <img src="images/profile1.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">박수영<br><br>010-3998-1202</h6>
          </li>
         <li>
            <img src="images/profile3.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">이재서<br><br>010-9892-2314</h6>
          </li>
          <li>
            <img src="images/profile4.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">안재영<br><br>010-2139-19873/h6>
          </li>
          <li>
            <img src="images/profile7.jpeg" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">조현성<br><br>010-9810-1231</h6>
          </li>
      </ul>
      </div>
    </div>
  `)
;
  initMap(37.452490, 126.675695);
});

function onSubmit()
{
  console.log("submitBtn is clicked") ;
  Materialize.showStaggeredList('#staggered-after');
  $('#staggered-after').css('opacity', '1');
  $('#staggered-before').addClass('hide');
 
  var re = new RegExp("\.[0-9]{3}Z");
  var dateString = new Date(Date.now()).toISOString().replace(re, '').replace('T', ' ');
  var locationString = $('#textAddress').val();
  var p = codeAddressToLatlng(locationString);
  p.then(function(addressString) {
    $.ajax({
      type: 'GET',
      url: '/searching',
      data: {
        time: dateString,
        latlng: addressString,
        location: locationString
      },
      success: function(data) {
        console.log("main.js: return from server ");
      },
      error: function() {
        console.log("main.js: error from server");
      }
    });

    $('#div_mapholder').css('display', 'block');
    addressString = addressString.substring(1, addressString.length-1);
    var lat = parseFloat(addressString.split(",")[0]);
    var lng = parseFloat(addressString.split(",")[1]);
    initMap(lat, lng);
    addMarker([lat, lng], '', icon = 'mark');
    addMarker([lat+0.001, lng-0.003], '1');
    addMarker([lat+0.003, lng-0.01], '2');
    addMarker([lat+0.007, lng+0.005], '3');
    addMarker([lat-0.005, lng+0.01], '4');
    drawCircle([lat, lng], 1400);
    //addRoute([37.448418, 126.668882], [37.452387, 126.683409]);
    //addPolyLine([[37.448799, 126.668893], [37.448118, 126.679665], [37.451388, 126.679751], [37.451150, 126.683055], [37.452387, 126.683409]]);
  });

}

