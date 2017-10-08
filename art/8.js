rbvj = function() {


  var engine = new particleEngine(30, 40);

  var TOTAL = 6000000/12;
  var txt = "Number of containers entering the US every month:";
  var sub = "6 million containers enter the US each year, worth over $1.8 trillion";
  var sub2 = "";


  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    setParticles(p, engine);
  }

  function setParticles(p, _engine) {
    p.pos.y = random(h + 200);
    p.speed = new Vector(0, random(0.4, 2));
    p.sz = randomInt(0.5, 5);
    p.c = randomGrey(100, 255);
  }

   draw = function() {
    ctx.background(0);
    ctx2.clearRect(0, 0, w, h);
    // ctx.fillStyle = rgba(255, 0.4);

    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];
      p.pos.y += p.speed.y;
      ctx.fillStyle = "white";
      // if(p.pos.y > h - 150 & p.pos.y < h - 120){
      //   ctx.fillStyle = "purple";
      // }
      ctx.centreFillRect(p.pos.x, p.pos.y, engine.grid.spacing.x-1, p.sz);

      if(p.pos.y > h + 100) {
        p.pos.y = random(-400);
        counter++;
      }
    }

    drawGraph(txt, TOTAL, sub, sub2);
  }


}

rbvj();
