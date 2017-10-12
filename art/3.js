rbvj = function() {

  var TOTAL = 6000000/12;
  var txt = "Number of containers entering the US each month:";
  var sub = "6 million containers enter the US each year,";
  var sub2 = "with goods worth over $1.8 trillion";

  counter = 0;
  ctx.background(0);
  var engine = new particleEngine(40, 120, w + 100, h);

  for (var i = 0; i < engine.particles.length; i++) {

    var p = engine.particles[i];
    speed = random(4, 20);
    p.pos.x = random(w);
    p.speed.x = speed;
    p.speed.y = 0;
    p.dir = posNeg();
    p.c = randomGrey(50, 245, 5);

  }



  draw = function() {

    ctx.background(0, 0.5)
    ctx2.clearRect(0, 0, w, h);
    drawParticles();

    drawGraph(txt, TOTAL, sub, sub2);

  }


  function drawParticles(){

    for (var i = 0; i < engine.particles.length; i++) {

      var p = engine.particles[i];

      ctx.fillStyle = p.c;
      p.pos.x +=  p.speed.x;

      ctx.LfillEllipse(p.pos.x, p.pos.y, 6, 6, 5);
      if(p.pos.x > w + 20) {
        p.pos.x = -100;
        counter++;
      }

    }
  }

  // function drawGraph() {
  //   ctx2.font = "16px Arial";
  //   var ht = h - 150;
  //   var pos = map(counter, 0, TOTAL, 0, w);
  //
  //   ctx2.fillStyle = rgba(0, 0.5);
  //   ctx2.fillRect(0, ht, w, 80);
  //
  //   ctx2.fillStyle = rgba(0);
  //   ctx2.fillRect(0, ht + 4, w, 6);
  //
  //   ctx2.fillStyle = rgb(255);
  //   ctx2.fillRect(0, ht, w, 6);
  //   ctx2.fillStyle = rgb(255);
  //   ctx2.fillText("Number of containers entering the US every month: " + counter, 10, ht + 35);
  //   ctx2.fillStyle = rgb(155);
  //   ctx2.fillText("6 million containers enter the US each year, worth over $2 trillion", 10, ht + 55);
  //   ctx2.shadowBlur = 0;
  //   ctx2.fillStyle = "red";
  //   ctx2.fillRect(0, ht, pos, 6);
  // }


}

rbvj();
