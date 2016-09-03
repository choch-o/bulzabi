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
      <div class="col s3 right">
        <ul id="staggered-before">
          <li>
            <h5 class="center">의용 소방대원 목록</h5>
          </li>
          <li>
            <img src="images/profile1.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Gloria George<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile2.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Marco Warner<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile3.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Brad Alvarez<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile4.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Nellie Hamilton<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile5.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Gerald Lee<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile6.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Robin Miles<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile7.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Larry Chavez<br><br>010-1234-1234</h6>
          </li>
        </ul>

        <ul id="staggered-after" style="opacity:0;">
           <li>
            <h5 class="center">호출된 의용 소방대원 목록</h5>
          </li>
          <li>
            <img src="images/profile1.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Gloria George<br><br>010-1234-1234</h6>
          </li>
         <li>
            <img src="images/profile3.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Brad Alvarez<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile4.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Nellie Hamilton<br><br>010-1234-1234</h6>
          </li>
          <li>
            <img src="images/profile7.png" alt="" class="circle" style="width:80px; height:80px;">
            <h6 style="float:right;">Larry Chavez<br><br>010-1234-1234</h6>
          </li>
      </ul>
      </div>
    </div>
  `)
;
  initMap();
});

function onSubmit()
{
  initMap();
  setTimeout(function() {
    console.log("submitBtn is clicked") ;
    Materialize.showStaggeredList('#staggered-after');
    $('#staggered-after').css('opacity', '1');
    $('#staggered-before').addClass('hide');
  
    $('#div_mapholder').css('display', 'block');
    addMarker([37.452387, 126.683409], '', icon = 'mark');
    addMarker([37.453204, 126.678560], '1');
    addMarker([37.455470, 126.677165], '2');
    addMarker([37.453102, 126.690447], '3');
    addMarker([37.453818, 126.683009], '4');
    drawCircle([37.452387, 126.683409], 700);
    //addRoute([37.448418, 126.668882], [37.452387, 126.683409]);
    //addPolyLine([[37.448799, 126.668893], [37.448118, 126.679665], [37.451388, 126.679751], [37.451150, 126.683055], [37.452387, 126.683409]]);

    var re = new RegExp("\.[0-9]{3}Z");
    var dateString = new Date(Date.now()).toISOString().replace(re, '').replace('T', ' ');
    var addressString = codeAddressToLatlng($('#textAddress').val());
 
console.log("addressString: "+addressString);
 
    $.ajax({
      type: 'GET',
      url: '/searching',
      data: {
        time: dateString,
        latlng: addressString
      },
      success: function(data) {
        console.log("main.js: return from server ");
      },
      error: function() {
        console.log("main.js: error from server");
      }
    });
  }, 1000);
}

