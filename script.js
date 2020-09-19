{
	//gets the canvas
	var canvas = window.document.getElementById('canvas');
	//gets a 2d context
	var ctx = canvas.getContext('2d');
	//smooth();
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = 'high';
} // sets the canvas
{
	var frameCount = 0;
	//a object to store mouse stuff
	var mouse = {
		x: 0,
		y: 0,
		clicked: false
	};
	//a array to store the keyCodes
	var keys = [];
	//the smooth function (credits to loyalty)
	var smooth = function(pos, dest, time) {
		return (dest - pos) / time;
	};
	//the scene
	var scene = 'intro';
	//the intro
	//a array to store the intro particles
	introParticles = [],
		//the intro particle constructor
		IntroParticle = function() {
			//the choice
			this.choice = Math.round(Math.random());
			//makes the position random
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			//switches the choice
			switch (this.choice) {
				//if the choice is 1
				case 0:
					//make the top part of the T
					this.realX = Math.random() * (canvas.width / 2.325581395348837 - canvas.width / 1.818181818181818) + canvas.width / 1.818181818181818;
					this.realY = Math.random() * (canvas.height / 3.333333333333333 - canvas.height / 1.428571428571429) + canvas.height / 1.428571428571429;
					break;
					//if the choice is 1
				case 1:
					//make the stick on the T

					this.realX = Math.random() * (canvas.width / 2.941176470588235 - canvas.width / 1.51515151515151) + canvas.width / 1.51515151515151;
					this.realY = Math.random() * (canvas.height / 5.813953488372093 - canvas.height / 3.333333333333333) + canvas.height / 3.333333333333333;
			}
			//updates the particle
			this.update = function() {
				//makes the position become the real position
				this.x += smooth(this.x, this.realX, 60);
				this.y += smooth(this.y, this.realY, 60);
				//fills it from green to black
				ctx.fillStyle = 'rgb(0, ' + (Math.abs(Math.sin((this.x + this.y + frameCount) / 180 * Math.PI) * (255 - 150) + 150)) + ', 0)';
				//the particle
				ctx.fillRect(this.x, this.y, canvas.width / 25, canvas.height / 25);
			};
		};
	//adds 200 particles
	for (var i = 0; i < 200; i++) {
		introParticles.push(new IntroParticle());
	}
} // the most important stuff
{
	var transition = {
		x: -600,
		xv: 0,
		active: false,
		to: null,
		run: function() {
			//makes the thingy move
			this.xv += 3;
			this.xv *= 0.9;
			this.x += transition.xv;
			//the to rects
			ctx.fillStyle = 'rgb(179, 179, 179)';
			ctx.fillRect(transition.x, 0, 600, 600);
			ctx.fillRect(transition.x * -1, 0, 600, 400);
			//if the transition is over
			if (this.x >= 600) {
				//makes the transition ready
				this.active = false;
				this.x = -600;
				this.xv = 0;
			}
			//if the transition covered the screen
			if (this.x >= -300) {
				//switch the scene to the transition.to
				scene = this.to;
				if (this.to === 'game') {
					ded = true;
				}
			}
		},
	};
} // transitions
{
	//a array to store the rain drops
	var rains = [];

	//the rain constructor
	var Rain = function(config) {
		//the position of the raindrop
		this.x = config.x || Math.random() * 600;
		this.y = config.y || Math.random() * 400;
		//the speed
		this.speed = config.speed || Math.random() * 12;
		//makes the speed always bigger than 5
		while (this.speed < 5) {
			this.speed = config.speed || Math.random() * 7;
		}
	};
	Rain.prototype.move = function() {
		//makes the rain fall
		this.y += this.speed;
	};
	Rain.prototype.display = function() {
		//the rain graphics
		ctx.fillStyle = 'rgb(21, 74, 89)';
		ctx.fillRect(this.x, this.y, 1, 8);
		//makes the rain go to the top if it gets out of the canvas
		if (this.y >= 400) {
			this.y = 0;
		}
	};

	//adds 50 rain drops
	for (var i = 0; i < 50; i++) {
		rains.push(new Rain({}));
	}
} // rain code
{
	//the camera
	var cam = {
		x: 0,
		y: 0,
	};
	//the current level
	var level = 0;
	//the levels
	var levels = [{
			bitmap: [
				'@',
				'                             >>>>        #####      vvvvvv',
				'',
				'',
				'@         >>>>       ^',
				'#####                                                          #####',
			],
			messages: [{
					x: 0,
					y: 35,
					txt: 'Totally use\nwasd to move.'
				},
				{
					x: 198,
					y: 35,
					txt: 'Blocks totally\ndon\'t move.'
				},
				{
					x: 393,
					y: 35,
					txt: 'This block will\ntotally stay.'
				},
				{
					x: 587,
					y: -37,
					txt: 'You probably already understand by now\nthat this game is full of lies which is true and \nsome times not. So have fun figuring that\nout :P'
				},
				{
					x: 826,
					y: -1,
					txt: 'This block will stay'
				},
				{
					x: 1051,
					y: -1,
					txt: 'and this one will also stay.'
				},
				{
					x: 1273,
					y: 77,
					txt: 'Portals will stay.'
				},

			],
			portal: {
				x: 1340,
				y: 80,
				realX: 1140,
				realY: 100,
			}
		},
		{
			bitmap: [
				'      @',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     > <',
				'     >  ',
				'  #########',
			],
			messages: [{
				x: 77,
				y: 1385,
				txt: 'You missed the portal.\nD`:'
			}],
			portal: {
				x: 180,
				y: 380,
				realX: 180,
				realY: 380
			}
		},
		{
			bitmap: [
				'@',
				'# vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vv^^vvvvv^^^^^'
			],
			messages: [],
			portal: {
				x: 2720,
				y: -100,
				realX: 2720,
				realY: -100,
			}
		},
		{
			bitmap: [
				'     ########',
				'     #      #',
				'     #      #',
				'>           #',
				'>           #',
				'>          @#',
				'#############',
			],
			messages: [{
				x: 24,
				y: -7,
				txt: 'Totally spam the arrow keys'
			}],
			portal: {
				x: 0,
				y: 100,
				realX: 0,
				realY: 100
			}
		},
		{
			bitmap: [
				'########################################',
				'#                                      #',
				'#                                      #',
				'#                                      #',
				'#   #   # ### # #  #  #  # ### #   #   #',
				'#    #@#  # # # #  # # # #  #  ##  #   #',
				'#     #   # # # #  # # # #  #  # # #   #',
				'#     #   # # # #  # # # #  #  # # #   #',
				'#     #   ### ###   #   #  ### #  ##   #',
				'#                                      #',
				'#                                      #',
				'########################################',
			],
			messages: [{
				x: 0,
				y: 0,
				txt: 'You win! type Blue donuts in the T&T to get on the leaderboard'
			}],
			portal: {}
		}
	];
	//did the player die
	var ded = true;
	//the block size
	var blockSize = 20;
	//the player constructor
	var Player = function() {
		this.x = 0;
		this.y = 0;
		this.xv = 0;
		this.yv = 0;
	};
	Player.prototype.moveX = function() {
		//if the left arrow key is pressed
		if (keys[37]) {
			//make the player go left
			this.xv -= 0.2;
		}
		//if the right arrow key is pressed
		if (keys[39]) {
			//make the player go to the right
			this.xv += 0.2;
		}
		//if no key is pressed
		if (!keys[37] && !keys[39]) {
			//friction
			this.xv *= 0.9;
		}
		//constrains the x velocity
		if (this.xv > 10) {
			this.xv = 10;
		}
		if (this.xv < -10) {
			this.xv = -10;
		}
		this.x += this.xv;
	};
	Player.prototype.moveY = function() {
		//if the up arrow key is pressed
		if (keys[38] && this.yv === 0) {
			//make the player jump
			this.yv = -8;
		}
		//gravity
		this.yv += 0.3;
		this.y += this.yv;
		//if the player fell out of the map
		if (this.y > levels[level].bitmap.length * (blockSize * 3)) {
			transition.active = true;
			transition.to = 'game';
		}
	};
	Player.prototype.display = function() {
		//the player graphics
		ctx.fillStyle = 'rgb(173, 173, 173, ' + 100 / 255 + ')';
		ctx.beginPath();
		ctx.lineTo(this.x + this.xv, this.y);
		ctx.lineTo(this.x + this.xv + blockSize, this.y);
		ctx.lineTo(this.x + blockSize, this.y + blockSize);
		ctx.lineTo(this.x, this.y + blockSize);
		ctx.fill();
	};
	var player = new Player();

	//collision stuff
	function checkCollision(obj1, obj2) {
		//returns true if there is a collision
		return obj1.x + blockSize > obj2.x &&
			obj1.x < obj2.x + blockSize &&
			obj1.y + blockSize > obj2.y &&
			obj1.y < obj2.y + blockSize;
	}

	//a array to store the blocks
	var blocks = [];
	//the block constructor
	var Block = function(config) {
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.realX = config.realX || 0;
		this.realY = config.realY || 0;
	};
	Block.prototype.collideX = function() {
		//if there is a collision with the player
		if (checkCollision(this, player)) {
			//if the x velocity of the player is greater than 0, that means the player is colliding from the right
			if (player.xv > 0) {
				//make the player go to the right
				player.x = this.x - blockSize;
			}
			//if the x velocity of the player is less than 0, that means the player is colliding from the left
			if (player.xv < 0) {
				//make the player go to the left
				player.x = this.x + blockSize;
			}
			player.xv = 0;
		}
	};
	Block.prototype.collideY = function() {
		//if there is a collision with the player
		if (checkCollision(this, player)) {
			//if the player y velocity is greater than 0, that means the player is colliding from the top
			if (player.yv > 0) {
				//make the player go to the top of the block
				player.y = this.y - blockSize;
				//allows the player to stay on the block
				player.yv = 0;
			}
			//if the player y velocity is less than 0, that means the player hitted there head
			if (player.yv < 0) {
				//make the player go to the bottom
				player.y = this.y + blockSize;
				//make the player fall
				player.yv = 0.1;
			}
		}
	};
	Block.prototype.display = function() {
		ctx.fillStyle = 'rgb(0, 0, 0, ' + (100 / 255) + ')';
		ctx.fillRect(this.x, this.y, blockSize, blockSize);
	};
	Block.prototype.move = function() {
		if (Math.sqrt(((player.x - this.x) * (player.x - this.x)) + ((player.y - this.y) * (player.y - this.y))) <= 100) {
			this.x += Math.round(smooth(this.x, this.realX, 5));
			this.y += Math.round(smooth(this.y, this.realY, 5));
		}
	};

	var loadLev = function() {
		blocks = [];
		for (var i = 0; i < levels[level].bitmap.length; i++) {
			for (var j = 0; j < levels[level].bitmap[i].length; j++) {
				switch (levels[level].bitmap[i][j]) {
					case '#':
						blocks.push(new Block({
							x: j * blockSize,
							y: i * blockSize,
							realX: j * blockSize,
							realY: i * blockSize
						}));
						break;
					case '<':
						blocks.push(new Block({
							x: j * blockSize,
							y: i * blockSize,
							realX: j * blockSize - (blockSize * 5),
							realY: i * blockSize
						}));
						break;
					case 'v':
						blocks.push(new Block({
							x: j * blockSize,
							y: i * blockSize,
							realX: j * blockSize,
							realY: i * blockSize + (blockSize * 5)
						}));
						break;
					case '^':
						blocks.push(new Block({
							x: j * blockSize,
							y: i * blockSize,
							realX: j * blockSize,
							realY: i * blockSize - (blockSize * 5)
						}));
						break;
					case '>':
						blocks.push(new Block({
							x: j * blockSize,
							y: i * blockSize,
							realX: j * blockSize + (blockSize * 5),
							realY: i * blockSize
						}));
						break;
					case '@':
						player.x = j * blockSize;
						player.y = i * blockSize;
						player.xv = 0;
						player.yv = 0;
				}
			}
		}
		cam.x = player.x;
		cam.y = player.y;
	};
	loadLev();
} // the game stuff
{
	var Button = function(config) {
		//the position of the button
		this.x = config.x || 0;
		this.y = config.y || 0;
		//the size of the button
		this.w = 282;
		this.h = 62.00000000000001;
		this.l = 0;
		//the text on the button
		this.txt = config.txt.toUpperCase() || '';
		//the font size
		this.fontSize = 33;
		//what to do when the user clickes the mouse inside the button
		this.func = config.func || function() {};
	};
	Button.prototype.update = function() {
		//if the mouse is inside the button
		if (mouse.x > this.x - (this.w / 2) && mouse.x < this.x + (this.w / 2) && mouse.y > this.y - (this.h / 2) && mouse.y < this.y + (this.h / 2)) {
			//makes the thingy cover the button
			this.l += smooth(this.l, this.w, 6);
			//changes the cursor
			document.body.style.cursor = 'pointer';
			//if the mouse is pressed
			if (mouse.clicked) {
				this.func();
			}
		} else {
			this.l += smooth(this.l, 0, 6);
		}
		//the button
		ctx.fillStyle = 'rgb(184, 184, 184, 0.39215686274509803)';
		ctx.fillRect(this.x - (this.w / 2), this.y - (this.h / 2), this.w, this.h);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.39215686274509803)';
		ctx.fillRect(this.x - (this.w / 2), this.y - (this.h / 2), this.l, this.h);
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'center';
		ctx.font = this.fontSize + 'px sans-serif';
		ctx.fillText(this.txt, this.x, this.y + (this.fontSize / 3));
	};
	var playButton = new Button({
		x: 300,
		y: 100,
		txt: 'p l a y',
		func: function() {
			transition.active = true;
			transition.to = 'game';
		}
	});
	var creditsButton = new Button({
		x: 300,
		y: 300,
		txt: 'c r e d i t s',
		func: function() {
			transition.active = true;
			transition.to = 'credits';
		}
	});
	var backButton = new Button({
		x: 300,
		y: 340,
		txt: 'b a c k',
		func: function() {
			transition.active = true;
			transition.to = 'menu';
		}
	});

} // buttons
{
	//the menu
	var menu = function() {
		//updates the play, how, and credits button
		playButton.update();
		creditsButton.update();
		//the title
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'center';
		ctx.font = '31px arial black';
		ctx.fillText('Totally A Normal Platformer', 300, 200);
		ctx.font = '13px arial black';
		ctx.fillText('By \xA9 2020 Titanium Programming', 416, 220);
	};
	//the credits page
	var credits = function() {
		//the credits text
		this.text = [
			'Credits to:',
			'Loyalty for the smooth function',
			'Doctor317 for try {} catch() {}',
			'Timothy for creating',
			'the TCO to push me to finish this game',
			'and you for viewing this program :)'
		];
		//fills the text black
		ctx.fillStyle = 'black';
		//aligns the text
		ctx.textAlign = 'center';
		ctx.textBaseline = 'center';
		//changes the font size
		ctx.font = '17px sans-serif';
		//since '\n' only makes a space, just make a billion lines
		for (var i = 0; i < this.text.length; i++) {
			ctx.fillText(this.text[i], 300, i * 25 + 153);
		}
		//update the back button
		backButton.update();
	};
	//the game
	var game = function() {
		ctx.save();
		ctx.translate(canvas.width / 2 - cam.x, canvas.height / 2 - cam.y);
		player.display();
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];
			if (b.x > cam.x - (canvas.width / 2 + blockSize) && b.x < cam.x + (canvas.width / 2) && b.y > cam.y - (canvas.width / 2) && b.y < cam.y + (canvas.width / 2)) {
				b.display();
			}
		}
		player.moveX();
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];
			if (b.x > cam.x - (canvas.width / 2 + blockSize) && b.x < cam.x + (canvas.width / 2) && b.y > cam.y - (canvas.width / 2) && b.y < cam.y + (canvas.width / 2)) {
				b.collideX();
			}
		}
		player.moveY();
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];
			if (b.x > cam.x - (canvas.width / 2 + blockSize) && b.x < cam.x + (canvas.width / 2) && b.y > cam.y - (canvas.width / 2) && b.y < cam.y + (canvas.width / 2)) {
				b.collideY();
			}
		}
		for (var i = 0; i < blocks.length; i++) {
			var b = blocks[i];
			if (b.x > cam.x - (canvas.width / 2 + blockSize) && b.x < cam.x + (canvas.width / 2) && b.y > cam.y - (canvas.width / 2) && b.y < cam.y + (canvas.width / 2)) {
				b.move();
			}
		}
		//the text that you should never trust
		ctx.fillStyle = 'black';
		ctx.textAlign = 'left';
		ctx.textBaselign = 'top';
		ctx.font = '12px sans-serif'
		for (var i = 0; i < levels[level].messages.length; i++) {
			for (var j = 0; j < levels[level].messages[i].txt.split('\n').length; j++) {
				ctx.fillText(levels[level].messages[i].txt.split('\n')[j], levels[level].messages[i].x, levels[level].messages[i].y + j * 12);
			}
		}
		//the portal
		ctx.fillStyle = 'rgb(0, 255, 255, ' + 100 / 255 + ')';
		ctx.beginPath();
		ctx.arc(levels[level].portal.x + (blockSize / 2), levels[level].portal.y + (blockSize / 2), blockSize / 2, 0, Math.PI * 2);
		if (Math.sqrt(((player.x - levels[level].portal.x) * (player.x - levels[level].portal.x)) + ((player.y - levels[level].portal.y) * (player.y - levels[level].portal.y))) <= 100) {
			levels[level].portal.x += smooth(levels[level].portal.x, levels[level].portal.realX, 5);
			levels[level].portal.y += smooth(levels[level].portal.y, levels[level].portal.realY, 5);
		}
		ctx.fill();
		if (checkCollision(levels[level].portal, player)) {
			level++;
			ded = true;
		}
		//makes the camera follow the player
		cam.x += smooth(cam.x, player.x, 20);
		cam.y += smooth(cam.y, player.y, 20);

		ctx.restore();
		if (ded) {
			loadLev();
			ded = false;
		}

	};
	//the intro
	intro = function() {
		//adds a black background
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//updates all of the particles
		for (var i = 0; i < introParticles.length; i++) {
			introParticles[i].update();
		}
		//if the frameCount is bigger than 300, change the scene to menu
		if (frameCount > 300) {
			transition.active = true;
			transition.to = "menu";
		}
	};
} // the scenes
{
	window.setInterval(function() {
		try {
			frameCount++;
			document.body.style.cursor = 'default';
			//clears the canvas
			ctx.clearRect(0, 0, 600, 400);
			//gets all of the rain drops
			for (var i = 0; i < rains.length; i++) {
				var r = rains[i];
				//displays and makes all of the rain drops move
				r.display();
				r.move();
			}
			switch (scene) {
				case 'menu':
					menu();
					break;
				case 'credits':
					credits();
					break;
				case 'game':
					game();
					break;
				case "intro":
					intro();
			}
			//turns mouse.clicked to false
			mouse.clicked = false;
			//if the transition is active
			if (transition.active) {
				transition.run();
			}
		} catch (err) {
			console.error(err);
		}
	}, 1000 / 60);
} // the program loop
{
	//checks for mouse moves
	canvas.addEventListener('mousemove', function(event) {
		//update the mouse coorinates
		mouse.x = event.layerX;
		mouse.y = event.layerY;
	});
	//check for mouse clickes
	window.document.body.addEventListener('mouseup', function() {
		//makes mouse.clicked true
		mouse.clicked = true;
	});
	//checks for key presses
	window.document.body.addEventListener('keydown', function(event) {
		keys[event.keyCode] = true;
	});
	//checks for key releases
	window.document.body.addEventListener('keyup', function(event) {
		keys[event.keyCode] = false;
	});
} // event listeners
