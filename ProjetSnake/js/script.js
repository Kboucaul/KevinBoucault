window.onload = function()
{
	var canvasWidth = 900;
	var canvasHeight = 600;
	var blockSize = 30; 
	var ctx;
	var delay = 100;
	var snakee;
	var apple;
	var widthInBlocks = canvasWidth/ blockSize;
	var heightInBlocks = canvasHeight/ blockSize;
	var score = 0;
	var paused = 80;
	var depart = [[6,4]];
	var startGame = false;
	var game_over = false;
	var difficult = 0;

	init();

	function init()
	{
		var canvas = document.createElement('canvas');
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvas.style.border = "10px solid #C57303";

		canvas.style.margin = "125px auto";
		canvas.style.display = "block";
		canvas.style.backgroundColor = "#F8FF58";
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		snakee = new Snake(depart, "right");
		apple = new Apple([10,10]);
		refreshCanvas();
	}

	function refreshCanvas()
	{
		if (paused == 0)
		{
			document.documentElement.style.overflow = 'hidden';
			snakee.advanced();
			if (snakee.checkCollision() == false)
			{
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				snakee.drawSnake();
				if ((snakee.isEatingAnApple(apple)) == false)
					apple.draw();
				else
				{
					snakee.ateApple = true;
					apple.setNewPosition();
					var i = 0;
					while (i < snakee.body.length)
					{
						if ((apple.position[0] == snakee.body[i][0]) && (apple.position[1] == snakee.body[i][1]))
							apple.setNewPosition();
						else
							i++;
					}
					score++;
					if ((score % 15) == 0)
					{
						if (delay > 70)
							delay -= 5;
						else
							delay -= 1;
						difficult++;
					}
					if ((score % 20) == 0)
					{
						if (blockSize > 10)
							blockSize -= 2;
						difficult++;
					}
					if ((score % 30) == 0)
					{
						if (delay > 70)
							delay -=5;
						else
							delay -= 1;
						if (blockSize > 10)
							blockSize -= 5;
					}
				}
				drawScore();
				setTimeout(refreshCanvas, delay);
				}
			else //SI JE PERDS
			{
				game_over = true;
				//document.documentElement.style.overflow = 'hidden';
				gameOver();
				var string = "pommes!";
				var finalString = "";
				if (score <= 1)
					string = "pomme!";
				ctx.font = "bold 15px Georgia";
				finalString = "Tu as mangé " + score + " " + string + "\n";
				ctx.fillText(finalString, (900 - (ctx.measureText(finalString).width))/2, 300);
				return;
			}
		}
		else
			document.documentElement.style.overflow = 'scroll';
	}

	function drawScore()
	{
		ctx.save();
		ctx.font = "bold 10px";
		ctx.textAlign = "center";
		ctx.fillText("" + score, 5, canvasHeight - 5);
		ctx.restore();
	}

	function gameOver()
	{

		var measure = 0;
		ctx.save();
		ctx.font = "bold 50px Georgia";
		measure = ctx.measureText("Game Over =(").width;
		ctx.fillText("Game Over =(", ((900 - measure)/2), 200);
		ctx.font = "bold 25px Georgia";
		measure = 0;
		measure = ctx.measureText("Appuyer sur la touche Espace pour rejouer").width;
		ctx.fillText("Appuyer sur la touche Espace pour rejouer", ((900 - measure)/2), 250);
		ctx.restore();
	}

	function restart()
	{
		snakee = new Snake([[6,4]], "right");
		apple = new Apple([10,10]);
		delay = 100;
		blockSize = 30;
		difficult = 0;
		score = 0;
		game_over = false;
		refreshCanvas();
	}
	
	
	function drawBlock(ctx, position)
	{
		var x = position[0] * blockSize;
		var y = position[1] * blockSize;

		ctx.fillRect(x, y, blockSize, blockSize);
		ctx.lineWidth = "1";
		ctx.strokeRect(x, y, blockSize, blockSize);
		ctx.rect(x, y, blockSize, blockSize);
	
	}
	function Snake(body, direction)
	{
		this.body = body;
		this.direction = direction;
		this.ateApple = false;

		this.drawHead = function()
		{
			ctx.save();
			ctx.fillStyle = "#23A709";
			drawBlock(ctx, this.body[0]);
			ctx.restore();
		};
		this.drawBody = function()
		{
			ctx.save();
			ctx.fillStyle = "#ABFF58";
			for(var i = 1; i < this.body.length; i++) //ici on veut dessiner le corps
				drawBlock(ctx, this.body[i]);
			ctx.restore();
		};
		this.drawSnake = function()
		{
			this.drawHead();
			if (this.body.length > 1)
				this.drawBody();
		};
		this.advanced = function()
		{
			var nextPosition = this.body[0].slice();
			setTimeout(delay);
			switch(this.direction)
			{
				case "left":
					nextPosition[0] -= 1;
					break;
				case "right":
					nextPosition[0] += 1;
					break;
				case "down":
					nextPosition[1] += 1;
					break;
				case "up":
					nextPosition[1] -= 1;
					break;
				default :
					throw("Invalid Direction");
			}
			this.body.unshift(nextPosition);
			if (!this.ateApple)
			{
				this.body.pop();
			}
			else
				this.ateApple = false;
		};
		this.setDirection = function(newDirection)
		{
			var allowedDirection;
			switch(this.direction)
			{
				case "left":
				case "right":
					allowedDirection = ["up", "down"];
					break;
				case "down":
				case "up":
					allowedDirection = ["right", "left"];
					break;
				default:
			}
			if (allowedDirection.indexOf(newDirection) > -1)
			{
				this.direction = newDirection;
			}

		};
		this.checkCollision = function()
		{

			var wallCollision = false;//un mur?
			var snakeCollision = false;//le serpent overlap?
			var head = this.body[0];
			var rest = this.body.slice(1); //le corps
			var headX = head[0];
			var headY = head[1];
			widthInBlocks = canvasWidth/ blockSize;
			heightInBlocks = canvasHeight/ blockSize;
			if ((headX < 0) || (headX > (widthInBlocks - 1)))
				wallCollision = true;
			if ((headY < 0) || (headY > (heightInBlocks - 1)))
				wallCollision = true;
			var i = 0;
			while (i < rest.length)
			{
				if ((headX == rest[i][0]) && (headY == rest[i][1]))
				{
					snakeCollision = true;
					break ;
				}
				else
					i++;
			}
			return (wallCollision || snakeCollision);
		};
		this.isEatingAnApple = function(appleToEat)
		{
			var head = this.body[0];
			
			if ((head[0] == appleToEat.position[0]) && (head[1] == appleToEat.position[1]))
				return (true);
			else
				return (false);
		};
	}
	function Apple(position)
	{
		this.position = position;
		this.draw = function()
		{
			ctx.save();
			ctx.fillStyle = "#FC0404";
			ctx.strokeStyle = "#873600";
			ctx.beginPath();
			var radius = blockSize/2;
			var x = this.position[0]*blockSize + radius;
			var y = this.position[1]*blockSize + radius;
			ctx.arc(x,y, radius, 0, Math.PI*2, true);
			ctx.fill();
			ctx.stroke();
			ctx.restore();
		};
		this.setNewPosition = function()
		{
			//position aleatoire
			var newX = Math.round(Math.random() * (widthInBlocks - 1));
			var newY = Math.round(Math.random() * (heightInBlocks - 1));
			this.position = [newX, newY];

		};
	}

	document.onkeydown = function handleKeyDown(event)
	{
		var key = event.keyCode;
		var newDirection;

		switch(key)
		{
			case 65:
			
				if (delay > 20)
					delay -= 5;
				return;
			case 90:
				if (delay < 150)
				{
					difficult = 0;
					delay += 1;
					score = 0;
				}
				return;
			case 37: // gauche
				newDirection = "left";
				break;
			case 81:
				newDirection = "left";
				break;


			case 38: //haut
				newDirection = "up";
				break;
			case 90: //haut
				newDirection = "up";
				break;


			case 39:
				newDirection = "right";
				break;
			case 68:
				newDirection = "right";
				break;


			case 40:
				newDirection = "down";
				break;
			case 83:
				newDirection = "down";
				break;


			case 32:
				if (game_over == true)
				{
					restart();
					return;
				}
				else
					break;
			case 80:
			{
				if (paused == 0)
				{
					paused = 80;
					return ;
				}
				else
				{
					paused = 0;
					refreshCanvas();
					return ;
				}

			}
			default:
				return;
		}
		snakee.setDirection(newDirection); 
	}
}