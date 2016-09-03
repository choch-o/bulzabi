$('document').ready(function() {
  $('body').html(`
    <nav class="row nav-wrapper">
      <div class="col s2 brand-logo">
        <a href="#!" class="breadcrumb">Catching Fire</a>
        <a href="index.html" class="breadcrumb">Main page</a>
      </div>
    </nav>

    <div class="row center valign-wrapper container">
      <div class="col s10 input-field">
        <textarea class="materialize-textarea" id="textAddress" placeholder="사고 현장 주소를 입력하세요" type="text" style="margin-top:10px;"></textarea>
        <label for="textAddress">Address</label>
      </div>
      <div class="col s2 valign">
        <a class="wave-effect waves-light btn" id="submitBtn" onclick="onSubmit()">호출</a>
      </div>
    </div>

    <div class="row">
      <div class="push-s1 col s8 row">
        <section id="mapholder" class="col s12" style="height:70vh;"></section>
      </div>
      <div class="push-s1 col s2 center">
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
  `);
});

function onSubmit()
{
  console.log("submitBtn is clicked") ;
  Materialize.showStaggeredList('#staggered-after');
  $('#staggered-before').css('display', 'none');
  $('#staggered-after').css('opacity', '1');

  initMap();
  addMarker([37.452387, 126.683409], '', icon = 'mark');
  addMarker([37.453204, 126.678560], '1');
  addMarker([37.455470, 126.677165], '2');
  addMarker([37.453102, 126.690447], '3');
  addMarker([37.453818, 126.683009], '4');
  drawCircle([37.452387, 126.683409], 700);
  //addRoute([37.448418, 126.668882], [37.452387, 126.683409]);
  //addPolyLine([[37.448799, 126.668893], [37.448118, 126.679665], [37.451388, 126.679751], [37.451150, 126.683055], [37.452387, 126.683409]]);

      var parameters = { search: "nonono" };

      $.ajax({
        type: 'GET',
        url: '/searching',
        data: parameters,
        success: function(data) {
          console.log("main.js: return from server");
        },
        error: function() {
          console.log("main.js: error from server");
        }
      });
};

