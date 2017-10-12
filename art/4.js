rbvj = function() {

  var txt = "Tonnes of CO2 emmitted by ships each year:";
  var sub = "One super tanker emits the equivalent greenhouse gasses of 50 million cars.";
  var sub2 = "The 15 largest ships emit as much pollution as all the world's cars.";
  var TOTAL = 1200000000;

  var num = 80;
  var grid = createGrid(num, 1, w, h);
  ctx.background(255);

  var engine = new particleEngine(num, 1);

  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    setParticles(p, engine);
  }

  function setParticles(p, _engine) {
    p.size = randomInt(10, 60);
    p.size2 = 60;
    p.orbit = new Vector(w/2, h/2);
    p.angle = radians(random(0,60));
    p.angle2 = random(30);
    p.speed = new Vector(random(-4,4), posNeg()*random(0.1, 0.5));
  }

  draw = function() {


    ctx2.clearRect(0,0,w,h);
    ctx3.clearRect(0,0,w,h);
    // whiteSquareLogo(ctx3, h/2);


        for (var i = 0; i < engine.particles.length; i++) {
            var p = engine.particles[i];
            ctx2.lineWidth = 0.5;
            update(p, engine);


            drawArm(p);
            drawOrbits(p);


            counter+= Math.round(p.size);
            ctx2.lineWidth = 1;
            //ctx2.line(p.pos.x, p.pos.y, p.pos.x, h);
    }
    drawGraph(txt, TOTAL, sub, sub2, true);
  }


  function drawArm(p){
    //ctx2.fillStyle = "#00aeef";
    ctx2.fillStyle = "#dd0000";
    ctx2.LfillEllipse(p.pos.x, p.pos.y, 5, 5);
  }

  function drawOrbits(p){
    ctx.lineWidth = 0.5;
    ctx2.fillStyle = rgba(255);
    ctx.fillStyle = rgba(0,0,0, 0.1);
    ctx.HfillEllipse(p.orbit.x, p.orbit.y, p.size, p.size);
    ctx.strokeStyle = rgba(255, 0.3);
    if(frameCount%2 == 0) ctx.HstrokeEllipse(p.orbit.x, p.orbit.y, p.size, p.size);
    ctx2.fillStyle = rgba(255);
    ctx2.HfillEllipse(p.orbit.x, p.orbit.y, p.size/1, p.size/1);
    ctx2.fillStyle = rgba(0);
    ctx2.LfillEllipse(p.orbit.x, p.orbit.y, 3, 3);
    //ctx2.strokeStyle = "#00aeef";
    ctx2.strokeStyle = "#000000";
    ctx2.line(p.pos.x, p.pos.y, p.orbit.x, p.orbit.y);

  }


  function update(p, _engine) {

      p.angle += p.speed.y/1000;
      p.pos.y = h/2 + Math.sin(p.angle)*h/2;
      p.angle2 += p.speed.y/60;
      p.size2 = p.size + Math.cos(p.angle2) * p.size/4;
      p.orbit.x = p.pos.x + Math.cos(p.angle2) * p.size2;
      p.orbit.y = p.pos.y + Math.sin(p.angle2) * p.size2;

  }


  function drawGraphWhite(txt, _num, sub, sub2){

    //ctx4.font = "16px Arial";
    ctx4.textAlign = "left";

    ctx4.clearRect(0,0,w,h);
    var ht = h - 150;
    $('.under_bar').css('background: rgba(255,255,255,0.4)');
    // ctx4.fillStyle = rgb(225, 0.2);
    // ctx4.fillRect(0, ht, w, 90);

    // ctx4.fillStyle = rgb(0);
    // ctx4.shadowColor= rgb(255, 0.5);
    // ctx4.shadowBlur = 4;
    // ctx.shadowOffsetY = 2;
    var pos = map(counter, 0, _num, 0, w);

    ctx4.fillStyle = rgb(0);
    ctx4.fillText(txt  + " " + counter, 10, ht + 35);

    if(frameCount < 1200) {

      ctx4.font = "15px Arial";
      ctx4.fillStyle = rgb(75);

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


}

rbvj();
