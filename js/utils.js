

String.prototype.trunc = String.prototype.trunc ||
    function(n){
        return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
};


// date utils

function getDayOfWeek(_date){
var d = new Date(_date);
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

return weekday[d.getDay()];
}


function getDate(dt, clock){

  var clock = clock || false;
	var date = new Date(dt)
	var day = date.getDate();
  var day_name = getDay(date);
	var monthIndex = date.getMonth();
	var month = monthNames[monthIndex];
	var hour = date.getHours();
	var min = date.getMinutes();
	if (hour > 23) hour -= 24;
	if (hour < 10) hour = "0" + hour;
	if (min < 10) min = "0" + min;
  if (clock) {
    if (hour > 12) {
      hour -= 12;
      return day_name + " " + day + " " + month + ", " + hour + ":" + min + "pm";
    } else {
      return day_name + " " + day + " " + month + ", " + hour + ":" + min + "am";
    }

  } else {
    return day + " " + month + ", " + hour + ":" + min
  }

}

function getDay(d){
  var weekday = [];
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  return weekday[d.getDay()];
}


function isDay(dt){

	var date = new Date(dt)
	var day = date.getDate();
	var hour = date.getHours();
  return (hour >= 5 && hour < 19);

}

var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

function getDayNumber(dt){
	var current_date = new Date(dt);
	return parseInt(current_date.getDay());
}

/////////////////////

function fromLatLngToPixel(position, gmap) {

  var scale = Math.pow(2, gmap.getZoom());
  var proj = gmap.getProjection();
  var bounds = gmap.getBounds();

  var nw = proj.fromLatLngToPoint(
    new google.maps.LatLng(
      bounds.getNorthEast().lat(),
      bounds.getSouthWest().lng()
    ));
  var point = proj.fromLatLngToPoint(position);

  return new google.maps.Point(
    Math.floor((point.x - nw.x) * scale),
    Math.floor((point.y - nw.y) * scale));
}

// text utilities

function addZero(d){
  if (d < 10) {
    return "0" + d;
  } else {
    return d;
  }
}


///// ARRAY


function shuffle(a, ammt) {
 if (ammt = undefined) ammt = a.length;
    var j, x, i;
    for (i = ammt; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}




//// CLASS HELPERS

function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}



/////// 3D



function xyz(px, py, pz, pitch, roll, yaw) {

    var cosa = Math.cos(yaw);
    var sina = Math.sin(yaw);

    var cosb = Math.cos(pitch);
    var sinb = Math.sin(pitch);

    var cosc = Math.cos(roll);
    var sinc = Math.sin(roll);

    var Axx = cosa*cosb;
    var Axy = cosa*sinb*sinc - sina*cosc;
    var Axz = cosa*sinb*cosc + sina*sinc;

    var Ayx = sina*cosb;
    var Ayy = sina*sinb*sinc + cosa*cosc;
    var Ayz = sina*sinb*cosc - cosa*sinc;

    var Azx = -sinb;
    var Azy = cosb*sinc;
    var Azz = cosb*cosc;

    x = Axx*px + Axy*py + Axz*pz;
    y = Ayx*px + Ayy*py + Ayz*pz;
    z = Azx*px + Azy*py + Azz*pz;

    return {x:x, y:y, z:z};
}



///////////////// IMAGE UTILITIES

function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = { width: 0, height: 0, fScaleToTargetWidth: true };

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
       fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}




//////////// UTILS

function getLocs(d, gmap){

			var loc = new google.maps.LatLng(d.LATITUDE, d.LONGITUDE);
			var px = fromLatLngToPixel(loc, gmap);
			return px;

}


function resetMap(){
		ctx.clearRect(0,0,w,h);
		heatmapData = [];
		particles = [];
		counter = 0;
		active_lines = [];
		line = [];
		total_pedestrians_injured = 0, total_pedestrians_deaths = 0;
		total_cyclists_injured = 0, total_cyclists_deaths = 0;
		total_motorists_injured = 0, total_motorists_deaths = 0;
		total_deaths = 0, total_injured = 0;
		monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0;

		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}

		markers = [];
		if(heatmap) heatmap.setMap(null);

}




function turnMain(val){
	$('#motorists_checked').prop( "checked", val );
	$('#cyclists_checked').prop( "checked", val );
	$('#pedestrians_checked').prop( "checked", val );
	filter_pedestrian = val;
	filter_cyclist = val;
	filter_motorist = val;
}


function turnOffAllChecked(){
	$('#all_accidents').prop( "checked", false );
	turnAllChecked(false)
}



	function turnDays(val){
		$('#mon_check').prop( "checked", val );
		$('#tues_check').prop( "checked", val );
		$('#wed_check').prop( "checked", val );
		$('#thurs_check').prop( "checked", val );
		$('#fri_check').prop( "checked", val );
		$('#sat_check').prop( "checked", val );
		$('#sun_check').prop( "checked", val );
		$('#days_checked').prop( "checked", val );
	}

 function turnAllChecked(val){
 	//$('#total_injured').prop( "checked", val );
 	//$('#total_killed').prop( "checked", val );
 	//$('#ok_checked').prop( "checked", val );
	if(val == true) {
		turnMain(true);
		turnSubs("injured", true);
		turnSubs("killed", true);
	}
 }


 function turnSubs(type, val){
 	$('#motorists_' + type).prop( "checked", val );
 	$('#cyclists_' + type).prop( "checked", val );
 	$('#pedestrians_' + type).prop( "checked", val );
	if(val == false) {
		turnMain(false);
	}
 }




	 function addLocCross(d, _loc){
		var loc = _loc || new google.maps.LatLng(d.LATITUDE, d.LONGITUDE);
		var px = fromLatLngToPixel(loc, gmap);
 	 	ctx.fillStyle = "red";
 	 	ctx.cross(px.x, px.y, 2, 8);
	 }
