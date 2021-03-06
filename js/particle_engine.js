var particleEngine = function(_gw, _gh, _grid_w, _grid_h, _startx, _starty){

	var gw = _gw || 0;
	var gh = _gh || 0;

	this.start = {x: _startx || 0 , y: _starty || 0};
	this.width = _grid_w || w;
  this.height = _grid_h || h;

	this.bounce = false;
	this.edges = true;
	this.reset = false;
	this.MAXPARTICLES = 10000;
	this.particles = [];
	this.spacing = 0;
	this.border = true;
	this.speed = new Vector(random(0.2,2), random(0.2,2));
	this.length = 0;
	this.tween_speed = 10;
	this.pos = new Vector();
	this.last = [];

	this.grid = new Grid(gw, gh,  this.width, this.height, this.start.x, this.start.y);
	var num_particles = this.grid.length;


	this.setup = function() {

		for (var i = 0; i < num_particles; i++) {

		  var cc = rgb(0);
			this.add(this.grid.x[i], this.grid.y[i], cc, i);

		}

	}


		this.add = function(_x, _y, _colour, _me){
			//console.log(this.grid.grid);

			var x = _x || w/2;
			var y = _y || h/2;
			var colour = _colour || "black";
			var me = _me || this.particles.length;

			var angle = radians(distributeAngles(me, this.particles.length));

			if (this.grid.grid[me]) {
				row = this.grid.grid[me].row
				col = this.grid.grid[me].col
			} else {
				row = 1;
				col = 1;
			}

			var speed =  new Vector(random(0.2,2), random(0.2,2));
			var accel = new Vector(1,1);

			var particle = {
				pos: new Vector(x, y),
				start: new Vector(x, y),
				target: new Vector(x, y),
				old: new Vector(x, y),
				end: new Vector(x, y),
				row: row,
				col: col,
				speed: speed,
				start_speed: speed,
				accel: accel,
				start_accel: new Vector(accel.x, accel.y),
				vel: speed,
				dir: new Vector(1, 1),
				acceleration: new Vector(1,1),
				c: _colour,
				alpha: 1,
				tween_speed: this.tween_speed,
				tween: true,
				me: _me,
				//parent: null,
				r: 0,
				sz: 5,
				orig_sz: 5,
				target_sz: 5,
				target_size: 5,
				size: 4,
				on: true,
				isSpring: false,
				spring: 0.03,
				friction: 0.98,
				angle: angle,
				engine: []
		}

			//console.log(particle)
			this.particles.push(particle);
			this.last = particle;
			this.length = this.particles.length;
			// this.spacing = 360/this.particles.length;
			this.resetAngles();
			// if (this.particles.length > this.MAXPARTICLES) this.particles.splice(0, 1);
			// return particle;
	}

	this.draw = function(_ctx) {
		var ctx = _ctx || ctx;
		this.update();
		this.drawParticles(ctx);
	}

	this.setSpeed = function(_x1 , _x2, _y1 , _y2) {
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			if(!_y1) {
				p.speed = new Vector(_x1 , _x2);
			} else {
				p.speed = new Vector(random(_x1 , _x2), random(_y1 , _y2));
			}

		}
	}

	this.setAccel = function(_x1 , _x2, _y1 , _y2) {
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.accel = new Vector(randomCardinal(_x1 , _x2), randomCardinal(_y1 , _y2));
			p.start_accel = p.accel;
		}
	}

	this.setDir = function(_x, _y) {
		var x = _x || posneg();
		var y = _y || posneg();
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.dir = new Vector(x, y);
		}
	}

	this.setSize = function(min, max) {
		max = max || min;

		for (var i = 0; i < this.particles.length; i++) {
			var sz = random(min, max);
			this.particles[i].sz = sz || 0;
			this.particles[i].target_sz = sz || 0;
		}
	}

	this.setColour = function(c) {
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.c = c;
		}
	}

	this.randomize = function() {
		for (var i = 0; i < this.particles.length; i++) {
		  var p = this.particles[i];
		  p.pos.x = random(w);
		  p.pos.y = random(h);
		}
	}


	this.get = function(i){
		return this.particles[i];
	}


this.resetAngles = function() {
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		p.angle = radians(distributeAngles(i, this.particles.length));
	}
}

