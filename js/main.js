var fileref;
var rbvj;
var currentFile = 1;
var totalFiles = 7;

var ctx = createCanvas("canvas1", "page3");
var ctx2 = createCanvas("canvas2", "page3");
var ctx3 = createCanvas("canvas3", "page3");
var ctx4 = createCanvas("canvas4", "page3");

var hidden_ctx = createHiddenCanvas('hidden_canvas');

ctx.canvas.style.width = w + 'px';
ctx.canvas.style.height = h + 'px';
ctx2.canvas.style.width = w + 'px';
ctx2.canvas.style.height = h + 'px';
ctx3.canvas.style.width = w + 'px';
ctx3.canvas.style.height = h + 'px';
ctx4.canvas.style.width = w + 'px';
ctx4.canvas.style.height = h + 'px';

if (window.devicePixelRatio >= 2) {
    ctx.canvas.width = w * 2;
    ctx.canvas.height = h * 2;
    ctx.scale(2, 2);
    ctx2.canvas.width = w * 2;
    ctx2.canvas.height = h * 2;
    ctx2.scale(2, 2);
    ctx3.canvas.width = w * 2;
    ctx3.canvas.height = h * 2;
    ctx3.scale(2, 2);
		ctx4.canvas.width = w * 2;
    ctx4.canvas.height = h * 2;
    ctx4.scale(2, 2);
}



function drawGraph(txt, _num, sub, sub2){

  ctx4.font = "16px Arial";
  ctx4.textAlign = "left";

  ctx4.clearRect(0,0,w,h);
  var ht = h - 150;

  ctx4.fillStyle = rgb(0, 0.4);
  ctx4.fillRect(0, ht, w, 90);

  ctx4.fillStyle = rgb(255);
  ctx4.shadowColor="black";
  ctx4.shadowBlur=3;
  var pos = map(counter, 0, _num, 0, w);



    ctx4.fillStyle = rgb(255);
    ctx4.fillText(txt  + " " + counter, 10, ht + 35);

  if(frameCount < 2200) {

    ctx4.font = "15px Arial";
    ctx4.fillStyle = rgb(175);

    ctx4.fillText(sub, 10, ht + 55);
    ctx4.fillText(sub2, 10, ht + 74);

  }
  ctx4.shadowBlur=0;
  ctx4.fillStyle = rgb(255);
  ctx4.fillRect(0, ht, w, 6);
  ctx4.fillStyle = "red";
  ctx4.fillRect(0, ht, pos, 6);
  if(counter >= _num) {
    currentFile = (currentFile + 1)%totalFiles;
    changeFile(currentFile);
  }
}



function changeFile( num ) {

  clearCanvases();

  currentFile = num;
	if (fileref != undefined) document.getElementsByTagName("head")[0].removeChild(fileref);

		ctx.globalCompositeOperation = "source-over";
		var loc = num || 1;
		console.log ("File: " + loc);
		var filename = 'art/' +  loc + '.js';
		fileref = document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename);
        document.getElementsByTagName("head")[0].appendChild(fileref);
        document.location.hash = loc;

				counter = 0;
        frameCount = 0;
}


changeFile(1);

function clearCanvases(){
  ctx.clearRect(0,0,w,h);
  ctx2.clearRect(0,0,w,h);
  ctx3.clearRect(0,0,w,h);
  ctx4.clearRect(0,0,w,h);
  hidden_ctx.clearRect(0,0,w,h);
}


$(this).keypress(function(){
	var keyCode = event.keyCode;
  document.getElementById('page3').scrollIntoView({behavior: 'smooth'})
	changeFile(keyCode-96);

});


$(function(){

	/* function to make the thumbs menu scrollable */

	function buildThumbs($elem){
		var $wrapper    	= $elem.next();
		var $menu 			= $wrapper.find('.sc_menu');
		var inactiveMargin 	= 120;

		/* move the scroll down to the
		beggining (move as much as the height of the menu) */

		$wrapper.scrollTop($menu.outerHeight());

		/* when moving the mouse up or down,
		the wrapper moves (scrolls) up or down */

		$wrapper.bind('mousemove',function(e){
			var wrapperHeight 	= $wrapper.height();
			var menuHeight 	= $menu.outerHeight() + 2 * inactiveMargin;
			var top 	= (e.pageY - $wrapper.offset().top) * (menuHeight - wrapperHeight) / wrapperHeight - inactiveMargin;
			$wrapper.scrollTop(top+10);
		});
	}

	var stacktime;

	$('#menu li > a').bind('mouseover',function () {
		var $this = $(this);
		buildThumbs($this);
    $('.sc_menu_wrapper').removeClass('hidden');

		//var pos	=	$this.next().find('.thumb').size();
    $('.thumb').each(function(){
      $(this).css('visibility','visible');

    })
	});

	/* on mouseleave of the whole <li> the scrollable area is hidden */

	$('#menu li').bind('mouseleave',function () {
		var $this = $(this);
    $('.sc_menu_wrapper').addClass('hidden');
	});

var startx = 0;
var starty = 0;
    document.body.addEventListener('touchstart', function(e){
           touchobj = e.changedTouches[0] // reference first touch point
           startx = parseInt(touchobj.clientX) // get x coord of touch point
           starty = parseInt(touchobj.clientY)
           //e.preventDefault() // prevent default click behavior
       }, false)

    document.body.addEventListener('touchend', function(e){
            touchobj = e.changedTouches[0] // reference first touch point for this event
            var dist = parseInt(touchobj.clientX) - startx // calculate dist traveled by touch point
            console.log("end:" + dist);
            if(dist> 0) {
              var $this = $(this);
              $('.sc_menu_wrapper').addClass('hidden');
            } else if (dist < 0) {
                      var $this = $('#menu li > a');
                      buildThumbs($this);
                      $('.sc_menu_wrapper').removeClass('hidden');
                      $('.thumb').each(function(){
                        $(this).css('visibility','visible');
                      })
                    }
            //e.preventDefault()
        }, false)



  $('.thumb').bind('click',function () {
      var num = $(this.classList[1]).selector.substring(3,4);
      console.log(num);
      changeFile(num);
      //$('html,body').animate({scrollTop: $('#page3').offset().top}, 'slow')
      document.getElementById('page3').scrollIntoView({behavior: 'smooth'})
  })

  $('.pg1_scroll').bind('click',function () {
      document.getElementById('page2').scrollIntoView({behavior: 'smooth'})
  })
  $('.pg2_scroll').bind('click',function () {
      document.getElementById('page3').scrollIntoView({behavior: 'smooth'})
  })
});



//var hashTagActive = "";
// $(".scroll").on("click" , function (event) {
//       if(hashTagActive != this.hash) { //this will prevent if the user click several times the same link to freeze the scroll.
//           event.preventDefault();
//           //calculate destination place
//           var dest = 0;
//           if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
//               dest = $(document).height() - $(window).height();
//           } else {
//               dest = $(this.hash).offset().top;
//           }
//           //go to destination
//           $('html,body').animate({
//               scrollTop: dest
//           }, 2000, 'swing');
//           hashTagActive = this.hash;
//       }
//   });
