rbvj = function() {

  //clearCanvases();

  var txt = "Number of containers lost at sea in a year: ";
  var sub = "Although spills have rapidly decreased over the years, it's thought these numbers are vastly under-reported.";
  var sub2 = "The single largest container spill was the MOL Comfort in 2013, with the loss of 4293 containers into the Indian Ocean";

  var TOTAL = 1582;

  var grid = new Grid (1, 1, w/2 ,h/2, w/4, h/4)

  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
  		Body = Matter.Body,
      Bodies = Matter.Bodies;


  var engine, world;
  var circles = [];
  var boundries = [];

  var radius = 140;


  function setup() {
    // var body = document.querySelector("body");
    // hidden_canvas = document.getElementById('canvas3')
  	engine = Engine.create();
    engine.density = 0.005;
  	world = engine.world;
  	Engine.run(engine);

    var offset = 5;


    options = {
      friction: 0.9,
      restitution: 0.4,
      isStatic: true
    }

  //var topWall = Bodies.rectangle(400, 0, 810, 30, options);
  var leftWall = Bodies.rectangle(0, 0, 20, h*2, options);
  var rightWall = Bodies.rectangle(w, 0, 20, h*2, options);
  var bottomWall = Bodies.rectangle(w/2, h, w, 20, options);

  World.add(engine.world, [leftWall, rightWall, bottomWall]);


  	for (var i = 0; i < grid.length; i++) {
      var g = grid.grid[i];
  		var x = g.x;
  		var y = g.y;
      //if (g.row % 2 == 0) x -= grid.spacing.x/2;
  		boundries.push(new Obstacle(x, y, radius))
  	}


    for (var i = 0; i < 10; i++) {
      addCircle();
    }

    engine.timing.timeScale = 0.9;
    engine.world.gravity.x = 0.2;
  }

  draw = function(){

    hidden_ctx.background(0);
  	ctx2.clearRect(0, 0, w, h);
    //hidden_ctx.clearRect(0, 0, w, h);
    hidden_ctx.fillStyle = rgb(255);
    // hidden_ctx.globalCompositeOperation = "screen";
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = rgb(80);


    if(chance(100)) engine.world.gravity.x = random(-0.2, 0.2);
    if(chance(200)) engine.world.gravity.y = random(-0.1, 1);
    //for (var i = 0; i < 2; i++) {
    if(chance(2)) addCircle();
    //}

    for (var i = 0; i < boundries.length; i++) {
      boundries[i].show();
    }

  	for (var i = 0; i < circles.length; i++) {
  		var b = circles[i];
  		b.show();
      if(b.pos.x > w) b.pos.x = 0;
      if(b.pos.x < 0) b.pos.x = w;
  	}

    ctx.drawImage(hidden_canvas, 0, 0, w, h);

    drawGraph(txt, TOTAL, sub, sub2);

  }



  function addCircle(){
    counter++;
    circles.push(new Circle(random(w), -random(300), 15));

  }


  //////////////////////// OBJECTS

  var Circle = function(x, y, r){
  	this.options = {
  		friction: 0.9,
  		restitution: 0.2
  	}
  	this.r = r;
    this.c = randomGrey();
  	this.body = Bodies.circle(x, y, this.r/2, this.options);
    this.pos = this.body.position;

  	World.add(world, this.body);

  	this.show = function(){
  		this.pos = this.body.position;
  		var angle = this.body.angle;

  		hidden_ctx.save();
  		hidden_ctx.translate(this.pos.x, this.pos.y);
  		hidden_ctx.fillStyle = this.c;
  		hidden_ctx.centreFillRect(0,0, this.r, this.r);
      //hidden_ctx.drawImage(img, 0,0, this.r, this.r);
  		hidden_ctx.restore();
  	}

  	this.removeFromWorld = function(){
  		World.remove(world, this.body);
  	}
  }


  function Obstacle(x, y, r){

  	this.x = x;
  	this.y = y;
  	this.r = r;

  	this.options = {
  		friction: 0.99,
  		restitution: 0.1,
  		isStatic: true
  	}

  	//this.body = Bodies.circle(x, y, this.r/2, this.options);
    this.body = Bodies.polygon(x, y, 3, this.r*1.1, this.options);

  	this.show = function(){

  		var pos = this.body.position;

      ctx.fillStyle = rgb(200);

  	}

    this.move = function(){

    	var pos = this.body.position;
    	var y = h - h/4 + Math.sin(frameCount/100) * h/4;
    	// Body.translate(this.body, pos);
    	Body.translate(this.body, {x: pos.x, y: y});
    	// Body.update(this.body);
    }

  }



  // function drawGraph(){
  //   var ht = h - 100;
  //   ctx2.fillStyle = rgb(0, 0.5);
  //   ctx2.fillRect(0, ht, w, 50);
  //   ctx2.fillStyle = rgb(255);
  //   var pos = map(counter, 0, 1582, 0, w);
  //   ctx2.fillText("Number of containers lost at sea in a year: " + counter, 10, ht - 20);
  //   ctx2.fillStyle = rgb(0);
  //   ctx2.fillRect(0, ht, w, 6);
  //   ctx2.fillStyle = "red";
  //   ctx2.fillRect(0, ht, pos, 6);
  // }


  setup();
}

rbvj();
