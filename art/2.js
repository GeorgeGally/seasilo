rbvj = function() {

  clearCanvases();

  var TOTAL = 6000;
  var txt = "If all the container ships passed you by:";
  var sub = "There are around 100 000 transport ships in the world,";
  var sub2 = "of which 6000 are container ships, 7065 are oil tankers and 5381 are chemical and gas tankers.";

  counter = 0;

  var engine = new particleEngine(20, 90, w + 100, h);

  var speed = randomInt(4, 40);

  for (var i = 0; i < engine.particles.length; i++) {

    var p = engine.particles[i];
    //if (i%engine.grid.num_items_horiz == 0)
    speed = randomInt(1, 6);
    p.speed.x = speed;
    p.speed.y = 0;
    p.pos.x = random(w);
    p.dir = posNeg();
    p.c = randomGrey(50, 245, 5);

  }



  draw = function() {

    ctx.background(0, 0.1)
    ctx2.clearRect(0, 0, w, h);

    drawParticles();
    drawGraph(txt, TOTAL, sub, sub2);
  }


  function drawParticles(){

    for (var i = 0; i < engine.particles.length; i++) {

      var p = engine.particles[i];

      ctx.fillStyle = p.c;
      p.pos.x +=  p.dir * p.speed.x/5;

      ctx.fillRect(p.pos.x, p.pos.y, engine.grid.spacing.x/5, engine.grid.spacing.y-1);

      if(p.pos.x > w + 100) {
        p.pos.x = -100;
        counter++;
      } else if(p.pos.x < -120) {
        p.pos.x = w + 90;
        counter++;
      }

    }



  }

//  ctx2.font = "15px Helventica, Arial";

  // function drawGraph(){
  //   var ht = h - 100;
  //   ctx2.fillStyle = rgb(0, 0.6);
  //   ctx2.fillRect(0, ht - 40, w, 80);
  //   ctx2.fillStyle = "white";
  //   var pos = map(counter, 0, MAXNUMBER, 0, w);
  //   ctx2.fillText("If all the container ships passed you by: : " + counter, 20, ht - 15);
  //   ctx2.fillStyle = rgb(200);
  //   ctx2.fillText("The largest container ships now carry more than 20 000 containers", 20, ht + 30);
  //   ctx2.fillRect(0, ht, w, 6);
  //   ctx2.fillStyle = "red";
  //   ctx2.fillRect(0, ht, pos, 6);
  // }


}

rbvj();
