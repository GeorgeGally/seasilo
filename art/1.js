rbvj = function() {

  var txt = "Number of containers transported today:";
  var sub = "17m containers worldwide, 6m on the move at any time.";
  var sub2 = "The largest ships hold 20 000+ containers.";

  var TOTAL = 6000000;
  var MAXPARTICLES = 12000;
  var engine = new particleEngine();

  counter = 0;

  engine.setSpeed(0, 0, -1, 15);
  engine.setAccel(0, 0, 0.05, 0.2);
  engine.setDir(1, -1);

  engine.edge = false;
  engine.border = false;
  engine.reset = true;

  var MAXSPEED = 20;
  ctx.background(0);

  for (var i = 0; i < 200; i++) {
    addParticle();
  }

  draw = function() {
    ctx2.clearRect(0, 0, w, h);
    ctx.background(0, 0.2);

    if (engine.particles.length < MAXPARTICLES) {
      for (var i = 0; i < 25; i++) {
        addParticle();
      }
    }
    for (var i = engine.particles.length - 1; i > 0; i--) {

      var p = engine.particles[i];
      moveParticle(p);
      drawParticle(p)
    }

    drawGraph(txt, TOTAL, sub, sub2);

  }

  function addParticle() {
    engine.add(random(w), random(-100));
    var last = engine.last;
    last.speed = new Vector(0, random(2, 20));
    last.accel = new Vector(0, random(0.01, 0.5));
    last.dir = new Vector(1, -1);
    last.sz = random(1, 2);
  }

  function moveParticle(p) {
    //p.accel.y < 2 ? p.accel.y +=0.01 :  2;
    p.pos.y += p.speed.y;
    if (p.pos.y > h) {
      p.pos.y = random(-100);
      counter++;
    }
  }

  function drawParticle(p) {
    ctx.fillStyle = rgba(255, p.alpha);
    ctx.fillRect(p.pos.x, p.pos.y, p.sz, p.sz);
  }

  // ctx2.font = "16px Arial";
  //
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
  //   ctx2.fillText("Number of containers transported today: " + counter, 10, ht + 35);
  //   ctx2.fillStyle = rgb(155);
  //   ctx2.fillText("There are 17 million shipping containers in the world, of which 6 million are on the move at any time.", 10, ht + 58);
  //   ctx2.shadowBlur = 0;
  //   ctx2.fillStyle = "red";
  //   ctx2.fillRect(0, ht, pos, 6);
  // }


}

rbvj();
