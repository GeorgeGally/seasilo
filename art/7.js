rbvj = function() {

  clearCanvases();

  var stripe_height = 700;
  var engine = new particleEngine(2000, 1);
  //console.log(engine.particles);

  var total = 0;


  for (var i = 0; i < engine.particles.length; i++) {
    var p = engine.particles[i];
    p.sz = engine.grid.spacing_x;
    //p.sz = map(data[i], 0, 450, 0, w);
    p.pos.x = total;
    p.pos.y = 0;
    total += p.sz;


    p.c = randomGrey();
  }

  var highlight = false;

  draw = function(){

    ctx.background(100);
    ctx.fillStyle = rgba(25);
    ctx.fillRect(0, h/2, w, h/2);

    for (var i = 0; i < engine.particles.length; i++) {
      var p = engine.particles[i];

      p.pos.x += 1;
      if (p.pos.x > w) p.pos.x = engine.grid.spacing_x;

      ctx.fillStyle = p.c;
      ctx.fillRect(p.pos.x, 0, p.sz, h);
      //ctx.fillRect(p.pos.x, 680, p.sz, stripe_height);

    }

    drawGraph();

  }


  ctx2.font = "15px Arial";

  function drawGraph(){

    ctx2.clearRect(0, 0, w, h);
    var pos = map(counter, 0, 20000000, 0, w);

    ctx.fillStyle = rgb(0, 0.3);
    ctx.fillRect(pos, 0, 80, h);

    //var ww = map(counter, 0, w, 0, 20000000);
    ctx.fillStyle = rgb(0, 0.5);
    ctx.fillRect(pos + 1, 0, 5, h);

    //ctx2.fillStyle = rgb(0, 174, 239);
    ctx2.fillStyle = rgb(200, 0, 0);
    ctx2.fillRect(pos, 0, 5, h);


    ctx2.fillStyle = "#fff";
    ctx2.fillText(counter + " containers are at sea today", pos + 20, h - 170);
    ctx2.fillStyle = rgb(200);
    ctx2.fillText("One line represents 2000 containers", pos + 20, h - 150);
    counter+=1000;
  }


}

rbvj();