this.delete = function(_me){
	if (_me === undefined) {
		_me = 0;
	}
	// var pos = this.particles.indexOf(p)
	// if (p === undefined) {
	// 	pos = 0;
	// }
	//console.log(pos);
	//this.particles.splice(pos, 1);
	//console.log(_me);
	this.particles.splice(_me, 1);
	this.length = this.particles.length;
	for (var i = 0; i < this.length; i++) {
		var p = this.particles[i];
		p.me = i;
	}
	this.spacing = 360/this.particles.length;

}

this.drawParticles = function(_ctx){
	var ctx = _ctx || ctx;
	for (var i = 0; i < this.length; i++) {

		p = this.particles[i];
		ctx.fillStyle = p.c;
		ctx.fillEllipse(p.pos.x, p.pos.y, p.sz, p.sz);

	}

}


this.update = function(){

	for (var i = 0; i < this.length; i++) {

		p = this.particles[i];

		if (p.isSpring) {
			updateSpring(p)
		}	else {
			this.move(p);
			this.offCanvasTest(p);
		}
	}
}


this.move = function(p){

		p.old = p.pos;
		if (p.tween == false) {
			p.pos.x += (p.speed.x  * p.accel.x)*p.dir.x;
			p.pos.y += (p.speed.y  * p.accel.y)*p.dir.y;

		} else {
			p.target.x += (p.speed.x * p.accel.x)*p.dir.x;
			p.target.y += (p.speed.y * p.accel.y)*p.dir.y;
			p.sz = tween(p.sz, p.target_sz, p.tween_speed);
			p.pos.x = tween(p.pos.x, p.target.x, p.tween_speed);
			p.pos.y = tween(p.pos.y, p.target.y, p.tween_speed);
		}

		//if (p.me == 2) console.log(p.speed.x);

}



this.offCanvasTest = function(p){

	if(!this.edge) {
		//console.log(this.edge);
		if (p.pos.x > w || p.pos.y > h || p.pos.x < 0 || p.pos.y < 0) this.delete(p.me);
	} else if(this.border) {

		if (this.bounce) {

			if (bounce(p.x, 0, w)) {
				p.speed.x *=-1;
				if (this.reset) this.resetParticle(p);
			}


			if (bounce(p.y, 0, h)) {
				p.speed.y *=-1;
				if (this.reset) this.resetParticle(p);
			}

		} else {

			if (p.pos.x > w) {
				p.pos.x = p.target.x = 0;
				if (this.reset) this.resetParticle(p);
			}


			if (p.pos.y > h) {
				p.pos.y = p.target.y = 0;
				if (this.reset) this.resetParticle(p);
			}

			if (p.pos.x < 0) {
				p.pos.x = p.target.x = w;
				if (this.reset) this.resetParticle(p);
			};
			if (p.pos.y < 0) {
				p.pos.y = p.target.y = h;
				if (this.reset) this.resetParticle(p);
			};
		}



	}
}


this.resetParticle = function(p){
	p.speed.y = random(1);
	p.start_accel.y = random(0.5);
	p.accel.y = p.start_accel.y;
	p.me == 10 ? console.log(p.start_accel.y) : null;
}


function updateSpring(b) {

 	var dx = b.target.x - b.pos.x;
 	var dy = b.target.y - b.pos.y;
 	var ax = dx * b.spring;
 	var ay = dy * b.spring;
 	b.speed.x += ax;
 	b.speed.y += ay;
 	//We build in some friction here, otherwise the ball
 	//will keep on moving to and fro for ever.
 	b.speed.x *= b.friction;
 	b.speed.y *= b.friction;
 	b.pos.x +=  b.speed.x;
 	b.pos.y +=  b.speed.y;
}


this.getEnd = function(b){
	parent = b.parent;
	angle = b.angle;
	while(parent) {
		angle += parent.angle;
	//if(b.parent != undefined) { b.angle += parent.angle; }
		//if(b.parent != undefined)
		parent = parent.parent;
	}
	var x = b.pos.x + Math.cos(angle) * b.size;
	var y = b.pos.y + Math.sin(angle) * b.size;
	b.end = new Vector(x,y)
	return b.end;
}


this.respace = function(){
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		p.target.x = this.grid[i].x;
		p.target.y = this.grid[i].y;
	}
}

	this.setup();
}
