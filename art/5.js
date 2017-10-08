rbvj = function() {
  var txt = "Barrels of oil ships chew through each day:";
  var sub = "One particle = 1000 barrels.";
  var sub2 = "A supertanker consumes 240 barrels a day, around 10000 gallons of fuel.";

  var TOTAL = 7290000;

  ctx.background(0);
  ctx2.font = "16px Arial";
  var engine = new particleEngine(80, 20, w + 100, h);


  counter = engine.particles.length;


  for (var i = 0; i < engine.particles.length; i++) {

    var p = engine.particles[i];
    p.speed.y = random(0.2, 2);
    p.pos.y = random(-h, h);
    p.c = randomGrey(120, 245);

  }



  draw = function () {

    ctx.background(0, 0.05)
    ctx2.clearRect(0, 0, w, h);
    if(counter < TOTAL) {
      drawParticles();
    }

    drawGraph(txt, TOTAL, sub, sub2);
  }


  function drawParticles(){

    for (var i = 0; i < engine.particles.length; i++) {

      var p = engine.particles[i];

      ctx.fillStyle = "#00aeef";
      ctx.fillStyle = p.c;
      p.pos.y +=  p.speed.y;

      ctx.fillEllipse(p.pos.x, p.pos.y, 10, 10);
      if(p.pos.y > h + 20) {
        p.pos.y = random(-h);
        counter+=1000;
      }
    }
  }



}

rbvj();
